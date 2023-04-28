import express from 'express';
import cors from 'cors';

import { API_PORT } from './config';
import { initializeSwaggerClients } from './initialize';
import { setupInitialData as setupInitialJournals } from './api/journals';
import { routes } from './api/routes';

export const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.listen(API_PORT, () => {
    console.info(`API listening on port ${API_PORT}`);
});

(async () => {
    console.info('Starting up conference server...');

    await initializeSwaggerClients();
    await setupInitialJournals();
})();
