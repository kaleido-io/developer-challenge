import WebSocket, { Server } from 'ws';
import { Server as HttpServer } from 'http';
import logger from "./logger";

let wsServer: Server;

export const initializeWebSocket = (server: HttpServer) => {
  wsServer = new Server({ server });

  wsServer.on('connection', (ws) => {
    logger.info('Client connected');
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

export const f = (pollId: string) => {
  if (wsServer) {
    wsServer.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ pollId }));
      }
    });
  }
};
