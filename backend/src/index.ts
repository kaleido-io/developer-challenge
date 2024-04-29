import express from 'express';
import firefly, { KEY, NAME, NAMESPACE, APINAME } from './firefly/firefly';
import sportsBetting from '../contracts/sports_betting.json';
import logger from './middleware/logger';
import login from './routes/api/login/login';
import teams from './routes/api/teams/teams';
import games from './routes/api/games/games';
import bets from './routes/api/bets/bets';
import accounts from './routes/api/accounts/accounts';
import transactions from './routes/api/transactions/transactions';
import accountBalances from './routes/api/accountbalances/accountbalances';
import contractGames from './routes/api/contract/games';
import contractBets from './routes/api/contract/bets';
import contractTokens from './routes/api/contract/tokens';
import {
    addAccountIfNotExists,
    addBet,
    updateBet,
    addTransaction,
    updateAccountBalance,
} from './util/pg';

const NODEPORT = process.env.NODEPORT;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// API
app.use('/api/login', login);
app.use('/api/teams', teams);
app.use('/api/games', games);
app.use('/api/bets', bets);
app.use('/api/accounts', accounts);
app.use('/api/transactions', transactions);
app.use('/api/accountbalances', accountBalances);
app.use('/api/contract/games', contractGames);
app.use('/api/contract/bets', contractBets);
app.use('/api/contract/tokens', contractTokens);

let ADDRESS;
const TOKEN_POOL = '7bad5a41-192c-4935-bb6a-843eeb5d6f97';

async function init() {
    const contractInfo = await firefly.getContractAPI(APINAME);
    if (contractInfo) {
        console.log(
            'Contract already deployed. Skipping deployment.',
            JSON.stringify(contractInfo, null, 2)
        );
    } else {
        const deployRes = await firefly.deployContract(
            {
                definition:
                    sportsBetting.contracts[
                        'contracts/sports_betting.sol:SportsBetting'
                    ].abi,
                contract:
                    sportsBetting.contracts[
                        'contracts/sports_betting.sol:SportsBetting'
                    ].bin,
                input: ['TESTTOKENS', '$TT'],
            },
            { confirm: true }
        );
        ADDRESS = deployRes.input.key;
        const contractAddress = deployRes.output.contractLocation.address;

        const generatedFFI = await firefly.generateContractInterface({
            name: NAME,
            namespace: NAMESPACE,
            version: '1.0',
            description: 'Auto-deployed increment contract',
            input: {
                abi: sportsBetting.contracts[
                    'contracts/sports_betting.sol:SportsBetting'
                ].abi,
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
                name: APINAME,
            },
            { confirm: true }
        );
    }

    await firefly.createContractAPIListener(APINAME, 'GameAdded', {
        topic: 'gameAdded',
    });
    await firefly.createContractAPIListener(APINAME, 'GameStarted', {
        topic: 'gameStarted',
    });
    await firefly.createContractAPIListener(APINAME, 'GameFinished', {
        topic: 'gameFinished',
    });
    await firefly.createContractAPIListener(APINAME, 'TokenName', {
        topic: 'tokenName',
    });
    await firefly.createContractAPIListener(APINAME, 'TokenSymbol', {
        topic: 'tokenSymbol',
    });
    await firefly.createContractAPIListener(APINAME, 'TokenBalance', {
        topic: 'tokenBalance',
    });
    await firefly.createContractAPIListener(APINAME, 'TokenSupply', {
        topic: 'tokenSupply',
    });
    await firefly.createContractAPIListener(APINAME, 'TokenAllowance', {
        topic: 'tokenAllowance',
    });
    await firefly.createContractAPIListener(APINAME, 'BetPlaced', {
        topic: 'betPlaced',
    });
    await firefly.createContractAPIListener(APINAME, 'BetLost', {
        topic: 'betLost',
    });
    await firefly.createContractAPIListener(APINAME, 'BetWon', {
        topic: 'betWon',
    });

    firefly.listen(
        {
            filter: {
                events: 'blockchain_event_received',
            },
        },
        async (socket, event) => {
            const output: any = event.blockchainEvent?.output;
            console.log('blockchain-event: ', output);

            if (output?.eventName === 'BetPlaced') {
                await addAccountIfNotExists(output.user);
                await addBet(output);
            }

            if (
                output?.eventName === 'BetWon' ||
                output?.eventName === 'BetLost'
            ) {
                await addAccountIfNotExists(output.user);
                await updateBet({ id: output.betId });
            }
        }
    );

    firefly.listen(
        {
            filter: {
                events: 'token_transfer_confirmed',
            },
        },
        async (socket, event) => {
            if (
                event.type === 'token_transfer_confirmed' &&
                event.tokenTransfer?.pool === TOKEN_POOL &&
                event.tokenTransfer?.to === KEY
            ) {
                await addAccountIfNotExists(event.tokenTransfer?.from);
                await addTransaction(event.tokenTransfer);
                await updateAccountBalance(event.tokenTransfer);
            }
            console.log('tokenTransferConfirmed:', event);
        }
    );

    // Start listening
    app.listen(NODEPORT, () =>
        console.log(`Kaleido DApp backend listening on port ${NODEPORT}!`)
    );
}

init().catch((err) => {
    console.error(err.stack);
    process.exit(1);
});

module.exports = {
    app,
};
