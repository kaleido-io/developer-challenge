import { Router } from 'express';
import pool from '../../../db/pg';
import { loadAccountTransactionData } from '../../../util/pg';
const router = Router();

router.get('/', async (req, res) => {
    try {
        let data = await pool.query('SELECT * FROM transactions');
        if (data.rowCount === 0) {
            await loadAccountTransactionData();
            data = await pool.query('SELECT * FROM transactions');
        }
        res.json(data.rows);
    } catch (error) {
        console.error(`Error fetching: ${error}`);
        res.status(500).json({ error: `Error fetching: ${error}` });
    }
});

export default router;
