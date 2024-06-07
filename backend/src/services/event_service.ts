// Function to handle PollCreated events
import {
  PollCreatedEvent,
  VoteRecordedEvent
} from "../models/pollEvent";
import db from "../db";
import logger from "../logger";

export const handlePollCreatedEvent = async (event: PollCreatedEvent) => {
  try {
    await db('pollEvents').insert(event);
    logger.info('PollCreated event inserted into pollEvents table');
  } catch (error) {
    logger.error('Error inserting PollCreated event:', error);
  }
};

export const handleVoteRecordedEvent = async (event: VoteRecordedEvent) => {
  try {
    await db('voteEvents').insert(event);
    logger.info('VoteRecorded event inserted into voteEvents table');
  } catch (error) {
    logger.error('Error inserting VoteRecorded event:', error);
  }
};