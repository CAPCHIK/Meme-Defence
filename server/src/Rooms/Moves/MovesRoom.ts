import { Room, Client } from 'colyseus';
import { MovesRoomState, Player } from 'MovesRoomState';
import { Color3, Vector3, Engine, Scene } from 'babylonjs';
import { MovesRoomOptions } from './MovesRoomOptions';
// import { MyScene } from 'scenes/MyScene';

export class MovesRoom extends Room<MovesRoomState> {

  private scene: Scene;

  public onJoin(client: Client): void {
    console.log(`joined ${client.sessionId}`);
    this.state.players[client.sessionId] = new Player(
      new Vector3(0, 0, 0),
      Color3.Random()
    );
  }

  public onInit(options: MovesRoomOptions) {
    this.maxClients = 10;
    this.setState(new MovesRoomState());
    console.log(`on init room ${this.roomId}`);
  }

  public onMessage(client: Client, data: Vector3): void {
    this.state.players[client.sessionId].point.copyFrom(data);
  }

  public onLeave(client: Client, consented?: boolean): void {
    console.log(`client ${client.sessionId} leaved from room ${this.roomId}`);
    delete this.state.players[client.sessionId];
  }

  public onDispose(): void {
    console.log(`disposing room ${this.roomId}`);
  }
}
