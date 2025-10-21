/**
 * Test suite for PrivatePropertyTrading v2.0
 * Tests new Gateway contract features
 */

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PrivatePropertyTrading v2.0 - Gateway Integration Tests", function () {
  let contract;
  let owner;
  let pauser1, pauser2, pauser3;
  let user1, user2;
  let pauserAddresses;
  const KMS_GENERATION = 1;

  beforeEach(async function () {
    // Get signers
    [owner, pauser1, pauser2, pauser3, user1, user2] = await ethers.getSigners();

    pauserAddresses = [pauser1.address, pauser2.address, pauser3.address];

    // Deploy contract
    const PrivatePropertyTrading = await ethers.getContractFactory("PrivatePropertyTrading");
    contract = await PrivatePropertyTrading.deploy(pauserAddresses, KMS_GENERATION);
    await contract.deployed();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await contract.owner()).to.equal(owner.address);
    });

    it("Should set the correct KMS generation", async function () {
      expect(await contract.kmsGeneration()).to.equal(KMS_GENERATION);
    });

    it("Should initialize with correct number of pausers", async function () {
      expect(await contract.getPauserCount()).to.equal(3);
    });

    it("Should correctly register all pauser addresses", async function () {
      for (let i = 0; i < pauserAddresses.length; i++) {
        expect(await contract.isPauser(pauserAddresses[i])).to.be.true;
        expect(await contract.getPauserAtIndex(i)).to.equal(pauserAddresses[i]);
      }
    });

    it("Should not be paused initially", async function () {
      expect(await contract.isPaused()).to.be.false;
      expect(await contract.isContractPaused()).to.be.false;
    });
  });

  describe("Pauser Management", function () {
    it("Should allow owner to add new pauser", async function () {
      const newPauser = user1.address;
      await expect(contract.addPauser(newPauser))
        .to.emit(contract, "PauserAdded")
        .withArgs(newPauser, await getBlockTimestamp());

      expect(await contract.isPauser(newPauser)).to.be.true;
      expect(await contract.getPauserCount()).to.equal(4);
    });

    it("Should not allow non-owner to add pauser", async function () {
      await expect(
        contract.connect(user1).addPauser(user2.address)
      ).to.be.revertedWith("Not authorized");
    });

    it("Should allow owner to remove pauser", async function () {
      await expect(contract.removePauser(pauser1.address))
        .to.emit(contract, "PauserRemoved");

      expect(await contract.isPauser(pauser1.address)).to.be.false;
      expect(await contract.getPauserCount()).to.equal(2);
    });

    it("Should not allow removing non-existent pauser", async function () {
      await expect(
        contract.removePauser(user1.address)
      ).to.be.revertedWith("Not a pauser");
    });

    it("Should get all pausers correctly", async function () {
      const allPausers = await contract.getAllPausers();
      expect(allPausers.length).to.equal(3);
      expect(allPausers).to.deep.equal(pauserAddresses);
    });
  });

  describe("Pause/Unpause Functionality", function () {
    it("Should allow pauser to pause contract", async function () {
      await expect(contract.connect(pauser1).pause())
        .to.emit(contract, "ContractPaused")
        .withArgs(pauser1.address, await getBlockTimestamp());

      expect(await contract.isPaused()).to.be.true;
      expect(await contract.isPublicDecryptAllowed()).to.be.false;
    });

    it("Should not allow non-pauser to pause", async function () {
      await expect(
        contract.connect(user1).pause()
      ).to.be.revertedWith("Not a pauser");
    });

    it("Should allow owner to unpause", async function () {
      await contract.connect(pauser1).pause();

      await expect(contract.unpause())
        .to.emit(contract, "ContractUnpaused")
        .withArgs(owner.address, await getBlockTimestamp());

      expect(await contract.isPaused()).to.be.false;
      expect(await contract.isPublicDecryptAllowed()).to.be.true;
    });

    it("Should not allow non-owner to unpause", async function () {
      await contract.connect(pauser1).pause();

      await expect(
        contract.connect(user1).unpause()
      ).to.be.revertedWith("Not authorized");
    });

    it("Should prevent listing property when paused", async function () {
      await contract.connect(pauser1).pause();

      await expect(
        contract.listProperty("New York", "Office", 1000000, 5000)
      ).to.be.revertedWith("Contract is paused");
    });
  });

  describe("KMS Generation Management", function () {
    it("Should return correct KMS generation", async function () {
      expect(await contract.getKmsGeneration()).to.equal(KMS_GENERATION);
    });

    it("Should allow owner to update KMS generation", async function () {
      const newGeneration = 2;
      await expect(contract.updateKmsGeneration(newGeneration))
        .to.emit(contract, "KmsGenerationUpdated")
        .withArgs(KMS_GENERATION, newGeneration);

      expect(await contract.kmsGeneration()).to.equal(newGeneration);
    });

    it("Should not allow non-owner to update KMS generation", async function () {
      await expect(
        contract.connect(user1).updateKmsGeneration(2)
      ).to.be.revertedWith("Not authorized");
    });
  });

  describe("Decryption Request System", function () {
    it("Should allow requesting decryption", async function () {
      const encryptedValue = ethers.utils.formatBytes32String("encrypted");

      await expect(contract.requestDecryption(encryptedValue))
        .to.emit(contract, "DecryptionRequested");

      const requestId = 1;
      const request = await contract.getDecryptionRequest(requestId);

      expect(request.requester).to.equal(owner.address);
      expect(request.encryptedValue).to.equal(encryptedValue);
      expect(request.fulfilled).to.be.false;
      expect(request.kmsGenerationUsed).to.equal(KMS_GENERATION);
    });

    it("Should increment decryption request counter", async function () {
      const encryptedValue1 = ethers.utils.formatBytes32String("encrypted1");
      const encryptedValue2 = ethers.utils.formatBytes32String("encrypted2");

      await contract.requestDecryption(encryptedValue1);
      await contract.requestDecryption(encryptedValue2);

      expect(await contract.decryptionRequestCounter()).to.equal(2);
    });

    it("Should allow submitting decryption response", async function () {
      const encryptedValue = ethers.utils.formatBytes32String("encrypted");
      await contract.requestDecryption(encryptedValue);

      const requestId = 1;
      const encryptedShare = ethers.utils.toUtf8Bytes("share");
      const signature = ethers.utils.toUtf8Bytes("signature");

      await expect(
        contract.submitDecryptionResponse(requestId, encryptedShare, signature)
      ).to.emit(contract, "DecryptionResponse")
        .withArgs(
          requestId,
          owner.address,
          ethers.utils.hexlify(encryptedShare),
          ethers.utils.hexlify(signature),
          await getBlockTimestamp()
        );
    });
  });

  describe("is...() Functions (Replaced check...())", function () {
    it("Should return true for isPublicDecryptAllowed when not paused", async function () {
      expect(await contract.isPublicDecryptAllowed()).to.be.true;
    });

    it("Should return false for isPublicDecryptAllowed when paused", async function () {
      await contract.connect(pauser1).pause();
      expect(await contract.isPublicDecryptAllowed()).to.be.false;
    });

    it("Should return correct isPauser status", async function () {
      expect(await contract.isPauser(pauser1.address)).to.be.true;
      expect(await contract.isPauser(user1.address)).to.be.false;
    });

    it("Should return correct isContractPaused status", async function () {
      expect(await contract.isContractPaused()).to.be.false;
      await contract.connect(pauser1).pause();
      expect(await contract.isContractPaused()).to.be.true;
    });
  });

  describe("Property Trading Functions (with whenNotPaused)", function () {
    it("Should allow listing property when not paused", async function () {
      await expect(
        contract.listProperty("Los Angeles", "Retail", 2000000, 10000)
      ).to.emit(contract, "PropertyListed");

      expect(await contract.propertyCounter()).to.equal(1);
    });

    it("Should block listing property when paused", async function () {
      await contract.connect(pauser1).pause();

      await expect(
        contract.listProperty("Los Angeles", "Retail", 2000000, 10000)
      ).to.be.revertedWith("Contract is paused");
    });

    it("Should allow submitting offer when not paused", async function () {
      // First list a property
      await contract.listProperty("Chicago", "Warehouse", 1500000, 8000);
      const propertyId = 1;

      // Submit offer from different user
      await expect(
        contract.connect(user1).submitPrivateOffer(propertyId, 1400000, 12, 48)
      ).to.emit(contract, "OfferSubmitted");

      expect(await contract.offerCounter()).to.equal(1);
    });

    it("Should block submitting offer when paused", async function () {
      await contract.listProperty("Chicago", "Warehouse", 1500000, 8000);
      await contract.connect(pauser1).pause();

      await expect(
        contract.connect(user1).submitPrivateOffer(1, 1400000, 12, 48)
      ).to.be.revertedWith("Contract is paused");
    });
  });

  describe("Emergency Pause", function () {
    it("Should deactivate all properties and offers on emergency pause", async function () {
      // List properties
      await contract.listProperty("Property 1", "Office", 1000000, 5000);
      await contract.listProperty("Property 2", "Retail", 2000000, 10000);

      // Submit offers
      await contract.connect(user1).submitPrivateOffer(1, 900000, 12, 48);
      await contract.connect(user2).submitPrivateOffer(2, 1900000, 24, 48);

      // Emergency pause
      await contract.connect(pauser1).emergencyPause();

      expect(await contract.isPaused()).to.be.true;

      // Check properties are deactivated
      const property1 = await contract.properties(1);
      const property2 = await contract.properties(2);
      expect(property1.isActive).to.be.false;
      expect(property1.isForSale).to.be.false;
      expect(property2.isActive).to.be.false;
      expect(property2.isForSale).to.be.false;

      // Check offers are deactivated
      const offer1 = await contract.offers(1);
      const offer2 = await contract.offers(2);
      expect(offer1.isActive).to.be.false;
      expect(offer1.isRejected).to.be.true;
      expect(offer2.isActive).to.be.false;
      expect(offer2.isRejected).to.be.true;
    });
  });

  // Helper function
  async function getBlockTimestamp() {
    const blockNumber = await ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNumber);
    return block.timestamp;
  }
});
