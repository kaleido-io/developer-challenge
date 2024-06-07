import db from '../db';
import logger from "../logger";

interface Poll {
  id?: number;
  title: string;
  question: string;
  user_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface Option {
  id?: number;
  text: string;
  poll_id?: number;
}

interface PollWithOptions extends Poll {
  options: Option[];
}

interface Vote {
  id?: number;
  option_id: string;
  user_id?: number;
}

export const createPoll = async (poll: Poll, options: string[]): Promise<Poll> => {
  const [newPoll] = await db('polls').insert(poll).returning('*');
  const pollOptions = options.map((option) => ({ text: option, poll_id: newPoll.id }));
  await db('options').insert(pollOptions);
  return newPoll;
};

export const getPolls = async (): Promise<PollWithOptions[]> => {
  const polls = await db('polls').select('*');
  const options = await db('options').select('*');

  return polls.map(poll => {
    return {
      ...poll,
      options: options.filter(option => option.poll_id === poll.id)
    };
  });
};

export const captureVote = async (vote: Vote): Promise<Vote> => {
  const [newVote] = await db('votes').insert(vote).returning('*');
  return newVote;
};

export const hasUserVotedInPoll = async (userId: number, pollId: number): Promise<boolean> => {
  try {
    // First, find the options associated with the given poll ID
    const options = await db<Option>('options')
      .select('id')
      .where({ poll_id: pollId });

    const optionIds = options
      .map(option => option.id)
      .filter((id): id is number => id !== undefined);

    if (optionIds.length === 0) {
      throw new Error(`No options found for poll ID ${pollId}`);
    }

    // Then, check if a vote exists with the user_id and one of the option_ids
    const vote = await db<Vote>('votes')
      .select('id')
      .whereIn('option_id', optionIds)
      .andWhere({ user_id: userId })
      .first();

    return !!vote;

  } catch (error) {
    logger.error(error)
    throw error;
    return false
  }
}