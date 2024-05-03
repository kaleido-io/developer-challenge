import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token", function () {
  async function deployTokenContract() {
    const [owner, accountA] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    return { token, owner, accountA };
  }

  describe("mint", function () {
    it("Should deploy token and mint", async function () {
      const { token, owner, accountA } = await loadFixture(deployTokenContract);
      // Verify name and symbol
      expect(await token.name()).to.equal("Token");
      expect(await token.symbol()).to.equal("TKN");
      // Accounts should be 0 after contract is deployed
      expect(await token.balanceOf(owner.address)).to.equal(0);
      expect(await token.balanceOf(accountA.address)).to.equal(0);
      // Mint token to accountA
      await token.safeMint(accountA.address, 1);
      expect(await token.balanceOf(accountA.address)).to.equal(1);
    });
  });
});
