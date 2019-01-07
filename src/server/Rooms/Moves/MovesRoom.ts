import { Room, Client } from 'colyseus';
import { MovesRoomState, Point } from '../../../shared/MovesRoomState';

export class MovesRoom extends Room<MovesRoomState> {

    public onJoin(client: Client): void {
        this.state.points[client.id] = new Point(0, 0);
    }

    public onInit(options: any) {
        this.maxClients = 10;
        this.setState(new MovesRoomState());
        console.log(`on init room ${this.roomId}`);
        this.clock.setInterval(() => {
            this.state.incrementer++;
        }, 500);
    }

    public onMessage(client: Client, data: any): void {
        // console.log(`client ${client.id}:${client.sessionId} sended ${data}`);
    }

}
