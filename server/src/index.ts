import { Server } from 'colyseus';
import { createServer } from 'http';

import { monitor } from '@colyseus/monitor';
import express from 'express';
import { MovesRoom } from './Rooms/Moves/MovesRoom';

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

gameServer.register('movesRoom', MovesRoom);

app.use('/colyseus', monitor(gameServer));

gameServer.onShutdown(() => {
  console.log(`game server is going down.`);
});

gameServer.listen(port);
console.log(`Listening on http://localhost:${port}`);
