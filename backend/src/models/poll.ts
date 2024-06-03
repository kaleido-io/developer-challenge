import db from '../db';

interface Poll {
  id?: number;
  title: string;
  question: string;
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