import { Server } from 'colyseus';
import { createServer } from 'http';

import { monitor } from '@colyseus/monitor';
import express from 'express';
import { MovesRoom } from './Rooms/Moves/MovesRoom';
import { NullEngine, NullEngineOptions } from 'babylonjs';
import { MovesRoomOptions } from './Rooms/Moves/MovesRoomOptions';

const port = Number(process.env.PORT || 2657);
const app = express();

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({
  server: createServer(app),
  verifyClient: (info, next) => {
    console.log(JSON.stringify(info.req.url));
    next(true);
  }
});

const options = new MovesRoomOptions(new NullEngine());
gameServer.register('movesRoom', MovesRoom, options);

app.use('/colyseus', monitor(gameServer));

gameServer.onShutdown(() => {
  console.log(`game server is going down.`);
});

gameServer.listen(port);
console.log(`Listening on http://localhost:${port}`);
