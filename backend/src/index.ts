import FireFly from "@hyperledger/firefly-sdk";
import bodyparser from "body-parser";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import simplestorage from "../../solidity/artifacts/contracts/simple_storage.sol/SimpleStorage.json";
import token from "../../solidity/artifacts/contracts/token.sol/Token.json";

const PORT = 4001;
const HOST = "http://localhost:5000";
const NAMESPACE = "default";
const SIMPLE_STORAGE_ADDRESS = "0xF32Eb15791854276994018dAF8f15cAe683BF06D";
const TOKEN_ADDRESS = "0x31E61f804DA2E164152eA90fFb7A3eea67Ff70c6";
const app = express();
const firefly = new FireFly({
  host: HOST,
  namespace: NAMESPACE,
});

let ssApiName: string;
let tokenApiName: string;

app.use(bodyparser.json());

app.get("/api/value", async (req, res) => {
  res.send(await firefly.queryContractAPI(ssApiName, "get", {}));
});

app.post("/api/value", async (req, res) => {
  try {
    const fireflyRes = await firefly.invokeContractAPI(ssApiName, "set", {
      input: {
        x: req.body.x,
      },
    });
    res.status(202).send({
      id: fireflyRes.id,
    });
  } catch (e: any) {
    res.status(500).send({
      error: e.message,
    });
  }
});

app.post("/api/mintToken", async (req, res) => {
  try {
    const fireflyRes = await firefly.invokeContractAPI(
      tokenApiName,
      "safeMint",
      {
        input: {
          tokenId: req.body.tokenId,
        },
      },
      { confirm: true }
    );
    console.log(fireflyRes);
    res.status(200).send({
      id: fireflyRes.id,
    });
  } catch (e: any) {
    res.status(500).send({
      error: e.message,
    });
  }
});

async function init() {
  // Simple storage

  console.log("1");
  const ssGeneratedFFI = await firefly.generateContractInterface({
    name: uuidv4(),
    namespace: NAMESPACE,
    version: "1.0",
    description: "Deployed simple-storage contract",
    input: {
      abi: simplestorage.abi,
    },
  });

  console.log("2");
  const ssContractInterface = await firefly.createContractInterface(
    ssGeneratedFFI,
    { confirm: true }
  );

  console.log("3");
  const ssContractAPI = await firefly.createContractAPI(
    {
      interface: {
        id: ssContractInterface.id,
      },
      location: {
        address: SIMPLE_STORAGE_ADDRESS,
      },
      name: uuidv4(),
    },
    { confirm: true }
  );

  console.log("4");
  ssApiName = ssContractAPI.name;

  // Token
  const tokenGeneratedFFI = await firefly.generateContractInterface({
    name: uuidv4(),
    namespace: NAMESPACE,
    version: "1.0",
    description: "Deployed token contract",
    input: {
      abi: token.abi,
    },
  });

  const tokenContractInterface = await firefly.createContractInterface(
    tokenGeneratedFFI,
    { confirm: true }
  );

  const tokenContractAPI = await firefly.createContractAPI(
    {
      interface: {
        id: tokenContractInterface.id,
      },
      location: {
        address: TOKEN_ADDRESS,
      },
      name: uuidv4(),
    },
    { confirm: true }
  );

  tokenApiName = tokenContractAPI.name;

  // Listeners
  const ssListener = await firefly.createContractAPIListener(
    ssApiName,
    "Changed",
    {
      topic: "changed",
    }
  );

  const tokenListener = await firefly.createContractAPIListener(
    tokenApiName,
    "Transfer",
    {
      topic: "transfer",
    }
  );

  firefly.listen(
    {
      filter: {
        events: "blockchain_event_received",
      },
    },
    async (socket, event) => {
      console.log(event.blockchainEvent?.output);
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
