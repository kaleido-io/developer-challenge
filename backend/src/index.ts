import FireFly, { FireFlySubscriptionBase } from "@hyperledger/firefly-sdk";
import express from "express";
import bodyparser from "body-parser";
import simplebank from "../contracts/simple_bank.json";
import { v4 as uuidv4 } from "uuid";

const PORT = 4001;
const HOST = "http://localhost:5000";
const NAMESPACE = "default";
const app = express();
const firefly = new FireFly({
  host: HOST,
  namespace: NAMESPACE,
});
require("dotenv").config()

let apiName: string;

app.use(bodyparser.json());

app.get("/api/balance", async (req, res) => {
  console.log("balance")
  res.send(await firefly.queryContractAPI(apiName, "balance", {}));
});

app.get("/api/getOwner", async (req, res) => {
  console.log("getOwner")
  res.send(await firefly.queryContractAPI(apiName, "getOwner", {}));
})

app.post("/api/placeBet", async (req, res) => {
  console.log("placeBet")
  try {
    const fireflyRes = await firefly.invokeContractAPI(apiName, "placeBet", {
      input: {
        betAmount: req.body.betAmount,
        number: req.body.number
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

app.post("/api/removeOwner", async (req, res) => {
  console.log("removeOwner")
  try {
    const fireflyRes = await firefly.invokeContractAPI(apiName, "removeOwner", {
      input: {
        owner: req.body.owner,
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

app.post("/api/deposit", async (req, res) => {
  console.log("deposit")
  try {
    const fireflyRes = await firefly.invokeContractAPI(apiName, "deposit", {
      input: {
        amount: req.body.amount,
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

app.post("/api/withdraw", async (req, res) => {
  console.log("withdraw", req.body.amount)
  try {
    const fireflyRes = await firefly.invokeContractAPI(apiName, "withdraw", {
      input: {
        amount: req.body.amount,
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

app.post("/api/sendGuess", async (req, res) => {
  console.log("SENDGUESS")
  try {
    const dice1 = Math.floor(Math.random() * 6 + 1);
    const dice2 = Math.floor(Math.random() * 6 + 1)

    const options = {
        confirm: true,
    }
    
    const fireflyRes = await firefly.sendBroadcast({
      header: {},
      data: [{
        value: {
          guess: req.body.guess,
          dice1,        
          dice2,
        }
      }]
    }, options)
    
    const messageID = fireflyRes?.header?.id
    const player = fireflyRes?.header?.key

    // console.log("ENV", process.env.TOKEN_POOL)
    // const tokenPoolRes = await firefly.getTokenPools({name: process.env.TOKEN_POOL})
    // console.log("tokenpoolres", tokenPoolRes)

    console.log("SUM", dice1 + dice2)
    if (req.body.guess === dice1 + dice2) {
      const mintTokenRes = await firefly.mintTokens({
        amount: "1",
        pool: process.env.TOKEN_POOL,
        to: player,
      }, options)
      
      res.status(202).send({
        amount: mintTokenRes.amount,
      });
    } else {
      res.status(202).send({
        amount: 0,
      })
    }
  } catch (e: any) {
    res.status(500).send({
      error: e.message,
    });
  }
});

async function init() {
  const deployRes = await firefly.deployContract(
    {
      definition:
        simplebank.contracts["simple_bank.sol:SimpleBank"].abi,
      contract: simplebank.contracts["simple_bank.sol:SimpleBank"].bin,
      input: [],
    },
    { confirm: true }
  );
  const contractAddress = deployRes.output.contractLocation.address;

  const generatedFFI = await firefly.generateContractInterface({
    name: uuidv4(),
    namespace: NAMESPACE,
    version: "1.0",
    description: "Auto-deployed simple-bank contract",
    input: {
      abi: simplebank.contracts["simple_bank.sol:SimpleBank"].abi,
    },
  });

  const contractInterface = await firefly.createContractInterface(
    generatedFFI,
    { confirm: true }
  );

  const contractAPI = await firefly.createContractAPI(
    {
      interface: {
        id: contractInterface.id,
      },
      location: {
        address: contractAddress,
      },
      name: uuidv4(),
    },
    { confirm: true }
  );

  apiName = contractAPI.name;

  const listener = await firefly.createContractAPIListener(apiName, "Changed", {
    topic: "changed",
  });

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
