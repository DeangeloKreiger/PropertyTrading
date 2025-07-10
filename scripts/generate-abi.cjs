const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("Generating ABI from PrivatePropertyTrading contract...\n");

  try {
    // Compile contracts
    await hre.run('compile');

    // Get contract artifact
    const artifactPath = path.join(
      __dirname,
      '../artifacts/contracts/PrivatePropertyTrading.sol/PrivatePropertyTrading.json'
    );

    if (!fs.existsSync(artifactPath)) {
      throw new Error("Contract artifact not found. Run 'npx hardhat compile' first.");
    }

    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    const abi = artifact.abi;

    console.log("✓ Contract compiled successfully");
    console.log(`✓ Found ${abi.length} ABI entries\n`);

    // Generate TypeScript file for frontend
    const tsContent = `// Contract ABI and Address Configuration
// Auto-generated from PrivatePropertyTrading.sol
// DO NOT EDIT MANUALLY - Run 'npm run generate:abi' to update

export const CONTRACT_ABI = ${JSON.stringify(abi, null, 2)} as const

// Contract address - set this after deployment
export const CONTRACT_ADDRESS = (import.meta.env.VITE_CONTRACT_ADDRESS || '0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24') as \`0x\${string}\`
`;

    const outputPath = path.join(__dirname, '../src/config/contracts.ts');
    fs.writeFileSync(outputPath, tsContent);

    console.log("✓ ABI generated successfully");
    console.log(`✓ Output: ${outputPath}\n`);

    // Also save raw ABI JSON
    const jsonPath = path.join(__dirname, '../src/config/abi.json');
    fs.writeFileSync(jsonPath, JSON.stringify(abi, null, 2));
    console.log(`✓ Raw ABI saved: ${jsonPath}\n`);

    // Display function summary
    console.log("Contract Functions:");
    console.log("─────────────────────────────────────────────");

    const functions = abi.filter(item => item.type === 'function');
    const events = abi.filter(item => item.type === 'event');

    console.log("\n📖 Read Functions:");
    functions
      .filter(f => f.stateMutability === 'view' || f.stateMutability === 'pure')
      .forEach(f => {
        const params = f.inputs.map(i => `${i.type} ${i.name}`).join(', ');
        console.log(`  • ${f.name}(${params})`);
      });

    console.log("\n✏️  Write Functions:");
    functions
      .filter(f => f.stateMutability === 'nonpayable')
      .forEach(f => {
        const params = f.inputs.map(i => `${i.type} ${i.name}`).join(', ');
        console.log(`  • ${f.name}(${params})`);
      });

    console.log("\n💰 Payable Functions:");
    functions
      .filter(f => f.stateMutability === 'payable')
      .forEach(f => {
        const params = f.inputs.map(i => `${i.type} ${i.name}`).join(', ');
        console.log(`  • ${f.name}(${params})`);
      });

    console.log("\n📡 Events:");
    events.forEach(e => {
      const params = e.inputs.map(i => `${i.indexed ? 'indexed ' : ''}${i.type} ${i.name}`).join(', ');
      console.log(`  • ${e.name}(${params})`);
    });

    console.log("\n─────────────────────────────────────────────");
    console.log(`\n✅ Total: ${functions.length} functions, ${events.length} events\n`);

  } catch (error) {
    console.error("❌ Error generating ABI:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => {
    console.log("✅ ABI generation complete!\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
