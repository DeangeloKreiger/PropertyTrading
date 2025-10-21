/**
 * Deployment script for PrivatePropertyTrading v2.0
 * Updated to support new Gateway contract specifications
 *
 * Changes:
 * - Constructor now requires pauser addresses array and KMS generation
 * - NUM_PAUSERS environment variable determines number of pausers
 * - PAUSER_ADDRESS_[0-N] environment variables for each pauser
 * - KMS_GENERATION replaces old kmsManagement
 */

const hre = require("hardhat");
const ethers = require("ethers");
require("dotenv").config();

async function main() {
  console.log("Starting PrivatePropertyTrading v2.0 deployment...\n");

  // Setup provider and deployer
  const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const deployer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString(), "\n");

  // ==================== LOAD PAUSER ADDRESSES ====================

  const numPausers = parseInt(process.env.NUM_PAUSERS || "0");
  console.log(`Number of pausers to configure: ${numPausers}`);

  if (numPausers === 0) {
    throw new Error("NUM_PAUSERS must be set in .env file (should be n_kms + n_copro)");
  }

  const pauserAddresses = [];
  for (let i = 0; i < numPausers; i++) {
    const pauserKey = `PAUSER_ADDRESS_${i}`;
    const pauserAddress = process.env[pauserKey];

    if (!pauserAddress) {
      throw new Error(`Missing environment variable: ${pauserKey}`);
    }

    pauserAddresses.push(pauserAddress.trim());
    console.log(`  Pauser ${i}: ${pauserAddress}`);
  }

  // ==================== LOAD KMS GENERATION ====================

  const kmsGeneration = parseInt(process.env.KMS_GENERATION || "1");
  console.log(`\nKMS Generation: ${kmsGeneration}`);

  if (kmsGeneration < 1) {
    throw new Error("KMS_GENERATION must be >= 1");
  }

  // ==================== DEPLOY CONTRACT ====================

  console.log("\nDeploying PrivatePropertyTrading contract...");

  // Load contract artifact
  const contractArtifact = require("../artifacts/contracts/PrivatePropertyTrading.sol/PrivatePropertyTrading.json");
  const contractFactory = new ethers.ContractFactory(
    contractArtifact.abi,
    contractArtifact.bytecode,
    deployer
  );

  // Deploy with new constructor parameters
  console.log("Sending deployment transaction...");
  const contract = await contractFactory.deploy(
    pauserAddresses,
    kmsGeneration,
    { gasLimit: 10000000 }
  );

  console.log("Waiting for deployment confirmation...");
  await contract.deployTransaction.wait();

  console.log("\n✅ PrivatePropertyTrading deployed to:", contract.address);
  console.log("Transaction hash:", contract.deployTransaction.hash);

  // ==================== VERIFY DEPLOYMENT ====================

  console.log("\n📋 Verifying deployment...");

  const owner = await contract.owner();
  const deployedKmsGen = await contract.kmsGeneration();
  const pauserCount = await contract.getPauserCount();
  const isPaused = await contract.isPaused();

  console.log("  Owner:", owner);
  console.log("  KMS Generation:", deployedKmsGen.toString());
  console.log("  Pauser Count:", pauserCount.toString());
  console.log("  Is Paused:", isPaused);

  // Verify each pauser
  for (let i = 0; i < pauserAddresses.length; i++) {
    const isPauserValid = await contract.isPauser(pauserAddresses[i]);
    console.log(`  Pauser ${i} (${pauserAddresses[i]}): ${isPauserValid ? "✅" : "❌"}`);
  }

  // ==================== SAVE DEPLOYMENT INFO ====================

  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: contract.address,
    deployer: deployer.address,
    kmsGeneration: kmsGeneration,
    numPausers: numPausers,
    pauserAddresses: pauserAddresses,
    deploymentTime: new Date().toISOString(),
    transactionHash: contract.deployTransaction.hash,
    blockNumber: contract.deployTransaction.blockNumber
  };

  console.log("\n📝 Deployment Summary:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  // ==================== ETHERSCAN VERIFICATION ====================

  console.log("\n⏳ Waiting for additional block confirmations...");
  console.log("Note: You can verify the contract later on Etherscan using:");
  console.log(`npx hardhat verify --network sepolia ${contract.address} "[${pauserAddresses.map(a => `\\"${a}\\"`).join(',')}]" ${kmsGeneration}`);

  console.log("\n✅ Deployment completed successfully!\n");

  return deploymentInfo;
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
