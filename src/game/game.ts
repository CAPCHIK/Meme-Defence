import * as BABYLON from 'babylonjs';

import 'babylonjs-inspector';

export class Game {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene!: BABYLON.Scene;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  public init() {
    this._scene = new BABYLON.Scene(this._engine);

    const camera = new BABYLON.FreeCamera(
      'camera1',
      new BABYLON.Vector3(0, 5, -10),
      this._scene
    );

    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(this._canvas);

    const light = new BABYLON.HemisphericLight(
      'light1',
      new BABYLON.Vector3(0, 1, 0),
      this._scene
    );

    const sphere = BABYLON.MeshBuilder.CreateSphere(
      'sphere',
      { segments: 16, diameter: 2 },
      this._scene
    );

    sphere.position.y = 1;

    const ground = BABYLON.MeshBuilder.CreateGround(
      'ground',
      { width: 7, height: 7, subdivisions: 1 },
      this._scene
    );
  }

  public run() {
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    window.addEventListener('resize', () => {
      this._engine.resize();
    });

    this._scene.debugLayer.show();
  }
}
