import { Router } from 'express';
import pool from '../../../db/pg';
const router = Router();

router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM teams');
        res.json(rows);
    } catch (error) {
        console.error(`Error fetching: ${error}`);
        res.status(500).json({ error: 'Failed to fetch teams.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { rows, rowCount } = await pool.query(
            'SELECT * FROM teams WHERE id = $1',
            [req.params.id]
        );
        if (rowCount === 0) {
            res.status(404).json({ msg: 'Team not found.' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error(`Error fetching: ${error}`);
        res.status(500).json({
            error: `Failed to fetch team with id ${req.params.id}`,
        });
    }
});

export default router;
