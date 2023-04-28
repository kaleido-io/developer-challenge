import http from 'http';
import express from 'express';
import cors from 'cors';

import { API_PORT, WS_PORT, IO_NAMESPACE } from './config';
import { initializeMongoClient, initializeSocketIO, getSocketIO, initializeSwaggerClients } from './initialize';
import { routes } from './api/routes';

export const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.listen(API_PORT, () => {
    console.info(`API listening on port ${API_PORT}`);
});

(async () => {
    console.info('Starting up lab server...');
    
    await initializeMongoClient();
    await initializeSwaggerClients();

    await initializeSocketIO(server);
    const io = getSocketIO();
    io.of(IO_NAMESPACE).on('connection', onConnect);
    io.on('error', err => console.error(err));

    server.listen(WS_PORT, () => {
        console.info(`WS listening on port ${WS_PORT}`);
    });
})();

const server = http.Server(app);
const onConnect = async socket => {
    try {
        console.info('Connection incoming');
    } catch (ex) {
        console.error(ex);
        socket.disconnect(true);
        return;
    }
};
