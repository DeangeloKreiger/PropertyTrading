# 🛠️ Hardhat Scripts Guide

## ✅ Completed Configuration

### Contract ABI Updated
**File**: `src/config/contracts.ts`
- ✅ Generated complete ABI from PrivatePropertyTrading.sol
- ✅ Includes all 18 functions + 5 events
- ✅ Public mappings: properties, transactions, userProperties, userTransactions
- ✅ Contract address: `0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24`

The frontend now uses the **correct ABI** that matches your deployed contract!

---

## 📜 Available Hardhat Scripts

### 1. Deploy Script (`scripts/deploy.cjs`)
```bash
npm run deploy
```

**What it does**:
- Compiles PrivatePropertyTrading.sol
- Deploys to Sepolia testnet
- Saves deployment info to `deployment.json`
- Outputs contract address for verification

**Requirements**:
- `SEPOLIA_RPC_URL` in `.env`
- `PRIVATE_KEY` in `.env`
- Sepolia ETH for gas

---

### 2. Verify Script (`scripts/verify.cjs`)
```bash
npm run verify
```

**What it does**:
- Verifies contract source on Etherscan
- Makes contract publicly readable
- Enables interaction on Etherscan

**Requirements**:
- `ETHERSCAN_API_KEY` in `.env`
- Contract must be deployed first

---

### 3. Interact Script (`scripts/interact.cjs`)
```bash
npm run interact
```

**What it does**:
- Connects to deployed contract
- Reads total properties and transactions
- Lists all property details
- Shows transaction history
- Displays ownership information

**Output Example**:
```
📊 Total Properties: 3
💼 Total Transactions: 1
🏪 Listed Properties: 2
   IDs: [1, 2]
🏠 Your Properties: 2
   IDs: [1, 3]

Property #1:
  Owner: 0x123...
  Hash: QmLuxuryVilla123abc
  Price: 10.5 ETH
  Listed: ✅ Yes
```

---

### 4. Simulate Script (`scripts/simulate.cjs`)
```bash
npm run simulate
```

**What it does**:
- Full end-to-end simulation
- Registers 3 properties
- Lists properties for sale
- Updates prices
- Simulates purchase transaction
- Delists property
- Shows final state

**Great for testing** contract functionality!

---

### 5. Generate ABI (`scripts/generate-abi.cjs`)
```bash
npm run generate:abi
```

**What it does**:
- Compiles contract with Hardhat
- Extracts ABI from artifacts
- Updates `src/config/contracts.ts`
- Saves raw ABI to `src/config/abi.json`
- Lists all functions and events

---

## 🔧 Hardhat Configuration

**File**: `hardhat.config.js`

```javascript
{
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true"
  }
}
```

---

## 🚀 Quick Testing Guide

### Test with Existing Contract

Your contract is already deployed! Test it now:

1. **Check contract state**:
   ```bash
   npm run interact
   ```

2. **Start frontend**:
   ```bash
   npm run dev
   ```
   Opens at: http://localhost:1293/

3. **Connect MetaMask**:
   - Network: Sepolia Testnet
   - Chain ID: 11155111

4. **Test operations**:
   - Register a property
   - List it for sale
   - View in marketplace

---

## 📊 Contract Functions Reference

### Read Functions (Free - No Gas)
```solidity
getTotalProperties() → uint256
getProperty(uint256 propertyId) → Property
getListedProperties() → uint256[]
getPropertiesByOwner(address owner) → uint256[]
getTransactionsByUser(address user) → uint256[]
getTransaction(uint256 txId) → Transaction
getTotalTransactions() → uint256
```

### Write Functions (Requires Gas)
```solidity
registerProperty(string hash, uint256 price) → uint256
listProperty(uint256 propertyId)
delistProperty(uint256 propertyId)
purchaseProperty(uint256 propertyId) payable
updatePrice(uint256 propertyId, uint256 newPrice)
```

