import { EntityMap } from 'colyseus';

export class MovesRoomState {
    public incrementer: number = 0;
    public points: EntityMap<Point> = {};
}

export class Point {
    constructor(
        public x: number,
        public y: number,
    ) { }
}
