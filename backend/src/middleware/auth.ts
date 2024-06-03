import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getUserById, User } from '../models/user';


// hardcoding for dev convenience
// TODO: use .env file with env vars
const JWT_SECRET = 'c2VjdXJlcGFzc3dvcmQxMjM0QHp4YyQkXy1Gb28h';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// TODO: implement refresh tokens
export const generateToken = (user: User) => {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
};
