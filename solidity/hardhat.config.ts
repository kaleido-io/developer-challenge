import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  defaultNetwork: "firefly",
  networks: {
    firefly: {
      url: "http://127.0.0.1:5100",
    },
    hardhat: {
      allowUnlimitedContractSize: true,
    },
  },
};

export default config;
