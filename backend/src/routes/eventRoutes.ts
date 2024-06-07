import {Router} from "express";
import {getPollCreatedEvents, getVoteRecordedEvents} from "../controllers/eventsController";
import {authenticate} from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PollCreatedEvent:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         question:
 *           type: string
 *         creatorHash:
 *           type: string
 *         creatorAddress:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *     VoteRecordedEvent:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         pollId:
 *           type: integer
 *         optionId:
 *           type: integer
 *         voterHash:
 *           type: string
 *         voterAddress:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /events/poll_created_events:
 *   get:
 *     summary: Get all poll created events
 *     tags: [PollCreatedEvent]
 *     responses:
 *       200:
 *         description: List of poll created events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PollCreatedEvent'
 */
router.get('/poll_created_events', authenticate, getPollCreatedEvents);

/**
 * @swagger
 * /events/vote_recorded_events:
 *   get:
 *     summary: Get all vote recorded events
 *     tags: [VoteRecordedEvent]
 *     responses:
 *       200:
 *         description: List of vote recorded events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VoteRecordedEvent'
 */
router.get('/vote_recorded_events', authenticate, getVoteRecordedEvents);

export default router;