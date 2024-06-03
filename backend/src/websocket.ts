import { Server } from 'ws';
import { Server as HttpServer } from 'http';

let wsServer: Server;

export const initializeWebSocket = (server: HttpServer) => {
  wsServer = new Server({ server });

  wsServer.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
  });

  return wsServer;
};

export const broadcastVoteUpdate = (pollId: string) => {
  if (wsServer) {
    wsServer.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ pollId }));
      }
    });
  }
};
