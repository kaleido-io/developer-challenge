import FireFly from "@hyperledger/firefly-sdk";
import pollstorage from "../../solidity/artifacts/contracts/poll_storage.sol/PollStorage.json";
import logger from "./logger";

const HOST = "http://localhost:5000";
const NAMESPACE = "default";

const POLL_STORAGE_ADDRESS = "0xBF2446b90e0D49a8aea94d8dfa918D265f7dcC6E";

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

  // Listeners
  // Poll created listener
  await firefly
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

  // Vote recorded listener
  await firefly
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

}

export const broadcastBlockchainEvent = async () => {
  firefly.listen(
    {
      filter: {
        events: "blockchain_event_received",
      },
    },
    async (socket, event) => {
      console.log(
        `${event.blockchainEvent?.info.signature}: ${JSON.stringify(
          event.blockchainEvent?.output,
          null,
          2
        )}`
      );
    }
  );
}

export default firefly;