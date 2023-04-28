import { Router } from 'express';

import { getJournals, retract, review, getReviewerProfile } from './journals';

export const routes = Router();

routes.get('/journals', async (req, res) => {
    try {
        const journals = await getJournals();
        res.status(200).send(journals);
    } catch (err) {
        res.status(500).send({ error: getErrorString(err) });
    }
});

routes.post('/journals/:journalId/papers/:paperId/retract', async (req, res) => {
    try {
        const caller = req.body.wallet_address;
        await retract(caller, req.params.journalId, req.params.paperId);
        res.status(201).send();
    } catch (err) {
        res.status(500).send({ error: getErrorString(err) });
    }
});

routes.post('/review/:paperId', async (req, res) => {
    try {
        const caller = req.body.wallet_address;
        await review(caller, req.params.paperId);
        res.status(201).send();
    } catch (err) {
        res.status(500).send({ error: getErrorString(err) });
    }
});

routes.get('/reviewer-profile', async (req, res) => {
    try {
        const caller = req.query.wallet_address;
        const profile = await getReviewerProfile(caller, caller);
        res.status(201).send(profile);
    } catch (err) {
        res.status(500).send({ error: getErrorString(err) });
    }
});

function getErrorString(err) {
    return `${err.response && JSON.stringify(err.response.body) && err.response.text}\n${err.stack}`;
}