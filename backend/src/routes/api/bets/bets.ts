import { Router } from 'express';
import pool from '../../../db/pg';
const router = Router();

router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM bets');
        res.json(rows);
    } catch (error) {
        console.error(`Error fetching: ${error}`);
        res.status(500).json({ error: `Error fetching: ${error}` });
    }
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const { rows } = await pool.query(
            'SELECT * FROM bets WHERE user_id = $1',
            [userId]
        );

        res.json(rows);
    } catch (error) {
        console.error('Error retrieving bets by userId:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
