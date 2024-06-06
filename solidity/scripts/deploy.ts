import { ethers } from "hardhat";

async function main() {
  const PollStorage = await ethers.getContractFactory("PollStorage");
  const pollStorage = await PollStorage.deploy();
  await pollStorage.deployed();

  console.log("Contracts deployed!\nAdd the addresses to backend/index.ts:");
  console.log(`POLL_STORAGE_ADDRESS: ${pollStorage.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
