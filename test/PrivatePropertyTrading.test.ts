import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { PrivatePropertyTrading } from "../typechain-types";

describe("PrivatePropertyTrading", function () {
  let contract: PrivatePropertyTrading;
  let owner: HardhatEthersSigner;
  let alice: HardhatEthersSigner;
  let bob: HardhatEthersSigner;
  let charlie: HardhatEthersSigner;

  // Deployment fixture
  async function deployFixture() {
    const [deployer, addr1, addr2, addr3] = await ethers.getSigners();

    const PrivatePropertyTradingFactory = await ethers.getContractFactory("PrivatePropertyTrading");
    const deployedContract = await PrivatePropertyTradingFactory.deploy();
    await deployedContract.waitForDeployment();

    return {
      contract: deployedContract,
      owner: deployer,
      alice: addr1,
      bob: addr2,
      charlie: addr3
    };
  }

  beforeEach(async function () {
    const deployment = await deployFixture();
    contract = deployment.contract;
    owner = deployment.owner;
    alice = deployment.alice;
    bob = deployment.bob;
    charlie = deployment.charlie;
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(await contract.getAddress()).to.be.properAddress;
    });

    it("Should have zero properties initially", async function () {
      expect(await contract.getTotalProperties()).to.equal(0);
    });

    it("Should have zero transactions initially", async function () {
      expect(await contract.getTotalTransactions()).to.equal(0);
    });

    it("Should return empty array for listed properties", async function () {
      const listed = await contract.getListedProperties();
      expect(listed.length).to.equal(0);
    });
  });

  describe("Property Registration", function () {
    it("Should register a new property successfully", async function () {
      const propertyHash = "QmTest123";
      const price = ethers.parseEther("1.0");

      const tx = await contract.connect(alice).registerProperty(propertyHash, price);
      await tx.wait();

      expect(await contract.getTotalProperties()).to.equal(1);
    });

    it("Should emit PropertyRegistered event", async function () {
      const propertyHash = "QmTest123";
      const price = ethers.parseEther("1.0");

      await expect(contract.connect(alice).registerProperty(propertyHash, price))
        .to.emit(contract, "PropertyRegistered")
        .withArgs(1, alice.address, price);
    });

    it("Should store property with correct details", async function () {
      const propertyHash = "QmTest123";
      const price = ethers.parseEther("1.0");

      await contract.connect(alice).registerProperty(propertyHash, price);

      const property = await contract.getProperty(1);
      expect(property.id).to.equal(1);
      expect(property.owner).to.equal(alice.address);
      expect(property.propertyHash).to.equal(propertyHash);
      expect(property.price).to.equal(price);
      expect(property.isListed).to.be.false;
    });

    it("Should add property to user's properties list", async function () {
      const propertyHash = "QmTest123";
      const price = ethers.parseEther("1.0");

      await contract.connect(alice).registerProperty(propertyHash, price);

      const aliceProperties = await contract.getPropertiesByOwner(alice.address);
      expect(aliceProperties.length).to.equal(1);
      expect(aliceProperties[0]).to.equal(1);
    });

    it("Should allow multiple properties from same owner", async function () {
      await contract.connect(alice).registerProperty("QmTest1", ethers.parseEther("1.0"));
      await contract.connect(alice).registerProperty("QmTest2", ethers.parseEther("2.0"));

      const aliceProperties = await contract.getPropertiesByOwner(alice.address);
      expect(aliceProperties.length).to.equal(2);
      expect(await contract.getTotalProperties()).to.equal(2);
    });

    it("Should revert when property hash is empty", async function () {
      const price = ethers.parseEther("1.0");

      await expect(
        contract.connect(alice).registerProperty("", price)
      ).to.be.revertedWith("Property hash cannot be empty");
    });

    it("Should revert when price is zero", async function () {
      const propertyHash = "QmTest123";

      await expect(
        contract.connect(alice).registerProperty(propertyHash, 0)
      ).to.be.revertedWith("Price must be greater than 0");
    });
  });

  describe("Property Listing", function () {
    beforeEach(async function () {
      await contract.connect(alice).registerProperty("QmTest123", ethers.parseEther("1.0"));
    });

    it("Should list property successfully", async function () {
      await contract.connect(alice).listProperty(1);

      const property = await contract.getProperty(1);
      expect(property.isListed).to.be.true;
      expect(property.listedAt).to.be.gt(0);
    });

    it("Should emit PropertyListed event", async function () {
      await expect(contract.connect(alice).listProperty(1))
        .to.emit(contract, "PropertyListed")
        .withArgs(1, ethers.parseEther("1.0"));
    });

    it("Should add to listed properties array", async function () {
      await contract.connect(alice).listProperty(1);

      const listed = await contract.getListedProperties();
      expect(listed.length).to.equal(1);
      expect(listed[0]).to.equal(1);
    });

    it("Should revert when listing non-existent property", async function () {
      await expect(
        contract.connect(alice).listProperty(999)
      ).to.be.revertedWith("Property does not exist");
    });

    it("Should revert when non-owner tries to list", async function () {
      await expect(
        contract.connect(bob).listProperty(1)
      ).to.be.revertedWith("Not property owner");
    });

    it("Should revert when listing already listed property", async function () {
      await contract.connect(alice).listProperty(1);

      await expect(
        contract.connect(alice).listProperty(1)
      ).to.be.revertedWith("Property already listed");
    });
  });

  describe("Property Delisting", function () {
    beforeEach(async function () {
      await contract.connect(alice).registerProperty("QmTest123", ethers.parseEther("1.0"));
      await contract.connect(alice).listProperty(1);
    });

    it("Should delist property successfully", async function () {
      await contract.connect(alice).delistProperty(1);

      const property = await contract.getProperty(1);
      expect(property.isListed).to.be.false;
      expect(property.listedAt).to.equal(0);
    });

    it("Should emit PropertyDelisted event", async function () {
      await expect(contract.connect(alice).delistProperty(1))
        .to.emit(contract, "PropertyDelisted")
        .withArgs(1);
    });

    it("Should revert when delisting non-listed property", async function () {
      await contract.connect(alice).delistProperty(1);

      await expect(
        contract.connect(alice).delistProperty(1)
      ).to.be.revertedWith("Property not listed");
    });

    it("Should revert when non-owner tries to delist", async function () {
      await expect(
        contract.connect(bob).delistProperty(1)
      ).to.be.revertedWith("Not property owner");
    });
  });

  describe("Price Update", function () {
    beforeEach(async function () {
      await contract.connect(alice).registerProperty("QmTest123", ethers.parseEther("1.0"));
    });

    it("Should update price successfully", async function () {
      const newPrice = ethers.parseEther("2.0");
      await contract.connect(alice).updatePrice(1, newPrice);

      const property = await contract.getProperty(1);
      expect(property.price).to.equal(newPrice);
    });

    it("Should emit PriceUpdated event", async function () {
      const oldPrice = ethers.parseEther("1.0");
      const newPrice = ethers.parseEther("2.0");

      await expect(contract.connect(alice).updatePrice(1, newPrice))
        .to.emit(contract, "PriceUpdated")
        .withArgs(1, oldPrice, newPrice);
    });

    it("Should revert when new price is zero", async function () {
      await expect(
        contract.connect(alice).updatePrice(1, 0)
      ).to.be.revertedWith("Price must be greater than 0");
    });

    it("Should revert when non-owner tries to update price", async function () {
      await expect(
        contract.connect(bob).updatePrice(1, ethers.parseEther("2.0"))
      ).to.be.revertedWith("Not property owner");
    });
  });

  describe("Property Purchase", function () {
    beforeEach(async function () {
      await contract.connect(alice).registerProperty("QmTest123", ethers.parseEther("1.0"));
      await contract.connect(alice).listProperty(1);
    });

    it("Should purchase property successfully", async function () {
      const price = ethers.parseEther("1.0");

      await contract.connect(bob).purchaseProperty(1, { value: price });

      const property = await contract.getProperty(1);
      expect(property.owner).to.equal(bob.address);
      expect(property.isListed).to.be.false;
    });

    it("Should emit PropertyPurchased event", async function () {
      const price = ethers.parseEther("1.0");

      await expect(contract.connect(bob).purchaseProperty(1, { value: price }))
        .to.emit(contract, "PropertyPurchased")
        .withArgs(1, bob.address, alice.address, price);
    });

    it("Should transfer funds to seller", async function () {
      const price = ethers.parseEther("1.0");
      const initialBalance = await ethers.provider.getBalance(alice.address);

      await contract.connect(bob).purchaseProperty(1, { value: price });

      const finalBalance = await ethers.provider.getBalance(alice.address);
      expect(finalBalance - initialBalance).to.equal(price);
    });

    it("Should record transaction", async function () {
      const price = ethers.parseEther("1.0");

      await contract.connect(bob).purchaseProperty(1, { value: price });

      expect(await contract.getTotalTransactions()).to.equal(1);
      const tx = await contract.getTransaction(1);
      expect(tx.propertyId).to.equal(1);
      expect(tx.seller).to.equal(alice.address);
      expect(tx.buyer).to.equal(bob.address);
      expect(tx.price).to.equal(price);
      expect(tx.completed).to.be.true;
    });

    it("Should refund excess payment", async function () {
      const price = ethers.parseEther("1.0");
      const overpayment = ethers.parseEther("1.5");
      const initialBalance = await ethers.provider.getBalance(bob.address);

      const tx = await contract.connect(bob).purchaseProperty(1, { value: overpayment });
      const receipt = await tx.wait();
      const gasCost = receipt!.gasUsed * receipt!.gasPrice;

      const finalBalance = await ethers.provider.getBalance(bob.address);
      const expectedBalance = initialBalance - price - gasCost;

      // Allow for small rounding differences
      expect(finalBalance).to.be.closeTo(expectedBalance, ethers.parseEther("0.0001"));
    });

    it("Should revert when property not listed", async function () {
      await contract.connect(alice).delistProperty(1);

      await expect(
        contract.connect(bob).purchaseProperty(1, { value: ethers.parseEther("1.0") })
      ).to.be.revertedWith("Property not listed");
    });

    it("Should revert when buyer is owner", async function () {
      await expect(
        contract.connect(alice).purchaseProperty(1, { value: ethers.parseEther("1.0") })
      ).to.be.revertedWith("Cannot buy your own property");
    });

    it("Should revert with insufficient payment", async function () {
      await expect(
        contract.connect(bob).purchaseProperty(1, { value: ethers.parseEther("0.5") })
      ).to.be.revertedWith("Insufficient payment");
    });
  });

  describe("View Functions", function () {
    beforeEach(async function () {
      await contract.connect(alice).registerProperty("QmTest1", ethers.parseEther("1.0"));
      await contract.connect(bob).registerProperty("QmTest2", ethers.parseEther("2.0"));
      await contract.connect(alice).registerProperty("QmTest3", ethers.parseEther("3.0"));

      await contract.connect(alice).listProperty(1);
      await contract.connect(alice).listProperty(3);
    });

    it("Should get properties by owner", async function () {
      const aliceProperties = await contract.getPropertiesByOwner(alice.address);
      expect(aliceProperties.length).to.equal(2);

      const bobProperties = await contract.getPropertiesByOwner(bob.address);
      expect(bobProperties.length).to.equal(1);
    });

    it("Should get all listed properties", async function () {
      const listed = await contract.getListedProperties();
      expect(listed.length).to.equal(2);
      expect(listed[0]).to.equal(1);
      expect(listed[1]).to.equal(3);
    });

    it("Should get total properties", async function () {
      expect(await contract.getTotalProperties()).to.equal(3);
    });

    it("Should get transactions by user after purchase", async function () {
      await contract.connect(charlie).purchaseProperty(1, { value: ethers.parseEther("1.0") });

      const charlieTransactions = await contract.getTransactionsByUser(charlie.address);
      expect(charlieTransactions.length).to.equal(1);

      const aliceTransactions = await contract.getTransactionsByUser(alice.address);
      expect(aliceTransactions.length).to.equal(1);
    });
  });

  describe("Gas Optimization", function () {
    it("Property registration should be gas efficient", async function () {
      const tx = await contract.connect(alice).registerProperty("QmTest123", ethers.parseEther("1.0"));
      const receipt = await tx.wait();

      expect(receipt!.gasUsed).to.be.lt(200000);
    });

    it("Property listing should be gas efficient", async function () {
      await contract.connect(alice).registerProperty("QmTest123", ethers.parseEther("1.0"));

      const tx = await contract.connect(alice).listProperty(1);
      const receipt = await tx.wait();

      expect(receipt!.gasUsed).to.be.lt(100000);
    });

    it("Property purchase should be gas efficient", async function () {
      await contract.connect(alice).registerProperty("QmTest123", ethers.parseEther("1.0"));
      await contract.connect(alice).listProperty(1);

      const tx = await contract.connect(bob).purchaseProperty(1, { value: ethers.parseEther("1.0") });
      const receipt = await tx.wait();

      expect(receipt!.gasUsed).to.be.lt(300000);
    });
  });

  describe("Edge Cases", function () {
    it("Should handle very large price values", async function () {
      const largePrice = ethers.parseEther("1000000");

      await contract.connect(alice).registerProperty("QmTest123", largePrice);

      const property = await contract.getProperty(1);
      expect(property.price).to.equal(largePrice);
    });

    it("Should handle long property hashes", async function () {
      const longHash = "Qm" + "a".repeat(100);

      await contract.connect(alice).registerProperty(longHash, ethers.parseEther("1.0"));

      const property = await contract.getProperty(1);
      expect(property.propertyHash).to.equal(longHash);
    });

    it("Should handle multiple purchases in sequence", async function () {
      for (let i = 0; i < 5; i++) {
        await contract.connect(alice).registerProperty(`QmTest${i}`, ethers.parseEther("1.0"));
        await contract.connect(alice).listProperty(i + 1);
      }

      for (let i = 0; i < 5; i++) {
        await contract.connect(bob).purchaseProperty(i + 1, { value: ethers.parseEther("1.0") });
      }

      expect(await contract.getTotalTransactions()).to.equal(5);
      const bobProperties = await contract.getPropertiesByOwner(bob.address);
      expect(bobProperties.length).to.equal(5);
    });
  });
});
