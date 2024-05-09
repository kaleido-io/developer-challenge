# Solidity Contracts: Kaleido Developer Challenge

This folder demonstrates how to compile, test, and deploy two sample solidity contracts with Hardhat. View the Hardhat [docs here](https://hardhat.org/hardhat-runner/docs/guides/compile-contracts)

## Sample contracts

- A basic storage contract: [simple_storage.sol](./contracts/simple_storage.sol)
- A basic ERC721 token contract: [token.sol](./contracts/token.sol)

## Install Dependencies

```bash
npm i
```

## Compile Smart Contracts

```bash
npm run compile
```

## Test Smart Contracts

```bash
npm run test
```

## Deploy Smart Contracts to FireFly

```bash
npx hardhat run scripts/deploy.ts --network firefly
```