### Events
```solidity
PropertyRegistered(uint256 indexed propertyId, address indexed owner, uint256 price)
PropertyListed(uint256 indexed propertyId, uint256 price)
PropertyDelisted(uint256 indexed propertyId)
PropertyPurchased(uint256 indexed propertyId, address indexed buyer, address indexed seller, uint256 price)
PriceUpdated(uint256 indexed propertyId, uint256 oldPrice, uint256 newPrice)
```

---

## 💡 Usage Examples

### Example 1: Deploy New Contract
```bash
# 1. Set up environment
cp env.example .env
# Edit .env with your SEPOLIA_RPC_URL and PRIVATE_KEY

# 2. Deploy
npm run deploy

# 3. Copy contract address from output
# VITE_CONTRACT_ADDRESS=0x...

# 4. Verify on Etherscan
npm run verify
```

### Example 2: Test Existing Contract
```bash
# 1. Check current state
npm run interact

# 2. Run full simulation
npm run simulate

# 3. Start frontend
npm run dev
```

### Example 3: Update ABI After Changes
```bash
# 1. Make changes to contract
# Edit contracts/PrivatePropertyTrading.sol

# 2. Generate new ABI
npm run generate:abi

# 3. Deploy new version
npm run deploy

# 4. Update .env with new address
# VITE_CONTRACT_ADDRESS=0xNEW_ADDRESS
```

---

## ⚠️ Important Notes

### Node.js Version Compatibility
- **Hardhat 3.x**: Requires Node.js 22.10+
- **Current**: Node.js 20.12.1
- **Impact**: Compilation may have issues

**Workarounds**:
1. Use Remix IDE for deployment (see TROUBLESHOOTING.md)
2. Upgrade Node.js to 22.10+
3. Use pre-generated ABI (already done!)

### Gas Limits
Pre-configured for optimal performance:
- `registerProperty`: 500,000 gas
- `listProperty`: 300,000 gas
- `delistProperty`: 300,000 gas
- `updatePrice`: 300,000 gas
- `purchaseProperty`: 500,000 gas

---

## 📁 Project Structure

```
private-property-platform/
├── contracts/
│   └── PrivatePropertyTrading.sol        # Smart contract
├── scripts/
│   ├── deploy.cjs                        # ✅ Deployment
│   ├── verify.cjs                        # ✅ Verification
│   ├── interact.cjs                      # ✅ Interaction
│   ├── simulate.cjs                      # ✅ Simulation
│   └── generate-abi.cjs                  # ✅ ABI generation
├── src/
│   ├── config/
│   │   └── contracts.ts                  # ✅ Updated ABI
│   └── utils/
│       └── contract.ts                   # Contract functions
├── hardhat.config.js                     # ✅ Hardhat config
├── package.json                          # ✅ Updated scripts
└── .env                                  # Environment variables
```

---

## ✅ Deployment Status

- [x] Contract deployed: `0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24`
- [x] ABI generated and configured
- [x] Scripts created (deploy, verify, interact, simulate)
- [x] Hardhat configuration complete
- [x] Package.json updated
- [x] Development server running (port 1293)
- [ ] Contract verified on Etherscan (optional - needs API key)
- [ ] Frontend tested with MetaMask

---

## 🆘 Troubleshooting

### Problem: "Contract function reverted"
**Solution**: ABI has been updated! Refresh browser and try again.

### Problem: Scripts fail with Node.js error
**Solution**: Hardhat 3.x requires Node.js 22.10+. Use Remix IDE as alternative.

### Problem: "Insufficient funds"
**Solution**: Get Sepolia ETH from faucets:
- https://sepoliafaucet.com/
- https://www.infura.io/faucet/sepolia

### Problem: MetaMask not connecting
**Solution**: 
1. Check you're on Sepolia network
2. Clear browser cache
3. Reconnect wallet

---

**Status**: ✅ All scripts ready
**Contract**: `0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24`
**Network**: Sepolia Testnet
**Server**: http://localhost:1293/

**Updated**: 2025-10-20
