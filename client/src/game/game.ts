import * as BABYLON from "babylonjs";
import "babylonjs-inspector";
import { Client, Room, DataChange } from "colyseus.js";
import { MovesRoomState, Player } from "src/MovesRoomState";
import { Mesh, Engine, Scene, MeshBuilder, AbstractMesh } from "babylonjs";
import { Configuration } from "../Configuration";

export class Game {
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _scene!: Scene;
  private _spheres: Map<string, Mesh> = new Map<string, Mesh>();

  private _room?: Room;
  private _client?: Client;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  public init() {
    this._scene = new BABYLON.Scene(this._engine);

    const camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 5, -10),
      this._scene
    );

    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(this._canvas);

    const light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      this._scene
    );

    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 7, height: 7, subdivisions: 1 },
      this._scene
    );


    this._client = new Client(Configuration.serverUrl);
    this._room = this._client.join("movesRoom");

    this._room.listen("players/:id", (change: DataChange) => {
      if (change.operation === "add") {
        console.log("new player added to the state");
        console.log("player id:", change.path.id);
        console.log("player data:", change.value);
        const sp = this.createSphere(change.path.id, change.value);
        this._spheres.set(change.path.id, sp);
      } else if (change.operation === "remove") {
        console.log("player has been removed from the state");
        console.log("player id:", change.path.id);
        this.deletePlayer(change.path.id);
      }
    });
    this._room.listen("players/:id/point/:attribute", (change: DataChange) => {
      if (change.operation !== "replace") {
        return;
      }
      const targetSphere = this._spheres.get(change.path.id);
      if (!targetSphere) {
        return;
      }
      switch (change.path.attribute) {
        case "x":
          targetSphere.position.x = change.value;
          break;
        case "y":
          targetSphere.position.y = change.value;
          break;
        case "z":
          targetSphere.position.z = change.value;
          break;
      }
    });
  }

  public run() {
    this._engine.runRenderLoop(() => {
      this._scene.render();
      this.checkCollision();
    });

    window.addEventListener("resize", () => {
      this._engine.resize();
    });

    // this._scene.debugLayer.show();
  }

  private createSphere(name: string, player: Player): Mesh {
    const mesh = MeshBuilder.CreateSphere(
      name,
      {
        diameter: 1,
        segments: 10
      },
      this._scene
    );
    mesh.position.copyFrom(player.point);
    const material = new BABYLON.StandardMaterial(
      `material for ${name}`,
      this._scene
    );
    material.diffuseColor = new BABYLON.Color3(
      player.color.r,
      player.color.g,
      player.color.b
    );
    mesh.material = material;
    return mesh;
  }

  private checkCollision() {
    const pickResult = this._scene.pick(
      this._scene.pointerX,
      this._scene.pointerY,
      mesh => mesh.name === "ground"
    );
    if (!pickResult || !pickResult.hit || !pickResult.pickedPoint) {
      return;
    }
    if (this._room && this._room.hasJoined) {
      this._room.send(pickResult.pickedPoint);
      const targetSphere = this._spheres.get(this._room.sessionId);
      if (!targetSphere) {
        return;
      }
      targetSphere.position.copyFrom(pickResult.pickedPoint);
    }
  }
  private deletePlayer(id: string): void {
    console.log(`deletinf player ${id}`);
    const targetSphere = this._spheres.get(id);
    if (!targetSphere) {
      return;
    }
    if (targetSphere.material) {
      targetSphere.material.dispose();
    }
    targetSphere.dispose();
    this._spheres.delete(id);
  }

  makePhysicsObject(newMeshes: AbstractMesh[], scene: Scene, scaling: number) {
    // Create physics root and position it to be the center of mass for the imported mesh
    var physicsRoot = new BABYLON.Mesh("physicsRoot", scene);
    physicsRoot.position.y -= 0.9;

    // For all children labeled box (representing colliders), make them invisible and add them as a child of the root object
    newMeshes.forEach((m, i) => {
      if (m.name.indexOf("box") != -1) {
        m.isVisible = false
        physicsRoot.addChild(m)
      }
    })

    // Add all root nodes within the loaded gltf to the physics root
    newMeshes.forEach((m, i) => {
      if (m.parent == null) {
        physicsRoot.addChild(m)
      }
    })

    // Make every collider into a physics impostor
    physicsRoot.getChildMeshes().forEach((m) => {
      if (m.name.indexOf("box") != -1) {
        m.scaling.x = Math.abs(m.scaling.x)
        m.scaling.y = Math.abs(m.scaling.y)
        m.scaling.z = Math.abs(m.scaling.z)
        m.physicsImpostor = new BABYLON.PhysicsImpostor(m, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.1 }, scene);
      }
    })

    // Scale the root object and turn it into a physics impsotor
    physicsRoot.scaling.scaleInPlace(scaling)
    physicsRoot.physicsImpostor = new BABYLON.PhysicsImpostor(physicsRoot, BABYLON.PhysicsImpostor.NoImpostor, { mass: 3 }, scene);

    return physicsRoot
  }
}
