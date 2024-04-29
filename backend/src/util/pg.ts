import { FireFlyTokenTransferResponse } from '@hyperledger/firefly-sdk';
import firefly, { KEY } from '../firefly/firefly';
import pgPool from '../db/pg';

export async function addAccountIfNotExists(account: string): Promise<void> {
    try {
        const accountExistsQuery = 'SELECT id FROM accounts WHERE account = $1';
        const { rowCount } = await pgPool.query(accountExistsQuery, [account]);

        if (rowCount === 0) {
            const insertAccountQuery =
                'INSERT INTO accounts (account) VALUES ($1)';
            await pgPool.query(insertAccountQuery, [account]);
        }
    } catch (error) {
        console.error('Error adding account:', error);
        throw error;
    }
}

export async function addBet({
    betId,
    user,
    gameId,
    teamId,
    amount,
}: {
    betId: string;
    user: string;
    gameId: string;
    teamId: string;
    amount: string;
}): Promise<void> {
    try {
        // Check if a bet with the same contract_id already exists
        const existingBetQuery = 'SELECT id FROM bets WHERE contract_id = $1';
        const existingBetResult = await pgPool.query(existingBetQuery, [
            Number(betId),
        ]);

        if (existingBetResult.rowCount > 0) {
            console.log('A bet with the same contract_id already exists');
        } else {
            const { rows, rowCount } = await pgPool.query(
                'SELECT id FROM accounts WHERE account = $1',
                [user]
            );

            if (rowCount === 0) {
                throw new Error('Account not found');
            }

            const accountId = rows[0].id;

            const insertTransactionQuery =
                'INSERT INTO bets (contract_id, account_id, game_id, team_id, amount) VALUES ($1, $2, $3, $4, $5)';
            await pgPool.query(insertTransactionQuery, [
                Number(betId),
                accountId,
                Number(gameId),
                Number(teamId),
                Number(amount),
            ]);
        }
    } catch (error) {
        console.error('Error adding bet:', error);
        throw error;
    }
}

export async function updateBet({ id }: { id: string }): Promise<void> {
    try {
        const queryText = 'UPDATE bets SET paid = true WHERE id = $1';
        const queryParams = [Number(id)];

        await pgPool.query(queryText, queryParams);
    } catch (error) {
        console.error('Error updating bet:', error);
        throw error;
    }
}

export async function addTransaction(
    tokenTransfer: FireFlyTokenTransferResponse
): Promise<void> {
    try {
        const { pool, from, tx, amount, created } = tokenTransfer;

        const { rows, rowCount } = await pgPool.query(
            'SELECT id FROM accounts WHERE account = $1',
            [from]
        );

        if (rowCount === 0) {
            throw new Error('Account not found');
        }

        const accountId = rows[0].id;

        const insertTransactionQuery =
            'INSERT INTO transactions (account_id, pool_id, transfer_id, created, amount, action) VALUES ($1, $2, $3, $4, $5, $6)';
        await pgPool.query(insertTransactionQuery, [
            accountId,
            pool,
            tx.id,
            created,
            amount,
            'credit',
        ]);
    } catch (error) {
        console.error('Error adding transaction:', error);
        throw error;
    }
}

export async function updateAccountBalance(
    tokenTransfer: FireFlyTokenTransferResponse
): Promise<void> {
    try {
        const { pool, from, amount } = tokenTransfer;

        const { rows, rowCount } = await pgPool.query(
            'SELECT id FROM accounts WHERE account = $1',
            [from]
        );

        if (rowCount === 0) {
            throw new Error('Account not found');
        }

        const accountId = rows[0].id;

        const updateBalanceQuery = `
            INSERT INTO account_balances (account_id, pool_id, balance)
            VALUES ($1, $2, $3)
            ON CONFLICT (account_id, pool_id) DO UPDATE
            SET balance = account_balances.balance + $3;
        `;
        await pgPool.query(updateBalanceQuery, [accountId, pool, amount]);
    } catch (error) {
        console.error('Error updating account balance:', error);
        throw error;
    }
}

export async function loadAccountTransactionData() {
    const transfers = await firefly.getTokenTransfers({
        type: 'transfer',
        to: KEY,
    });
    for (const transfer of transfers) {
        await addAccountIfNotExists(transfer.from);
        await addTransaction(transfer);
        await updateAccountBalance(transfer);
    }
}
