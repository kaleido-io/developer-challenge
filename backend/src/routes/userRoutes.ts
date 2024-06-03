import { Router } from 'express';
import { getProfile } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Error fetching user profile
 */
router.get('/profile', authenticate, getProfile);

export default router;
