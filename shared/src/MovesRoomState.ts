import { Vector3, Color3 } from "babylonjs";

interface EntityMap<T> {
  [key: string]: T;
}

export class MovesRoomState {
  public players: EntityMap<Player> = {};
}

export class Player {
  constructor(public point: Vector3, public color: Color3) {}
}
