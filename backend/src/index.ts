import FireFly, { FireFlySubscriptionBase } from "@hyperledger/firefly-sdk";
import express from "express";
import bodyparser from "body-parser";
import diceguess from "../contracts/dice_guess.json";
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

app.post("/api/getPlayer", async(req, res) => {
  res.send(await firefly.queryContractAPI(apiName, "getPlayer", {
    input: {
      player: req.body.player
    },
  }));
})

app.post("/api/getTokens", async (req, res) => {
  console.log("getTokens", )
  // res.send(await firefly.getBlockchainEvents({name: "GuessMade"}));
  // res.send(await firefly.getTokenBalances())
  try {   
    // const mintTokenRes = await firefly.mintTokens({
    //   amount: "0",
    //   pool: process.env.TOKEN_POOL,
    //   to: req.body.player,
    // })

    // res.status(202).send({
    //   amount: mintTokenRes.amount,
    // });
    const fireflyRes = await firefly.invokeContractAPI(apiName, "transferMoneyToWinner", {
      input: {
        // player: req.body.player,
        amount: req.body.currentBetBalance,
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
  try {
    const fireflyRes = await firefly.invokeContractAPI(apiName, "sendGuess", {
      input: {
        guess: req.body.guess,
        betAmount: req.body.betAmount
      },
    });
    // await firefly.invokeContractAPI(apiName, "sendGuess", {
    //   input: {
    //     guess: 3,
    //     betAmount: 3
    //   },
    //   key: "0x92a009e357440a78a5da136c07d5c694ffee631d"
    // });
    // await firefly.invokeContractAPI(apiName, "sendGuess", {
    //   input: {
    //     guess: 4,
    //     betAmount: 4
    //   },
    //   key: "0x0b505531f7da3a91fcd1ec2a2bbb81241e2d9903"
    // });
    
    res.status(202).send({
      id: fireflyRes.id,
    });

    // const messageID = fireflyRes?.header?.id
    // const player = fireflyRes?.header?.key

    // // console.log("ENV", process.env.TOKEN_POOL)
    // // const tokenPoolRes = await firefly.getTokenPools({name: process.env.TOKEN_POOL})
    // // console.log("tokenpoolres", tokenPoolRes)

    // console.log("SUM", dice1 + dice2)
    // if (req.body.guess === dice1 + dice2) {
   
    // } else {
    //   res.status(202).send({
    //     amount: 0,
    //   })
    // }
  } catch (e: any) {
    res.status(500).send({
      error: e.message,
    });
  }
});

const broadcastGuessMessage = async ({ from: sendTo, guess, dice1, dice2 }: any) => {
  console.log('broadcast')
  const options = {
      confirm: true,
  }

  // if (guess === dice1 + dice2) {
    const mintTokenRes = await firefly.mintTokens({
      amount: "0",
      pool: process.env.TOKEN_POOL,
      to: sendTo,
    }, options)

    console.log("res", mintTokenRes)
  // }
  
  // const fireflyRes = await firefly.sendBroadcast({
  //   header: {
  //     "tag": "sendingDiceGuess"
  //   },
  //   data: [{
  //     value: {
  //       guess: guess,
  //       dice1: dice1,        
  //       dice2: dice2,
  //     }
  //   }]
  // }, options)

  return ""
}

async function init() {
  const deployRes = await firefly.deployContract(
    {
      definition:
        diceguess.contracts["dice_guess.sol:DiceGuess"].abi,
      contract: diceguess.contracts["dice_guess.sol:DiceGuess"].bin,
      input: [],
    },
    { confirm: true }
  );
  const contractAddress = deployRes.output.contractLocation.address;

  const generatedFFI = await firefly.generateContractInterface({
    name: uuidv4(),
    namespace: NAMESPACE,
    version: "1.0",
    description: "Auto-deployed dice-guess contract",
    input: {
      abi: diceguess.contracts["dice_guess.sol:DiceGuess"].abi,
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
  console.log("APINAME", apiName)

  const listener = await firefly.createContractAPIListener(apiName, "GuessMade", {
    topic: "guessmade",
  });
  await firefly.createContractAPIListener(apiName, "BalanceTransferred", {
    topic: "balancetransferred",
  });
  // firefly.listen(
  //   "dice-guess",
  //   // {
  //   //   filter: {
  //   //     events: "blockchain_event_received",
  //   //   },
  //   // },
    // async (socket, event) => {
    //   const e = event.blockchainEvent?.output;
    //   console.log("socket", event)
  //     // if (e?.dice1 + e?.dice2 === e?.guess) {
  //     // if (listener.topic === "GuessMade") {
  //     if (event.topic === "guessmade") {
  //       const res = await broadcastGuessMessage(e) // only broadcast if user guessed correctly
  //       console.log("BROADCAST res", res)
  //     }

  //     if (event.type === "token_transfer_confirmed") {
  //       console.log("HERE")
  //     }
     
  //     // } else {

      // }
  //   }
  // );

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
