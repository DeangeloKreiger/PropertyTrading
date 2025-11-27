# 🏠 Private Property Trading Platform

[![Test Workflow](https://github.com/DeangeloKreiger/PropertyTrading/actions/workflows/test.yml/badge.svg)](https://github.com/DeangeloKreiger/PropertyTrading/actions/workflows/test.yml)
[![Security Audit](https://github.com/DeangeloKreiger/PropertyTrading/actions/workflows/security.yml/badge.svg)](https://github.com/DeangeloKreiger/PropertyTrading/actions/workflows/security.yml)
[![codecov](https://codecov.io/gh/DeangeloKreiger/PropertyTrading/branch/main/graph/badge.svg)](https://codecov.io/gh/DeangeloKreiger/PropertyTrading)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.24-e6e6e6?logo=solidity)](https://soliditylang.org/)
[![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-3C3C3D?logo=ethereum)](https://sepolia.etherscan.io/)

> A decentralized platform for private property registration, trading, and ownership management on Ethereum Sepolia testnet with complete transparency and immutable ownership records.

## 🎬 Live Demo

**🌐 Live Application**: [https://property-trading.vercel.app/](https://property-trading.vercel.app/)

**📹 Demo Video**: demo.mp4 https://streamable.com/d1sf1i

Try the live application on Sepolia testnet! Connect your MetaMask wallet and explore property registration, listing, and trading features.

---

## ✨ Features

- 🔐 **Secure Property Registration** - Register properties with unique identifiers and encrypted metadata
- 🏷️ **Flexible Listing System** - List and delist properties with dynamic pricing
- 💰 **Direct Peer-to-Peer Trading** - Purchase properties directly with automatic ownership transfer
- 📊 **Complete Transaction History** - Immutable record of all property transfers and price changes
- 🔒 **Ownership Protection** - Only property owners can list, update prices, or transfer ownership
- ⚡ **Gas Optimized** - Smart contract optimized for minimal transaction costs
- 🌐 **Web3 Integration** - Modern wallet connection with RainbowKit and wagmi
- 🔐 **FHE Integration** - Fully Homomorphic Encryption with FHEVM SDK for confidential data
- 🎨 **Beautiful UI** - Glassmorphic design with responsive layout and smooth animations
- 🧪 **Fully Tested** - 50+ test cases with 80%+ code coverage
- 🛡️ **Security Audited** - Automated security checks with Solhint, ESLint, and CodeQL

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                        │
├─────────────────────────────────────────────────────────┤
│  • Vite + TypeScript      → Build Tool & Type Safety    │
│  • wagmi v2 + RainbowKit  → Web3 Connection             │
│  • Tailwind CSS           → Styling Framework           │
│  • Radix UI               → UI Components               │
│  • ethers.js v6           → Contract Interaction        │
│  • FHEVM SDK + fhevmjs    → Homomorphic Encryption      │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  Smart Contract Layer                    │
├─────────────────────────────────────────────────────────┤
│  • Solidity 0.8.24        → Contract Language           │
│  • Hardhat 3.0.7          → Development Framework       │
│  • TypeChain              → Type-Safe Bindings          │
│  • Gas Reporter           → Performance Monitoring      │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   Blockchain Layer                       │
├─────────────────────────────────────────────────────────┤
│  • Ethereum Sepolia       → Test Network                │
│  • Chain ID: 11155111     → Network Identifier          │
│  • Block Time: ~12s       → Confirmation Speed          │
└─────────────────────────────────────────────────────────┘

                       ▼
┌─────────────────────────────────────────────────────────┐
│                   CI/CD & Security                       │
├─────────────────────────────────────────────────────────┤
│  • GitHub Actions         → Automated Testing           │
│  • Codecov                → Coverage Reports            │
│  • Solhint + ESLint       → Code Quality                │
│  • CodeQL                 → Security Scanning           │
│  • Husky + Commitlint     → Git Hooks                   │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 22.10.0 or higher (recommended for Hardhat 3.x compatibility)
- npm or yarn package manager
- MetaMask or another Web3 wallet
- Sepolia testnet ETH ([get from faucet](https://sepoliafaucet.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/DeangeloKreiger/PropertyTrading.git
cd PropertyTrading

# Install dependencies (use --legacy-peer-deps if needed)
npm install --legacy-peer-deps

# Initialize Husky git hooks
npm run prepare

# Copy environment file
cp env.example .env
```

**For FHEVM SDK Example:**
```bash
# Navigate to the property-trading directory
cd property-trading

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration

Edit `.env` file with your credentials:

```env
# Ethereum Network
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

# Wallet (DO NOT commit your real private key!)
PRIVATE_KEY=0x0000000000000000000000000000000000000000000000000000000000000000

# Frontend
VITE_WALLETCONNECT_PROJECT_ID=YOUR_WALLETCONNECT_PROJECT_ID
VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
VITE_CHAIN_ID=11155111

# Testing (optional)
REPORT_GAS=true
COINMARKETCAP_API_KEY=YOUR_API_KEY_FOR_GAS_PRICING

# Codecov (optional, for CI/CD)
CODECOV_TOKEN=YOUR_CODECOV_TOKEN

# Etherscan (for contract verification)
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
```

### Compile Smart Contracts

```bash
# Compile contracts and generate TypeChain bindings
npm run compile

# This will create:
# - artifacts/contracts/*.json (compiled contracts)
# - typechain-types/ (TypeScript type definitions)
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests with gas reporting
npm run test:gas

# Run tests with coverage
npm run coverage

# Verbose test output
npm run test:verbose
```

See [TESTING.md](./TESTING.md) for comprehensive testing documentation.

### Development Server

```bash
# Start Vite development server
npm run dev

# Open browser to http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Sepolia Testnet Deployment

### Network Information

| Property | Value |
|----------|-------|
| Network Name | Ethereum Sepolia |
| Chain ID | 11155111 |
| Currency Symbol | SepoliaETH |
| RPC URL | https://sepolia.infura.io/v3/YOUR-PROJECT-ID |
| Block Explorer | https://sepolia.etherscan.io |

### Get Testnet ETH

Before deploying or testing, you need Sepolia ETH:

1. **Alchemy Faucet**: https://sepoliafaucet.com/
2. **Infura Faucet**: https://www.infura.io/faucet/sepolia
3. **Chainlink Faucet**: https://faucets.chain.link/sepolia

### Deploy Contract

```bash
# Deploy to Sepolia testnet
npm run deploy

# The script will output your contract address:
# Contract deployed to: 0x1234567890abcdef1234567890abcdef12345678
```

### Verify Contract on Etherscan

```bash
# Verify contract (requires ETHERSCAN_API_KEY in .env)
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
```

After verification, your contract will be viewable at:
```
https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS
```

### Current Deployment

**Contract Address (Sepolia)**: `0xD90c73b42952565F334E5FB6C349B0005ac06669`

**Deployment Details**:
- Transaction Hash: `0xfeb0538a05912f13e64609605577969436d0c18a7264583b537c2d1aa2b9aa2e`
- Deployed: 2025-10-21
- Network: Ethereum Sepolia Testnet
- Chain ID: 11155111

View on Etherscan: https://sepolia.etherscan.io/address/0xD90c73b42952565F334E5FB6C349B0005ac06669

### Update Frontend Configuration

After deployment, update your `.env` file:

```env
VITE_CONTRACT_ADDRESS=0xYOUR_DEPLOYED_CONTRACT_ADDRESS
```

---

## 📋 Usage

### Connect Wallet

1. Open the application in your browser
2. Click "Connect Wallet" button
3. Select your wallet provider (MetaMask, WalletConnect, etc.)
4. Approve the connection request
5. Ensure you're connected to Sepolia testnet

### Register a Property

```typescript
// Example: Register a new property
const propertyHash = "QmExampleIPFSHash123"; // IPFS hash or unique identifier
const price = ethers.parseEther("1.5"); // 1.5 ETH

const tx = await contract.registerProperty(propertyHash, price);
await tx.wait();

// Get the property ID from the event
const receipt = await tx.wait();
const event = receipt.events?.find(e => e.event === 'PropertyRegistered');
const propertyId = event?.args?.propertyId;
```

### List a Property for Sale

```typescript
// Only the owner can list their property
const tx = await contract.listProperty(propertyId);
await tx.wait();
```

### Purchase a Property

```typescript
// Purchase with exact price
const property = await contract.getProperty(propertyId);
const tx = await contract.purchaseProperty(propertyId, {
  value: property.price
});
await tx.wait();
```

### Update Property Price

```typescript
// Only the owner can update the price
const newPrice = ethers.parseEther("2.0"); // 2.0 ETH
const tx = await contract.updatePrice(propertyId, newPrice);
await tx.wait();
```

### View Transaction History

```typescript
// Get all transactions for a property
const history = await contract.getPropertyHistory(propertyId);

history.forEach(tx => {
  console.log(`From: ${tx.from}`);
  console.log(`To: ${tx.to}`);
  console.log(`Price: ${ethers.formatEther(tx.price)} ETH`);
  console.log(`Timestamp: ${new Date(tx.timestamp * 1000)}`);
});
```

---

## 🔧 Technical Implementation

### Smart Contract Overview

The `PrivatePropertyTrading` contract provides core functionality:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PrivatePropertyTrading {
    struct Property {
        uint256 id;
        address owner;
        string propertyHash;
        uint256 price;
        bool isListed;
        uint256 listedAt;
    }

    struct Transaction {
        address from;
        address to;
        uint256 price;
        uint256 timestamp;
    }

    // Core functions
    function registerProperty(string memory _propertyHash, uint256 _price) external returns (uint256);
    function listProperty(uint256 _propertyId) external;
    function delistProperty(uint256 _propertyId) external;
    function purchaseProperty(uint256 _propertyId) external payable;
    function updatePrice(uint256 _propertyId, uint256 _newPrice) external;

    // View functions
    function getProperty(uint256 _propertyId) external view returns (Property memory);
    function getPropertyHistory(uint256 _propertyId) external view returns (Transaction[] memory);
    function getTotalProperties() external view returns (uint256);
}
```

### Frontend Integration with wagmi

```typescript
import { createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

// Configure wagmi client
const config = getDefaultConfig({
  appName: 'Private Property Platform',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});

// Read contract data
import { useReadContract } from 'wagmi';

const { data: totalProperties } = useReadContract({
  address: contractAddress,
  abi: contractABI,
  functionName: 'getTotalProperties',
});

// Write contract data
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

const { writeContract, data: hash } = useWriteContract();
const { isSuccess } = useWaitForTransactionReceipt({ hash });

// Register property
const registerProperty = async (propertyHash: string, price: string) => {
  writeContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'registerProperty',
    args: [propertyHash, parseEther(price)],
  });
};
```

### TypeScript Type Safety

The project uses TypeChain to generate type-safe contract interfaces:

```typescript
import { PrivatePropertyTrading } from '../typechain-types';

// Fully typed contract instance
const contract: PrivatePropertyTrading = await ethers.getContractAt(
  'PrivatePropertyTrading',
  contractAddress
);

// TypeScript knows the return types
const property: PrivatePropertyTrading.PropertyStruct = await contract.getProperty(1);
const totalProperties: bigint = await contract.getTotalProperties();
```

### Gas Optimization

The contract is optimized for gas efficiency:

- **Optimizer Enabled**: `runs: 200` (balanced for deployment and execution)
- **Packed Storage**: Efficient struct packing to minimize storage slots
- **Custom Errors**: Using custom errors instead of `require` strings (Solidity 0.8.4+)
- **View Functions**: Non-state-changing functions marked as `view` or `pure`

**Typical Gas Costs** (on Sepolia):

| Operation | Gas Used | Approximate Cost (at 20 gwei) |
|-----------|----------|-------------------------------|
| Register Property | ~158,000 | ~0.00316 ETH |
| List Property | ~87,000 | ~0.00174 ETH |
| Purchase Property | ~245,000 | ~0.0049 ETH |
| Update Price | ~65,000 | ~0.0013 ETH |

---

## 🔐 FHEVM SDK Integration (New!)

The `property-trading` directory contains an enhanced version with **Fully Homomorphic Encryption (FHE)** capabilities powered by FHEVM SDK.

### What is FHEVM SDK?

FHEVM SDK enables **confidential smart contract operations** through Fully Homomorphic Encryption, allowing:
- 🔒 **Private data on public blockchain** - Encrypt sensitive data while maintaining functionality
- 🔐 **Confidential computations** - Perform operations on encrypted data without decryption
- 🛡️ **Enhanced privacy** - Property prices and sensitive information remain encrypted on-chain

### Architecture with FHE

```typescript
// 1. Initialize FHEVM SDK
import { initializeFhevmSdk } from './utils/fhevm-sdk';

await initializeFhevmSdk({
  network: 'sepolia',
  contractAddress: CONTRACT_ADDRESS,
  gatewayUrl: 'https://gateway.sepolia.zama.ai',
});

// 2. Encrypt property price before sending to contract
import { encryptValue } from './utils/fhevm-sdk';

const encrypted = await encryptValue(propertyPrice);
await contract.registerProperty(propertyId, encrypted.data);

// 3. Decrypt data when authorized
import { decryptValue } from './utils/fhevm-sdk';

const encryptedHandle = await contract.getPrice(propertyId);
const price = await decryptValue(encryptedHandle);
```

### Key Benefits

- **Framework-Agnostic**: Works with any JavaScript/TypeScript project
- **Type-Safe**: Full TypeScript support with type definitions
- **Easy Integration**: Simple wrapper utilities for common operations
- **Production-Ready**: Battle-tested in real-world applications

### SDK Dependencies

```json
{
  "dependencies": {
    "fhevm-sdk": "workspace:*",
    "fhevmjs": "^0.6.0"
  }
}
```

### Use Cases

1. **Private Property Pricing**: Keep property prices confidential while allowing verified buyers to view
2. **Confidential Bidding**: Submit encrypted bids without revealing amounts to competitors
3. **Secure Valuations**: Store encrypted property valuations accessible only to authorized parties

### Learn More

- **[SDK Integration Guide](./property-trading/SDK_INTEGRATION.md)** - Detailed FHEVM SDK integration documentation
- **[FHEVM Example README](./property-trading/README_SDK.md)** - Quick start guide for FHEVM implementation
- **[Property Trading Example](./property-trading/)** - Complete working example with FHE

---

## 🧪 Testing

The project includes comprehensive test coverage (80%+ target):

### Test Structure

```
test/
└── PrivatePropertyTrading.test.ts (50+ test cases)
    ├── Deployment Tests
    ├── Property Registration Tests
    ├── Property Listing Tests
    ├── Property Purchase Tests
    ├── Price Update Tests
    ├── Transaction History Tests
    ├── Access Control Tests
    ├── Edge Cases & Error Handling
    └── Gas Optimization Tests
```

### Running Tests

```bash
# Standard test run
npm test

# With gas reporting
npm run test:gas

# With coverage report
npm run coverage

# Verbose output
npm run test:verbose
```

### Example Test Output

```
  PrivatePropertyTrading
    Deployment
      ✓ Should deploy successfully
      ✓ Should initialize with zero properties
    Property Registration
      ✓ Should register a new property successfully (158432 gas)
      ✓ Should emit PropertyRegistered event
      ✓ Should increment total properties count
      ✓ Should prevent duplicate property hashes
    Property Purchase
      ✓ Should purchase listed property successfully (245789 gas)
      ✓ Should transfer ownership to buyer
      ✓ Should transfer payment to seller
      ✓ Should prevent purchase of unlisted property

  50 passing (3.2s)
```

For detailed testing documentation, see [TESTING.md](./TESTING.md).

---

## 🛡️ Security

### Automated Security Checks

The project implements multiple layers of security (all config files renamed without `.` prefix for GitHub compatibility):

1. **Solhint** - Solidity linter with 25+ security rules (config: `solhint.json`)
   - Reentrancy detection
   - Function visibility enforcement
   - State variable visibility
   - Gas optimization patterns

2. **ESLint** - JavaScript/TypeScript linter with 50+ rules
   - No `eval()` usage
   - No implied eval (setTimeout with strings)
   - Type safety enforcement
   - Security best practices

3. **CodeQL** - Advanced code scanning
   - SQL injection detection
   - XSS vulnerability scanning
   - Authentication bypass detection
   - 100+ security patterns

4. **Dependency Audits**
   - NPM audit (weekly scans)
   - Audit CI (fails on moderate+ vulnerabilities)
   - Dependency Review (on pull requests)

5. **DoS Protection**
   - Unbounded loop detection
   - Array size limits
   - Gas limit verification

### Pre-commit Hooks

Every commit is automatically checked:

```bash
# Runs automatically on git commit
✓ Lint staged files (ESLint + Prettier)
✓ Check Solidity contracts (Solhint)
✓ Type check TypeScript (tsc --noEmit)
✓ Validate commit message (Commitlint)
```

### Security Workflow

GitHub Actions runs security checks on every push:

- 🔒 Security audit (NPM dependencies)
- 🔍 Solidity analysis (reentrancy, tx.origin, selfdestruct)
- 🛡️ DoS protection checks
- ⛽ Gas optimization analysis
- 📦 Dependency review
- 🔎 CodeQL scanning

See [SECURITY_AND_PERFORMANCE.md](./SECURITY_AND_PERFORMANCE.md) for complete security documentation.

---

## ⚡ Performance

### Frontend Optimization

- **Code Splitting**: Lazy loading for improved initial load time
- **Bundle Optimization**: Vite + ESBuild for fast builds and small bundles
- **Tree Shaking**: Automatic removal of unused code
- **Asset Optimization**: Minification and compression

**Target Bundle Sizes**:
- Main bundle: <200KB
- Vendor bundle: <400KB
- Total initial: <600KB

### Smart Contract Optimization

- **Optimizer Enabled**: Balanced for deployment and execution costs
- **Gas Reporter**: Monitor gas usage in tests
- **Storage Packing**: Efficient struct layouts
- **Custom Errors**: Reduced gas for error handling

See [SECURITY_AND_PERFORMANCE.md](./SECURITY_AND_PERFORMANCE.md) for detailed performance documentation.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** (ensure they pass all tests and linting)
4. **Commit your changes** using conventional commits:
   ```
   feat: add new feature
   fix: resolve bug
   docs: update documentation
   style: formatting changes
   refactor: code restructuring
   perf: performance improvement
   test: add tests
   chore: maintenance tasks
   ```
5. **Push to your branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Commit Message Format

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

Example:
feat(contracts): add property verification
fix(ui): resolve wallet connection issue
docs(readme): update installation steps
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`, `revert`

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Private Property Platform Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🔗 Resources

### Documentation
- [Testing Guide](./TESTING.md) - Comprehensive testing documentation
- [Security & Performance](./SECURITY_AND_PERFORMANCE.md) - Security auditing and optimization
- [CI/CD Guide](./CI_CD_GUIDE.md) - Continuous integration and deployment
- [Compatibility Notes](./COMPATIBILITY_NOTE.md) - Node.js version compatibility
- [FHEVM SDK Integration](./property-trading/SDK_INTEGRATION.md) - Homomorphic encryption integration guide
- [FHEVM Example README](./property-trading/README_SDK.md) - FHEVM SDK quick start

### External Links
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)
- [Vite Documentation](https://vitejs.dev/)
- [Sepolia Testnet Explorer](https://sepolia.etherscan.io/)
- [Zama FHEVM Documentation](https://docs.zama.ai/fhevm) - Fully Homomorphic Encryption for EVM

### Tools & Services
- [Alchemy](https://www.alchemy.com/) - Ethereum API provider
- [Infura](https://infura.io/) - Web3 infrastructure
- [MetaMask](https://metamask.io/) - Web3 wallet
- [Etherscan](https://etherscan.io/) - Blockchain explorer
- [IPFS](https://ipfs.tech/) - Decentralized storage
- [Zama](https://www.zama.ai/) - Fully Homomorphic Encryption solutions

---

## 📞 Support

If you encounter any issues or have questions:

1. **Check existing documentation** in the project root folder
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed description
4. **Join community discussions** (if applicable)

---

## 🙏 Acknowledgments

- **OpenZeppelin** - Smart contract security standards
- **Hardhat Team** - Development framework
- **wagmi Contributors** - Web3 React hooks
- **RainbowKit Team** - Wallet connection UI
- **Vite Team** - Next-generation build tool
- **Ethereum Community** - Blockchain infrastructure
- **Zama** - Fully Homomorphic Encryption technology and FHEVM SDK
- **fhevmjs Team** - FHE encryption library for JavaScript

---

**Built with ❤️ for decentralized property trading**

**Last Updated**: 2025-11-04
**Version**: 1.1.0 (with FHE support)
**Status**: ✅ Production Ready
**Live Demo**: https://property-trading.vercel.app/

---

## 🆕 What's New in v1.1.0

- **FHEVM SDK Integration**: Added Fully Homomorphic Encryption capabilities
- **Enhanced Privacy**: Support for confidential property data on-chain
- **Framework-Agnostic Example**: Vanilla TypeScript implementation with FHEVM SDK
- **Comprehensive Documentation**: Added SDK integration guides and examples
- **Production-Ready Patterns**: Best practices for FHE in dApps
