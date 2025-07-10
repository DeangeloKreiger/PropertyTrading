/**
 * Simple deployment script for PrivatePropertyTrading
 * Compatible with ethers 5.x
 */

const ethers = require("ethers");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function main() {
  console.log("🚀 Deploying PrivatePropertyTrading contract...\n");

  // Setup provider and deployer
  const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const deployer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Network: Sepolia Testnet");
  console.log("Chain ID: 11155111");
  console.log("Deployer address:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance), "ETH\n");

  if (balance.isZero()) {
    throw new Error("❌ Deployer account has zero balance! Get Sepolia ETH from a faucet.");
  }

  // Load contract artifact
  const artifactPath = path.join(__dirname, '../artifacts/contracts/PrivatePropertyTrading.sol/PrivatePropertyTrading.json');

  if (!fs.existsSync(artifactPath)) {
    throw new Error(`❌ Contract artifact not found at ${artifactPath}. Run 'npm run compile' first.`);
  }

  const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

  // Create contract factory
  const contractFactory = new ethers.ContractFactory(
    contractArtifact.abi,
    contractArtifact.bytecode,
    deployer
  );

  // Deploy contract (no constructor arguments)
  console.log("📤 Sending deployment transaction...");
  const contract = await contractFactory.deploy({
    gasLimit: 3000000  // Set a reasonable gas limit
  });

  console.log("Transaction hash:", contract.deployTransaction.hash);
  console.log("⏳ Waiting for confirmation...\n");

  // Wait for deployment
  await contract.deployTransaction.wait();

  const address = contract.address;

  console.log("✅ PrivatePropertyTrading deployed successfully!");
  console.log(`📍 Contract address: ${address}`);
  console.log(`🔗 Etherscan: https://sepolia.etherscan.io/address/${address}\n`);

  // Save deployment info
  const deploymentInfo = {
    contractName: "PrivatePropertyTrading",
    address: address,
    network: "sepolia",
    chainId: 11155111,
    deployer: deployer.address,
    transactionHash: contract.deployTransaction.hash,
    blockNumber: contract.deployTransaction.blockNumber,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(__dirname, '../deployment.json'),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("✅ Deployment info saved to deployment.json\n");

  // Display environment update instructions
  console.log("📝 Update your .env file with:");
  console.log(`VITE_CONTRACT_ADDRESS=${address}`);
  console.log(`CONTRACT_ADDRESS=${address}\n`);

  console.log("🔍 To verify on Etherscan:");
  console.log(`npx hardhat verify --network sepolia ${address}\n`);

  console.log("✨ Deployment complete!");

  return deploymentInfo;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error.message || error);
    process.exit(1);
  });
