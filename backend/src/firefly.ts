import FireFly from "@hyperledger/firefly-sdk";
import pollstorage from "../../solidity/artifacts/contracts/poll_storage.sol/PollStorage.json";
import logger from "./logger";
import axios from 'axios';
import db from "./db";
import {PollCreatedEvent, VoteRecordedEvent} from "./models/pollEvent";
import {handlePollCreatedEvent, handleVoteRecordedEvent} from "./services/event_service";

const HOST = "http://localhost:5000";
const NAMESPACE = "default";

const fireflyBaseURL = `${HOST}/api/v1/namespaces/${NAMESPACE}`;

export const POLL_STORAGE_ADDRESS = "0x70A3Fede77Da8D5557d6B4EBb6A484f90e66b96D";

const ffiAndApiVersion = 2;
const psFfiName: string = `pollStorageTestFFI-${ffiAndApiVersion}`;

export const psApiName: string = `pollStorageTestApi-${ffiAndApiVersion}`;


const firefly = new FireFly({
  host: HOST,
  namespace: NAMESPACE,
});

// convenience
export const initFireFly = async () => {
  // Simple storage
  await firefly
    .generateContractInterface({
      name: psFfiName,
      namespace: NAMESPACE,
      version: "1.0",
      description: "Deployed poll-storage contract",
      input: {
        abi: pollstorage.abi,
      },
    })
    .then(async (psGeneratedFFI) => {
      if (!psGeneratedFFI) return;
      return await firefly.createContractInterface(psGeneratedFFI, {
        confirm: true,
      });
    })
    .then(async (psContractInterface) => {
      if (!psContractInterface) return;
      return await firefly.createContractAPI(
        {
          interface: {
            id: psContractInterface.id,
          },
          location: {
            address: POLL_STORAGE_ADDRESS,
          },
          name: psApiName,
        },
        { confirm: true }
      );
    })
    .catch((e) => {
      const err = JSON.parse(JSON.stringify(e.originalError));

      if (err.status === 409) {
        logger.info("'pollStorageFFI' already exists in FireFly. Ignoring.");
      } else {
        return;
      }
    });

  // ----- Listeners ------

  const pollCreatedListener = await firefly
    .createContractAPIListener(psApiName, "PollCreated", {
      topic: "poll_created",
    })
    .catch((e) => {
      const err = JSON.parse(JSON.stringify(e.originalError));

      if (err.status === 409) {
        logger.info(
          "Poll storage 'poll_created' event listener already exists in FireFly. Ignoring."
        );
      } else {
        logger.info(
          `Error creating listener for poll_storage "poll_created" event: ${err.message}`
        );
      }
    });
  // logger.info(pollCreatedListener)
  const voteRecordedListener = await firefly
    .createContractAPIListener(psApiName, "VoteRecorded", {
      topic: "vote_recorded",
    })
    .catch((e) => {
      const err = JSON.parse(JSON.stringify(e.originalError));

      if (err.status === 409) {
        logger.info(
          "Poll storage 'vote_recorded' event listener already exists in FireFly. Ignoring."
        );
      } else {
        logger.info(
          `Error creating listener for poll_storage "vote_recorded" event: ${err.message}`
        );
      }
    });

  // ---- Subscriptions -----

  const pollCreatedListenerId = 'd7978128-b835-49ae-b863-1ad62aeec37f'
  const voteRecordedListenerId = '6a057d10-c2ec-48e3-b6b0-2d96655e6e53'

  try{
    const pollCreatedSubscription = await axios.post(`${fireflyBaseURL}/subscriptions`, {
      name: 'PollCreatedSubscription',
      transport: 'websockets',
      filter: {
        events: 'blockchain_event_received',
        blockchainevent: {
          listener: pollCreatedListenerId
        }
      },
      options: {
        firstEvent: 'newest'
      }
    });

    console.log('PollCreatedSubscription created:', pollCreatedSubscription.data);

    // Create a subscription for VoteRecorded events
    const voteRecordedSubscription = await axios.post(`${fireflyBaseURL}/subscriptions`, {
      name: 'VoteRecordedSubscription',
      transport: 'websockets',
      filter: {
        events: 'blockchain_event_received',
        blockchainevent: {
          listener: voteRecordedListenerId
        }
      },
      options: {
        firstEvent: 'newest'
      }
    });

    console.log('VoteRecordedSubscription created:', voteRecordedSubscription.data);
  } catch (error) {
    logger.error(error)
  }
}

export const listenForBlockchainEvent = async () => {
  firefly.listen(
    {
      filter: {
        events: "blockchain_invoke_op_succeeded",
      },
    },
    async (socket, event) => {
      if (event.operation?.input.input._title && event.operation.input.input._question) {
        const pollEvent: PollCreatedEvent = {
          pollId: event.operation.input.input._pollId,
          question: event.operation.input.input._question,
          creatorHash: event.operation.input.input._creatorHash,
          creatorAddress: event.operation.input.input._creatorAddress,
          transactionHash: event.tx,
          blockNumber: event.sequence,
          logIndex: 0, // Assuming logIndex is 0 if not provided
          timestamp: new Date(event.created),
        };
        await handlePollCreatedEvent(pollEvent);
      } else if (event.operation?.input.input._optionId && event.operation.input.input._voterHash) {
        const voteEvent: VoteRecordedEvent = {
          pollId: event.operation.input.input._pollId,
          voteId: event.operation.input.input._voteId,
          optionId: event.operation.input.input._optionId,
          voterHash: event.operation.input.input._voterHash,
          voterAddress: event.operation.input.input._voterAddress,
          transactionHash: event.tx,
          blockNumber: event.sequence,
          logIndex: 0, // Assuming logIndex is 0 if not provided
          timestamp: new Date(event.created),
        };
        await handleVoteRecordedEvent(voteEvent);
      }
    }
  );
}


export default firefly;