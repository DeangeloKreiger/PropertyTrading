const hre = require("hardhat");
const { formatEther, parseEther } = require("ethers");

async function main() {
  const contractAddress = process.env.VITE_CONTRACT_ADDRESS || "0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24";

  console.log("Connecting to PrivatePropertyTrading contract...");
  console.log(`Address: ${contractAddress}`);
  console.log(`Network: ${hre.network.name}\n`);

  // Get contract instance
  const contract = await hre.ethers.getContractAt("PrivatePropertyTrading", contractAddress);
  const [signer] = await hre.ethers.getSigners();

  console.log(`Using account: ${signer.address}\n`);
  console.log("═══════════════════════════════════════════════════════\n");

  try {
    // Get total properties
    const totalProperties = await contract.getTotalProperties();
    console.log(`📊 Total Properties: ${totalProperties.toString()}\n`);

    // Get total transactions
    const totalTransactions = await contract.getTotalTransactions();
    console.log(`💼 Total Transactions: ${totalTransactions.toString()}\n`);

    // Get listed properties
    const listedPropertyIds = await contract.getListedProperties();
    console.log(`🏪 Listed Properties: ${listedPropertyIds.length}`);
    if (listedPropertyIds.length > 0) {
      console.log(`   IDs: [${listedPropertyIds.join(", ")}]\n`);
    } else {
      console.log("   (No properties listed)\n");
    }

    // Get user properties
    const userProperties = await contract.getPropertiesByOwner(signer.address);
    console.log(`🏠 Your Properties: ${userProperties.length}`);
    if (userProperties.length > 0) {
      console.log(`   IDs: [${userProperties.join(", ")}]\n`);
    } else {
      console.log("   (No properties owned)\n");
    }

    // Display property details
    if (totalProperties > 0n) {
      console.log("═══════════════════════════════════════════════════════");
      console.log("📋 Property Details:\n");

      for (let i = 1n; i <= totalProperties; i++) {
        try {
          const property = await contract.getProperty(i);
          console.log(`Property #${i}:`);
          console.log(`  Owner: ${property.owner}`);
          console.log(`  Hash: ${property.propertyHash}`);
          console.log(`  Price: ${formatEther(property.price)} ETH`);
          console.log(`  Listed: ${property.isListed ? "✅ Yes" : "❌ No"}`);
          if (property.isListed) {
            const listedDate = new Date(Number(property.listedAt) * 1000);
            console.log(`  Listed At: ${listedDate.toLocaleString()}`);
          }
          console.log("");
        } catch (error) {
          console.log(`  (Property #${i} not found or error)\n`);
        }
      }
    }

    // Display transaction history
    if (totalTransactions > 0n) {
      console.log("═══════════════════════════════════════════════════════");
      console.log("💳 Transaction History:\n");

      for (let i = 1n; i <= totalTransactions; i++) {
        try {
          const tx = await contract.getTransaction(i);
          console.log(`Transaction #${i}:`);
          console.log(`  Property ID: ${tx.propertyId}`);
          console.log(`  Seller: ${tx.seller}`);
          console.log(`  Buyer: ${tx.buyer}`);
          console.log(`  Price: ${formatEther(tx.price)} ETH`);
          const txDate = new Date(Number(tx.timestamp) * 1000);
          console.log(`  Date: ${txDate.toLocaleString()}`);
          console.log(`  Status: ${tx.completed ? "✅ Completed" : "⏳ Pending"}`);
          console.log("");
        } catch (error) {
          console.log(`  (Transaction #${i} not found or error)\n`);
        }
      }
    }

    console.log("═══════════════════════════════════════════════════════");
    console.log("\n✅ Interaction complete!\n");

    // Example operations (commented out - uncomment to test)
    /*
    console.log("Example: Registering a new property...");
    const tx = await contract.registerProperty("QmExampleHash123", parseEther("1.5"));
    await tx.wait();
    console.log("✅ Property registered!");

    console.log("\nExample: Listing property #1...");
    const tx2 = await contract.listProperty(1);
    await tx2.wait();
    console.log("✅ Property listed!");
    */

  } catch (error) {
    console.error("\n❌ Error:", error.message);

    if (error.message.includes("Property does not exist")) {
      console.log("\n💡 Tip: No properties exist yet. Try registering one first!");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
