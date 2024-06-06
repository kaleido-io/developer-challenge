import { Request, Response } from 'express';
import {createPoll, getPolls, captureVote} from '../models/poll';
import {broadcastVoteUpdate} from "../websocket";
import db from "../db";
import firefly, {psApiName} from "../firefly";
import logger from "../logger";

interface PollController {
  createPoll(req: Request, res: Response): Promise<Response>
  getPollsController(req: Request, res: Response): Promise<Response>

  vote(req: Request, res: Response): Promise<Response>
  getVotesByPollIdController(req: Request, res: Response): Promise<Response>
}

export const createPollController = async (req: Request, res: Response) => {
  const { title, question, options } = req.body;

  if (!title || !question || !options || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ error: 'Invalid poll data' });
  }

  try {
    const fireFlyRes = await firefly
      .invokeContractAPI(
        psApiName,
        'createPoll',
        {
          input: {
            _title: title,
            _question: question,
            _options: options
          },
      });

    logger.info(fireFlyRes)

    const newPoll = await createPoll({ title, question }, options);
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

export const voteController = async (req: Request, res: Response) => {
  const { option_id } = req.body;

  if (!option_id) {
    return res.status(400).json({ error: 'Invalid vote data' });
  }

  try {
    const newVote = await captureVote({ option_id });

    // Fetch the pollId using the optionId
    const option = await db('options').where('id', option_id).first();
    const pollId = option.poll_id;

    await firefly.invokeContractAPI(
      psApiName,
      'vote',
      {
        input: {
          _pollId: pollId,
          _optionId: option_id
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