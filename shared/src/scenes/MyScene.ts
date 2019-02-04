import { Vector3, Scene, Engine } from "babylonjs";



export class MyScene extends Scene {
    lol: Vector3;
    constructor(engine: Engine) {
        super(engine);
        console.log(engine.scenes.length);
    }
}