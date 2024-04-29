import { Router } from 'express';
import pool from '../../../db/pg';
const router = Router();

router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                games.*, 
                away_teams.city AS away_team_city,
                away_teams.name AS away_team_name,
                away_teams.image AS away_team_image, 
                home_teams.city AS home_team_city, 
                home_teams.name AS home_team_name,
                home_teams.image AS home_team_image
            FROM 
                games
            INNER JOIN 
                teams AS away_teams ON games.away_team_id = away_teams.id
            INNER JOIN 
                teams AS home_teams ON games.home_team_id = home_teams.id
        `;
        const { rows } = await pool.query(query);

        res.json(rows);
    } catch (error) {
        console.error(`Error fetching: ${error}`);
        res.status(500).json({ error: `Error fetching: ${error}` });
    }
});

router.get('/:team', async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM games WHERE away_team_id = $1 OR home_team_id = $1',
            [req.params.team]
        );
        if (rows.length === 0) {
            res.status(404).json({
                error: `No games found for team with id ${req.params.team}`,
            });
        } else {
            res.json(rows);
        }
    } catch (error) {
        console.error(`Error fetching: ${error}`);
        res.status(500).json({
            error: `Failed to fetch team with id ${req.params.team}`,
        });
    }
});

router.post('/', async (req, res) => {
    const { awayTeam, homeTeam, awayMoneyLine, homeMoneyLine, gameTime } =
        req.body;

    try {
        const { rows, rowCount } = await pool.query(
            'SELECT id, name FROM teams WHERE name = $1 OR name = $2',
            [awayTeam, homeTeam]
        );
        if (rowCount !== 2) {
            res.status(400).json({
                error: 'Both away and home teams must be valid',
            });
            return;
        }

        const awayTeamId = rows.find((row: any) => row.name === awayTeam).id;
        const homeTeamId = rows.find((row: any) => row.name === homeTeam).id;

        const queryText =
            'INSERT INTO games (away_team_id, home_team_id, away_money_line, home_money_line, game_time) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [
            awayTeamId,
            homeTeamId,
            awayMoneyLine,
            homeMoneyLine,
            gameTime,
        ];

        const { rows: insertRows } = await pool.query(queryText, values);
        res.status(201).json(insertRows[0]);
    } catch (error) {
        console.error(`Error creating game: ${error}`);
        res.status(500).json({ error: `Error creating game: ${error}` });
    }
});

router.put('/:id', async (req, res) => {
    const { awayScore, homeScore } = req.body;

    const queryText =
        'UPDATE games SET away_score = $1, home_score = $2, finished = true WHERE id = $3 RETURNING *';
    const values = [awayScore, homeScore, req.params.id];
    try {
        const { rows, rowCount } = await pool.query(queryText, values);
        if (rowCount === 0) {
            res.status(404).json({ error: 'Game not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error(`Error updating game scores: ${error}`);
        res.status(500).json({ error: `Error updating game scores: ${error}` });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { rowCount } = await pool.query(
            'DELETE FROM games WHERE id = $1',
            [req.params.id]
        );

        if (rowCount === 0) {
            res.status(404).json({ error: 'Game not found' });
        } else {
            res.status(204).end();
        }
    } catch (error) {
        console.error('Error deleting game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
