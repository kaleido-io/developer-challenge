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

// app.post("/api/register", async (req, res) => {
//   try {
//     const fireflyRes = await firefly.invokeContractAPI(apiName, "registerPlayer", {
//       input: {
//         player: req.body.player,
//       },
//     });
//     res.status(202).send({
//       id: fireflyRes.id,
//     });
//   } catch (e: any) {
//     res.status(500).send({
//       error: e.message,
//     });
//   }
// })

app.post("/api/updatePlayerBalance", async (req, res) => {
  try {   
    const fireflyRes = await firefly.invokeContractAPI(apiName, "updatePlayerBalance", {
      input: {
        player: req.body.player,
        balance: req.body.balance,
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
})

app.post("/api/getTokens", async (req, res) => {
  try {   
    const fireflyRes = await firefly.invokeContractAPI(apiName, "transferMoneyToWinner", {
      input: {
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

app.post("/api/mintTokens", async (req, res) => {
  try {
    const playersBalances = await firefly.getTokenBalances()

    const playerFound = playersBalances.find((p) => p?.key === req.body.player)

    if (playerFound?.balance === "0") {
      const freeMoney = 10 

      await firefly.mintTokens({
        amount: (freeMoney * 10**18).toString(),
        pool: process.env.TOKEN_POOL,
        to: playerFound?.key,
      })
    }
    // for (let i = 0; i < playersBalances.length; i++) {
      // if (playersBalances[]?.balance === "0") {
      //   const freeMoney = 10 
      //   await firefly.mintTokens({
      //     amount: (freeMoney * 10**18).toString(),
      //     pool: process.env.TOKEN_POOL,
      //     to: playersBalances[i]?.key,
      //   })
      //   await firefly.invokeContractAPI(apiName, "updatePlayerBalance", {
      //     input: {
      //       player: playersBalances[i]?.key,
      //       balance: freeMoney,
      //     },
      //   });
      // }
    // }
  } catch (e: any) {
    res.status(500).send({
      error: e.message,
    });
  }
})

app.post("/api/sendGuess", async (req, res) => {
  try {
    // const playersBalances = await firefly.getTokenBalances()

    // for (let i = 0; i < playersBalances.length; i++) {
    //   if (playersBalances[i]?.balance === "0") {
    //     const freeMoney = 10 
    //     await firefly.mintTokens({
    //       amount: (freeMoney * 10**18).toString(),
    //       pool: process.env.TOKEN_POOL,
    //       to: playersBalances[i]?.key,
    //     })
    //     await firefly.invokeContractAPI(apiName, "updatePlayerBalance", {
    //       input: {
    //         player: playersBalances[i]?.key,
    //         balance: freeMoney,
    //       },
    //     });
    //   }
    // }

    const fireflyRes = await firefly.invokeContractAPI(apiName, "sendGuess", {
      input: {
        guess: req.body.guess,
        betAmount: req.body.betAmount
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

  await firefly.createContractAPIListener(apiName, "GuessMade", {
    topic: "guessmade",
  });
  await firefly.createContractAPIListener(apiName, "BalanceTransferred", {
    topic: "balancetransferred",
  });

  // firefly.listen(
  //   {
  //     filter: {
  //       events: "blockchain_event_received",
  //     },
  //   },
  //   async (socket, event) => {
  //     console.log(event.blockchainEvent?.output);
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
