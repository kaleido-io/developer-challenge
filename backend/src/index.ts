import FireFly from "@hyperledger/firefly-sdk";
import bodyparser from "body-parser";
import express, {Router} from "express";
import simplestorage from "../../solidity/artifacts/contracts/simple_storage.sol/SimpleStorage.json";
import token from "../../solidity/artifacts/contracts/token.sol/Token.json";
import routes from './routes';
import cors from 'cors';
import setupSwagger from "./swagger";
import { createServer } from 'http';
import {initializeWebSocket} from "./websocket";

const PORT = 4001;
const HOST = "http://localhost:5000";
const NAMESPACE = "default";
const SIMPLE_STORAGE_ADDRESS = "0xf7b7B677007f86D8d3afeD6384F5D18fa9F1F729";
const TOKEN_ADDRESS = "0x86482b61472282Fdc159e33BF856D325a035EfD6";

const app = express();
const server = createServer(app);

const firefly = new FireFly({
  host: HOST,
  namespace: NAMESPACE,
});

const ffiAndApiVersion = 2;
const ssFfiName: string = `simpleStorageTestFFI-${ffiAndApiVersion}`;
const ssApiName: string = `simpleStorageTestApi-${ffiAndApiVersion}`;
const tokenFfiName: string = `tokenTestFFI-${ffiAndApiVersion}`;
const tokenApiName: string = `tokenTestApi-${ffiAndApiVersion}`;

app.use(bodyparser.json());

// just for dev purposes to keep things moving
app.use(cors());

app.use('/', routes);



setupSwagger(app);
initializeWebSocket(server);
server.listen(4002, () => {
  console.log('Websocket server running on port 4002');
});

async function init() {
  // Simple storage
  await firefly
    .generateContractInterface({
      name: ssFfiName,
      namespace: NAMESPACE,
      version: "1.0",
      description: "Deployed simple-storage contract",
      input: {
        abi: simplestorage.abi,
      },
    })
    .then(async (ssGeneratedFFI) => {
      if (!ssGeneratedFFI) return;
      return await firefly.createContractInterface(ssGeneratedFFI, {
        confirm: true,
      });
    })
    .then(async (ssContractInterface) => {
      if (!ssContractInterface) return;
      return await firefly.createContractAPI(
        {
          interface: {
            id: ssContractInterface.id,
          },
          location: {
            address: SIMPLE_STORAGE_ADDRESS,
          },
          name: ssApiName,
        },
        { confirm: true }
      );
    })
    .catch((e) => {
      const err = JSON.parse(JSON.stringify(e.originalError));

      if (err.status === 409) {
        console.log("'simpleStorageFFI' already exists in FireFly. Ignoring.");
      } else {
        return;
      }
    });

  // Token
  await firefly
    .generateContractInterface({
      name: tokenFfiName,
      namespace: NAMESPACE,
      version: "1.0",
      description: "Deployed token contract",
      input: {
        abi: token.abi,
      },
    })
    .then(async (tokenGeneratedFFI) => {
      if (!tokenGeneratedFFI) return;
      return await firefly.createContractInterface(tokenGeneratedFFI, {
        confirm: true,
      });
    })
    .then(async (tokenContractInterface) => {
      if (!tokenContractInterface) return;
      return await firefly.createContractAPI(
        {
          interface: {
            id: tokenContractInterface.id,
          },
          location: {
            address: TOKEN_ADDRESS,
          },
          name: tokenApiName,
        },
        { confirm: true }
      );
    })
    .catch((e) => {
      const err = JSON.parse(JSON.stringify(e.originalError));

      if (err.status === 409) {
        console.log("'tokenFFI' already exists in FireFly. Ignoring.");
      } else {
        return;
      }
    });

  // Listeners
  // Simple storage listener
  await firefly
    .createContractAPIListener(ssApiName, "Changed", {
      topic: "changed",
    })
    .catch((e) => {
      const err = JSON.parse(JSON.stringify(e.originalError));

      if (err.status === 409) {
        console.log(
          "Simple storage 'changed' event listener already exists in FireFly. Ignoring."
        );
      } else {
        console.log(
          `Error creating listener for simple_storage "changed" event: ${err.message}`
        );
      }
    });
  // Token listener
  await firefly
    .createContractAPIListener(tokenApiName, "Transfer", {
      topic: "transfer",
    })
    .catch((e) => {
      const err = JSON.parse(JSON.stringify(e.originalError));

      if (err.status === 409) {
        console.log(
          "Token 'transfer' event listener already exists in FireFly. Ignoring."
        );
      } else {
        console.log(
          `Error creating listener for token "transfer" event: ${err.message}`
        );
      }
    });

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

  // Start listening
  app.listen(PORT, () =>
    console.log(`Kaleido DApp backend listening on port ${PORT}!`)
  );
}

init().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});

module.exports = {
  app,
};
