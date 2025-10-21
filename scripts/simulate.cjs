const hre = require("hardhat");
const { formatEther, parseEther } = require("ethers");

async function main() {
  const contractAddress = process.env.VITE_CONTRACT_ADDRESS || "0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24";

  console.log("🎭 Simulating PrivatePropertyTrading Operations");
  console.log("═══════════════════════════════════════════════════════\n");

  // Get contract and signers
  const contract = await hre.ethers.getContractAt("PrivatePropertyTrading", contractAddress);
  const [owner, buyer1, buyer2] = await hre.ethers.getSigners();

  console.log("Accounts:");
  console.log(`  Owner:  ${owner.address}`);
  console.log(`  Buyer1: ${buyer1.address}`);
  console.log(`  Buyer2: ${buyer2.address}\n`);

  console.log("═══════════════════════════════════════════════════════");

  try {
    // Step 1: Register properties
    console.log("\n📝 Step 1: Registering properties...\n");

    console.log("Registering Property #1 (Luxury Villa)...");
    const tx1 = await contract.connect(owner).registerProperty(
      "QmLuxuryVilla123abc",
      parseEther("10.5")
    );
    await tx1.wait();
    console.log("✅ Property #1 registered (10.5 ETH)\n");

    console.log("Registering Property #2 (Downtown Apartment)...");
    const tx2 = await contract.connect(owner).registerProperty(
      "QmApartment456def",
      parseEther("5.2")
    );
    await tx2.wait();
    console.log("✅ Property #2 registered (5.2 ETH)\n");

    console.log("Registering Property #3 (Beach House)...");
    const tx3 = await contract.connect(buyer1).registerProperty(
      "QmBeachHouse789ghi",
      parseEther("8.0")
    );
    await tx3.wait();
    console.log("✅ Property #3 registered (8.0 ETH) [by Buyer1]\n");

    // Check totals
    const totalProps = await contract.getTotalProperties();
    console.log(`📊 Total Properties: ${totalProps}\n`);

    console.log("═══════════════════════════════════════════════════════");

    // Step 2: List properties
    console.log("\n🏪 Step 2: Listing properties for sale...\n");

    console.log("Listing Property #1...");
    const tx4 = await contract.connect(owner).listProperty(1);
    await tx4.wait();
    console.log("✅ Property #1 listed\n");

    console.log("Listing Property #2...");
    const tx5 = await contract.connect(owner).listProperty(2);
    await tx5.wait();
    console.log("✅ Property #2 listed\n");

    const listedProps = await contract.getListedProperties();
    console.log(`🏪 Listed Properties: [${listedProps.join(", ")}]\n`);

    console.log("═══════════════════════════════════════════════════════");

    // Step 3: Update price
    console.log("\n💰 Step 3: Updating property price...\n");

    console.log("Updating Property #1 price to 12.0 ETH...");
    const tx6 = await contract.connect(owner).updatePrice(1, parseEther("12.0"));
    await tx6.wait();
    console.log("✅ Price updated\n");

    const prop1 = await contract.getProperty(1);
    console.log(`   New Price: ${formatEther(prop1.price)} ETH\n`);

    console.log("═══════════════════════════════════════════════════════");

    // Step 4: Purchase property
    console.log("\n🛒 Step 4: Purchasing property...\n");

    const property2 = await contract.getProperty(2);
    console.log(`Buyer1 purchasing Property #2 for ${formatEther(property2.price)} ETH...`);

    const tx7 = await contract.connect(buyer1).purchaseProperty(2, {
      value: property2.price
    });
    await tx7.wait();
    console.log("✅ Property #2 purchased by Buyer1\n");

    // Verify ownership change
    const prop2After = await contract.getProperty(2);
    console.log(`   New Owner: ${prop2After.owner}`);
    console.log(`   Listed: ${prop2After.isListed ? "Yes" : "No"}\n`);

    console.log("═══════════════════════════════════════════════════════");

    // Step 5: Delist property
    console.log("\n❌ Step 5: Delisting property...\n");

    console.log("Owner delisting Property #1...");
    const tx8 = await contract.connect(owner).delistProperty(1);
    await tx8.wait();
    console.log("✅ Property #1 delisted\n");

    const listedPropsAfter = await contract.getListedProperties();
    console.log(`🏪 Listed Properties: [${listedPropsAfter.join(", ")}]\n`);

    console.log("═══════════════════════════════════════════════════════");

    // Step 6: Display final state
    console.log("\n📊 Final State:\n");

    const totalTransactions = await contract.getTotalTransactions();
    console.log(`Total Transactions: ${totalTransactions}\n`);

    console.log("Property Ownership:");
    for (let i = 1; i <= totalProps; i++) {
      const prop = await contract.getProperty(BigInt(i));
      console.log(`  Property #${i}:`);
      console.log(`    Owner: ${prop.owner}`);
      console.log(`    Price: ${formatEther(prop.price)} ETH`);
      console.log(`    Listed: ${prop.isListed ? "✅" : "❌"}`);
    }

    console.log("\nUser Properties:");
    const ownerProps = await contract.getPropertiesByOwner(owner.address);
    const buyer1Props = await contract.getPropertiesByOwner(buyer1.address);
    const buyer2Props = await contract.getPropertiesByOwner(buyer2.address);

    console.log(`  Owner:  ${ownerProps.length} properties [${ownerProps.join(", ")}]`);
    console.log(`  Buyer1: ${buyer1Props.length} properties [${buyer1Props.join(", ")}]`);
    console.log(`  Buyer2: ${buyer2Props.length} properties [${buyer2Props.join(", ")}]`);

    console.log("\n═══════════════════════════════════════════════════════");
    console.log("\n✅ Simulation Complete!\n");

  } catch (error) {
    console.error("\n❌ Simulation Error:", error.message);

    if (error.message.includes("Not property owner")) {
      console.log("\n💡 Tip: Only the property owner can perform this action");
    } else if (error.message.includes("Property already listed")) {
      console.log("\n💡 Tip: This property is already listed");
    } else if (error.message.includes("Property not listed")) {
      console.log("\n💡 Tip: This property is not listed for sale");
    } else if (error.message.includes("Cannot buy your own property")) {
      console.log("\n💡 Tip: You cannot purchase your own property");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
