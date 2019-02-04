import * as BABYLON from "babylonjs";
import "babylonjs-inspector";
import { Client, Room, DataChange } from "colyseus.js";
import { MovesRoomState, Player } from "MovesRoomState";
import { Mesh, Engine, Scene, MeshBuilder } from "babylonjs";
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

    this._scene.debugLayer.show();
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
}