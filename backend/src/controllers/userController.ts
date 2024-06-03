import { Request, Response } from 'express';
import { getUserById } from '../models/user';
import { AuthenticatedRequest } from '../middleware/auth';

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: { id: user.id, username: user.username, created_at: user.created_at } });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};
