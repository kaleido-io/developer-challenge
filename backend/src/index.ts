import FireFly, { FireFlySubscriptionBase } from "@hyperledger/firefly-sdk";
import express from "express";
import bodyparser from "body-parser";
import simplestorage from "../contracts/simple_storage.json";
import { v4 as uuidv4 } from "uuid";
import winston from "winston";
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const PORT = 4001;
const HOST = "http://localhost:5000";
const NAMESPACE = "default";
const app = express();
const firefly = new FireFly({
  host: HOST,
  namespace: NAMESPACE,
});

let apiName: string;

app.use(bodyparser.json());

dotenv.config();

export const collections: { users?: mongoDB.Collection } = {}

interface Env {
  MONGODB_URL: string;
}

const myEnv: Env = {
  MONGODB_URL: process.env.REACT_APP_MONGODB_URL || ''
};

let userTransactionCollection: mongoDB.Collection;

//CONNECTION TO MONGOOSE DATABASE
export async function initDb() {
    const client = new mongoDB.MongoClient(process.env.MONGODB_URL as string)
    // const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB_URL);   
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME as string);
    userTransactionCollection = db.collection(process.env.DB_COLLECTION_NAME as string);
    

    logger.info(`Successfully connected to database: ${db.databaseName} and collection: ${userTransactionCollection.collectionName}`)

    collections.users = userTransactionCollection;
    // Inserting single document 
    // REMOVE THIS!!!!
    // userTransactionCollection.insertOne({"emailAddress": 'hirusepalika@gmail.com', "transactionId": 'faketransactionid'}); 
}

app.get("/api/value", async (req, res) => {
  res.send(await firefly.queryContractAPI(apiName, "get", {}));
});

app.post("/api/value", async (req, res) => {
  try {
    const fireflyRes = await firefly.invokeContractAPI(apiName, "set", {
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

app.post("/api/setMovieRating", async (req, res) => {
  try {
    const fireflyRes = await firefly.invokeContractAPI("movieRater3", "setMovieRating", {
      input: {
        userId: req.body.userId,
        ratingInfo: 
          {
              movieTitle: req.body.ratingInfo.movieTitle,
              movieRating: req.body.ratingInfo.movieRating
          }
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

app.get("/api/getMovieRatings", async (req, res) => {
  res.send(await firefly.queryContractAPI("movieRater3", "get", {
    input: {
      userId: req.body.userId
    }
  }));
});

app.get("/api/userTransactions", async (req, res) => {
  try {
     const userData = (await collections.users.find({}).toArray());

      res.status(200).send(userData);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

app.post("/api/newUser", (req, res) => {
  try {
    const {body} = req;
    // add new user to our user registry in mongodb
    userTransactionCollection.insertOne({"emailAddress": body.newUserEmail})
    res.status(202).send({
      emailAddress: body.newUserEmail,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

async function init() {
  const deployRes = await firefly.deployContract(
    {
      definition:
        simplestorage.contracts["simple_storage.sol:SimpleStorage"].abi,
      contract: simplestorage.contracts["simple_storage.sol:SimpleStorage"].bin,
      input: ["0"],
    },
    { confirm: true }
  );
  const contractAddress = deployRes.output.contractLocation.address;

  const generatedFFI = await firefly.generateContractInterface({
    name: uuidv4(),
    namespace: NAMESPACE,
    version: "1.0",
    description: "Auto-deployed simple-storage contract",
    input: {
      abi: simplestorage.contracts["simple_storage.sol:SimpleStorage"].abi,
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

  await initDb()

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
