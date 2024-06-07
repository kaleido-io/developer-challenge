import db from "../db";
import logger from "../logger";

export interface PollCreatedEvent {
  poll_id: number;
  question: string;
  creator_hash: string;
  creator_address: string;
  transaction_hash: string;
  block_number: number;
  log_index: number;
  timestamp: Date;
}

export interface VoteRecordedEvent {
  poll_id: number;
  vote_id: number;
  option_id: number;
  voter_hash: string;
  voter_address: string;
  transaction_hash: string;
  block_number: number;
  log_index: number;
  timestamp: Date;
}

export const createPollCreatedEvent = async (event: PollCreatedEvent) => {
  const {
    poll_id,
    question,
    creator_hash,
    creator_address,
    transaction_hash,
    block_number,
    log_index,
    timestamp
  } = event
  try {
    await db('pollEvents').insert({
      poll_id,
      question,
      creator_hash,
      creator_address,
      transaction_hash,
      block_number,
      log_index,
      timestamp: new Date(timestamp),
      created_at: new Date(),
    });

    logger.info('PollCreated event inserted into pollEvents table');
  } catch (error) {
    logger.error('Error inserting PollCreated event:', error);
  }

}

export const createVoteRecordedEvent = async (event: VoteRecordedEvent) => {
  try {
    const {
      poll_id,
      option_id,
      voter_hash,
      voter_address,
      transaction_hash,
      block_number,
      log_index,
      timestamp
    } = event
    await db('voteEvents').insert({
      poll_id,
      option_id,
      voter_hash,
      voter_address,
      transaction_hash,
      block_number,
      log_index,
      timestamp: new Date(timestamp),
      created_at: new Date(),
    });

    logger.info('VoteRecorded event inserted into voteEvents table');
  } catch (error) {
    logger.error('Error inserting VoteRecorded event:', error);
  }
}