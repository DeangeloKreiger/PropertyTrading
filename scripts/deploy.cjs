const hre = require("hardhat");

async function main() {
  console.log("Deploying PrivatePropertyTrading contract...");
  console.log(`Network: ${hre.network.name}`);
  console.log(`Chain ID: ${hre.network.config.chainId}`);

  // Get the contract factory
  const PrivatePropertyTrading = await hre.ethers.getContractFactory("PrivatePropertyTrading");

  // Deploy the contract
  console.log("\nDeploying contract...");
  const contract = await PrivatePropertyTrading.deploy();

  // Wait for deployment (Hardhat 2.x / ethers 5.x)
  await contract.deployed();

  const address = contract.address;

  console.log(`\n✅ PrivatePropertyTrading deployed to: ${address}`);
  console.log(`Transaction hash: ${contract.deployTransaction.hash}`);
  console.log(`\nVerify with: npx hardhat verify --network sepolia ${address}`);

  // Save deployment info
  const fs = require('fs');
  const deploymentInfo = {
    address: address,
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    timestamp: new Date().toISOString(),
    deployer: contract.deployTransaction.from,
    transactionHash: contract.deployTransaction.hash
  };

  fs.writeFileSync(
    './deployment.json',
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\n✅ Deployment info saved to deployment.json");
  console.log(`\n📝 Update your .env file:`);
  console.log(`VITE_CONTRACT_ADDRESS=${address}`);
  console.log(`CONTRACT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
