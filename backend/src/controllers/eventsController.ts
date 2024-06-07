import { Request, Response } from 'express';

import db from "../db";


export const getPollCreatedEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await db('pollEvents').orderBy('created_at', 'desc');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getVoteRecordedEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await db('voteEvents').orderBy('created_at', 'desc');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};