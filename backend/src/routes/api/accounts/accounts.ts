import { Router } from 'express';
import pool from '../../../db/pg';
import { loadAccountTransactionData } from '../../../util/pg';
const router = Router();

router.get('/', async (req, res) => {
    try {
        let data = await pool.query('SELECT * FROM accounts');
        if (data.rowCount === 0) {
            await loadAccountTransactionData();
            data = await pool.query('SELECT * FROM accounts');
        }
        res.json(data.rows);
    } catch (error) {
        console.error(`Error fetching: ${error}`);
        res.status(500).json({ error: `Error fetching: ${error}` });
    }
});

router.get('/:accountId', async (req, res) => {
    const accountId = req.params.accountId;

    try {
        const query = `
            SELECT ab.pool_id, ab.balance
            FROM account_balances ab
            JOIN accounts a ON ab.account_id = a.id
            WHERE a.account = $1
        `;
        const { rows } = await pool.query(query, [accountId]);

        res.json(rows);
    } catch (error) {
        console.error('Error retrieving bets by userId:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
