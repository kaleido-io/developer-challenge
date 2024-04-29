import { Router } from 'express';
const router = Router();
import firefly, { APINAME } from '../../../firefly/firefly';
import pool from '../../../db/pg';

router.post('/', async (req, res) => {
    const { id, away_team_id, home_team_id, away_money_line, home_money_line } =
        req.body;

    try {
        const fireflyRes = await firefly.invokeContractAPI(APINAME, 'addGame', {
            input: {
                _id: id,
                _awayTeamId: away_team_id,
                _homeTeamId: home_team_id,
                _awayMoneyLine: away_money_line,
                _homeMoneyLine: home_money_line,
            },
        });

        await pool.query('UPDATE games SET on_contract = true WHERE id = $1', [
            id,
        ]);

        res.status(202).send({
            id: fireflyRes.id,
        });
    } catch (e: any) {
        res.status(500).send({
            error: e.message,
        });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { action, away_score, home_score } = req.body;

    try {
        let query;
        let message;

        if (action === 'start') {
            await firefly.invokeContractAPI(APINAME, 'markGameAsStarted', {
                input: {
                    _gameId: id,
                },
            });
            query = 'UPDATE games SET started = true WHERE id = $1';
            message = 'Game started successfully';

            await pool.query(query, [id]);
        } else if (action === 'finish') {
            await firefly.invokeContractAPI(APINAME, 'markGameAsFinished', {
                input: {
                    _gameId: id,
                    _awayScore: away_score,
                    _homeScore: home_score,
                },
            });
            query =
                'UPDATE games SET finished = true, away_score = $2, home_score = $3 WHERE id = $1';
            message = 'Game finished successfully';

            await pool.query(query, [id, away_score, home_score]);
        } else {
            throw new Error('Invalid action');
        }

        res.status(200).send({
            message,
        });
    } catch (e: any) {
        res.status(500).send({
            error: e.message,
        });
    }
});

export default router;
