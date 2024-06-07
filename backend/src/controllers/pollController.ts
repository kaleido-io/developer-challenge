import { Request, Response } from 'express';
import {createPoll, getPolls, captureVote, hasUserVotedInPoll} from '../models/poll';
import {broadcastVoteUpdate} from "../websocket";
import db from "../db";
import firefly, {POLL_STORAGE_ADDRESS, psApiName} from "../firefly";
import logger from "../logger";
import {generateHash} from "../util/hash";
import {AuthenticatedRequest} from "../middleware/auth";

interface PollController {
  createPoll(req: Request, res: Response): Promise<Response>
  getPollsController(req: Request, res: Response): Promise<Response>

  vote(req: Request, res: Response): Promise<Response>
  getVotesByPollIdController(req: Request, res: Response): Promise<Response>
}

export const createPollController = async (req: AuthenticatedRequest, res: Response) => {
  const { title, question, options } = req.body;
  const userId = req.user!.id // TODO: should do more safely

  if (!title || !question || !options || !userId || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ error: 'Invalid poll data' });
  }
  const user = await db('users').where({ id: userId }).first();
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const userHash = generateHash(user.name, user.id)
  try {
    const newPoll = await createPoll({ title, question }, options);
    const fireFlyRes = await firefly
      .invokeContractAPI(
        psApiName,
        'createPoll',
        {
        input: {
          _pollId: newPoll.id,
          _title: title,
          _question: question,
          _options: options,
          _creatorHash: userHash,
          _creatorAddress: POLL_STORAGE_ADDRESS
       },
    });

    res.status(201).json(newPoll);
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: 'Error creating poll' });
  }
};

export const getPollsController = async (req: Request, res: Response) => {
  try {
    const polls = await getPolls();
    res.status(200).json(polls);
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: 'Error fetching polls' });
  }
};

export const voteController = async (req: AuthenticatedRequest, res: Response) => {
  const { option_id } = req.body;
  const userId = req.user!.id // TODO: should do more safely

  if (!option_id) {
    return res.status(400).json({ error: 'Invalid vote data' });
  }

  try {
    const user = await db('users').where({ id: userId }).first();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch the pollId using the optionId
    const option = await db('options').where('id', option_id).first();
    const pollId = option.poll_id;

    const hasVoted = await hasUserVotedInPoll(userId, pollId)
    if(hasVoted) {
      return res.status(400).json({ error: 'User already voted' });
    }

    const userHash = generateHash(user.name, user.id)

    const newVote = await captureVote({ option_id, user_id: userId });


    const resp = await firefly.invokeContractAPI(
      psApiName,
      'vote',
      {
        input: {
          _pollId: pollId,
          _voteId: newVote.id,
          _optionId: option_id,
          _voterHash: userHash,
          _voterAddress: POLL_STORAGE_ADDRESS
        },
    });

    broadcastVoteUpdate(pollId); // Broadcast vote update
    res.status(201).json(newVote);
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: 'Error recording vote' });
  }
};

export const getVotesByPollIdController = async (req: Request, res: Response) => {
  const { pollId } = req.params;

  try {
    const votes = await db('votes').whereIn(
      'option_id',
      db('options').select('id').where('poll_id', pollId)
    );
    res.status(200).json(votes);
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: 'Error fetching votes' });
  }
};