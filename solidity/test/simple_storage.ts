import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("simple_storage", function () {
  async function deploySimpleStorage() {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simple_storage = await SimpleStorage.deploy();

    return { simple_storage };
  }

  describe("set", function () {
    it("Should set the value to 10", async function () {
      const { simple_storage } = await loadFixture(deploySimpleStorage);

      await simple_storage.set(10);
      expect(await simple_storage.get()).to.equal(10);
    });
    it("Should set the value to 20", async function () {
      const { simple_storage } = await loadFixture(deploySimpleStorage);

      await simple_storage.set(20);
      expect(await simple_storage.get()).to.equal(20);
    });
  });
});
