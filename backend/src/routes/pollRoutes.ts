import { Router } from 'express';
import {
  createPollController,
  getPollsController,
  getVotesByPollIdController,
  voteController
} from '../controllers/pollController';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Poll:
 *       type: object
 *       required:
 *         - title
 *         - question
 *         - options
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the poll
 *         title:
 *           type: string
 *           description: The title of the poll
 *         question:
 *           type: string
 *           description: The question of the poll
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           description: The options for the poll
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the poll was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date the poll was last updated
 */

/**
 * @swagger
 * tags:
 *   name: Polls
 *   description: The poll managing API
 */

/**
 * @swagger
 * /polls/create:
 *   post:
 *     summary: Create a new poll
 *     tags: [Polls]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - question
 *               - options
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the poll
 *               question:
 *                 type: string
 *                 description: The question of the poll
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The options for the poll
 *     responses:
 *       201:
 *         description: The poll was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *       400:
 *         description: Invalid poll data
 *       500:
 *         description: Error creating poll
 */
router.post('/create', authenticate, createPollController);

/**
 * @swagger
 * /polls:
 *   get:
 *     summary: Get a list of all polls
 *     tags: [Polls]
 *     responses:
 *       200:
 *         description: A list of polls
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poll'
 *       500:
 *         description: Error fetching polls
 */
router.get('/', getPollsController);

/**
 * @swagger
 * /polls/vote:
 *   post:
 *     summary: Vote on a poll
 *     tags: [Polls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - option_id
 *             properties:
 *               option_id:
 *                 type: string
 *                 description: The ID of the selected option
 *     responses:
 *       201:
 *         description: The vote was recorded successfully
 *       400:
 *         description: Invalid vote data
 *       500:
 *         description: Error recording vote
 */
router.post('/vote', authenticate, voteController);

/**
 * @swagger
 * /polls/{pollId}/votes:
 *   get:
 *     summary: Get votes for a poll
 *     tags: [Polls]
 *     parameters:
 *       - in: path
 *         name: pollId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the poll
 *     responses:
 *       200:
 *         description: A list of votes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   option_id:
 *                     type: string
 *       500:
 *         description: Error fetching votes
 */
router.get('/:pollId/votes', getVotesByPollIdController);

export default router;
