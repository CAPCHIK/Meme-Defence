import { EntityMap } from 'colyseus';
import { Vector3, Color3 } from 'babylonjs';

export class MovesRoomState {
    public players: EntityMap<Player> = {};
}

export class Player {
    constructor(
        public point: Vector3,
        public color: Color3) { }
}
