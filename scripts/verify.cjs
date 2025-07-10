const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.VITE_CONTRACT_ADDRESS || "0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24";

  console.log("Verifying PrivatePropertyTrading contract...");
  console.log(`Contract Address: ${contractAddress}`);
  console.log(`Network: ${hre.network.name}\n`);

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [], // No constructor args for this contract
      contract: "contracts/PrivatePropertyTrading.sol:PrivatePropertyTrading"
    });

    console.log("\n✅ Contract verified successfully!");
    console.log(`View on Etherscan: https://sepolia.etherscan.io/address/${contractAddress}#code`);

  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("\n✅ Contract is already verified!");
      console.log(`View on Etherscan: https://sepolia.etherscan.io/address/${contractAddress}#code`);
    } else {
      console.error("\n❌ Verification failed:", error.message);
      console.log("\nTroubleshooting:");
      console.log("1. Make sure ETHERSCAN_API_KEY is set in .env");
      console.log("2. Wait a few seconds after deployment before verifying");
      console.log("3. Ensure the contract address is correct");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
