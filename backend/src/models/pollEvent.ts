import db from "../db";
import logger from "../logger";

export interface PollCreatedEvent {
  pollId: number;
  question: string;
  creatorHash: string;
  creatorAddress: string;
  transactionHash: string;
  blockNumber: number;
  logIndex: number;
  timestamp: Date;
}

export interface VoteRecordedEvent {
  pollId: number;
  voteId: number;
  optionId: number;
  voterHash: string;
  voterAddress: string;
  transactionHash: string;
  blockNumber: number;
  logIndex: number;
  timestamp: Date;
}

export const createPollCreatedEvent = async (event: PollCreatedEvent) => {
  const {
    pollId,
    question,
    creatorHash,
    creatorAddress,
    transactionHash,
    blockNumber,
    logIndex,
    timestamp
  } = event
  try {
    await db('pollEvents').insert({
      pollId,
      question,
      creatorHash,
      creatorAddress,
      transactionHash,
      blockNumber,
      logIndex,
      timestamp: new Date(timestamp),
      createdAt: new Date(),
    });

    logger.info('PollCreated event inserted into pollEvents table');
  } catch (error) {
    logger.error('Error inserting PollCreated event:', error);
  }

}

export const createVoteRecordedEvent = async (event: VoteRecordedEvent) => {
  try {
    const {
      pollId,
      optionId,
      voterHash,
      voterAddress,
      transactionHash,
      blockNumber,
      logIndex,
      timestamp
    } = event
    await db('voteEvents').insert({
      pollId: pollId,
      optionId: optionId,
      voterHash: voterHash,
      voterAddress: voterAddress,
      transactionHash: transactionHash,
      blockNumber: blockNumber,
      logIndex: logIndex,
      timestamp: new Date(timestamp),
      createdAt: new Date(),
    });

    logger.info('VoteRecorded event inserted into voteEvents table');
  } catch (error) {
    logger.error('Error inserting VoteRecorded event:', error);
  }
}