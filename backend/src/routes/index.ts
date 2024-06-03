import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import pollRoutes from './pollRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/polls', pollRoutes);

export default router;
