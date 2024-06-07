import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import pollRoutes from './pollRoutes';
import eventRoutes from "./eventRoutes";

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/polls', pollRoutes);
router.use('/events', eventRoutes)

export default router;
