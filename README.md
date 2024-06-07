## Poller: Decentralized polling

Poller is a simple app that allows users to create and vote in polls. It leverages the blockchain to
act as a decentralized, transparent, and immutable 'source of truth' for poll and vote data.

Follow the instructions below to run project.

_*NOTE: It is assumed that you are running FireFly locally.*_

### 1) Set up Postgres
The project contains a docker-compose script to spin up a dockerized Postgres instance. Just run
`docker-compose up --build` to get it up and running. The correct user with (way too much power) will be
set up. The app database will also be created.

_(I was planning to dockerize the whole project with a docker-compose to spin it all up together, but it was
taking too long)_

### 2) Compile and deploy Solidity contract
Navigate to `./solidity` and run the commands below

##### Install Dependencies

```bash
npm i
```

#### Compile Smart Contracts

```bash
npm run compile
```

#### Deploy Smart Contracts to FireFly

```bash
npx hardhat run initdb/deploy.ts --network firefly
```

### 3) Set up and run backend
The backend is a fairly straightforward web server implemented in NodeJS, using the Express web library.
The language used is TypeScript. It uses Postgres for its storage.

To run, navigate to `./backend` and execute the following:

```bash
npm install
npm start
```

### 4) Set up and run frontend
The frontend is implemented with the React framework in TypeScript.

To run, navigate to `./frontend` and execute the following

```bash
npm install
npm start
```

Finally, navigate to [http://localhost:4000](http://localhost:4000) to use app.