import bodyparser from "body-parser";
import express, {Router} from "express";
import routes from './routes';
import cors from 'cors';
import setupSwagger from "./swagger";
import { createServer } from 'http';
import {initializeWebSocket} from "./websocket";
import {broadcastBlockchainEvent, initFireFly} from "./firefly";
import morgan from "morgan";
import logger from "./logger";

const PORT = 4001;

const app = express();
const server = createServer(app);

app.use(bodyparser.json());

// just for dev purposes to keep things moving
app.use(cors());

app.use('/', routes);

app.use(morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim())
  }
}));

setupSwagger(app);
initializeWebSocket(server);

server.listen(4002, () => {
  logger.info('Websocket server running on port 4002');
});

async function init() {

  await broadcastBlockchainEvent()

  await initFireFly();

  // Start listening
  app.listen(PORT, () =>
    logger.info(`Kaleido DApp backend listening on port ${PORT}!`)
  );
}

init().catch((err) => {
  logger.error(err.stack);
  process.exit(1);
});

module.exports = {
  app,
};
