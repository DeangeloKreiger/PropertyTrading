# Smart Contract Deployment Information

## 📍 Deployed Contract Address

**Network**: Ethereum Sepolia Testnet
**Contract Address**: `0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24`

**Etherscan Link**: https://sepolia.etherscan.io/address/0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24

---

## 🛠️ Hardhat Scripts

The project includes comprehensive Hardhat scripts for deployment, verification, and interaction:

### Available Scripts

```bash
# Compile contracts
npm run compile

# Deploy to Sepolia
npm run deploy

# Verify contract on Etherscan
npm run verify

# Interact with deployed contract
npm run interact

# Run simulation (register, list, purchase properties)
npm run simulate

# Generate ABI from contract source
npm run generate:abi
```

### Script Descriptions

#### `deploy.cjs` - Contract Deployment
- Deploys PrivatePropertyTrading contract to Sepolia
- Saves deployment info to `deployment.json`
- Outputs contract address for verification

```bash
npm run deploy
```

#### `verify.cjs` - Etherscan Verification
- Verifies contract source code on Etherscan
- Requires `ETHERSCAN_API_KEY` in `.env`
- Makes contract readable on block explorer

```bash
npm run verify
```

#### `interact.cjs` - Contract Interaction
- Reads current contract state
- Displays all properties and transactions
- Shows ownership information
- Example usage for testing

```bash
npm run interact
```

#### `simulate.cjs` - Full Simulation
- Registers multiple properties
- Lists properties for sale
- Simulates purchase transactions
- Updates prices and delists properties
- Comprehensive end-to-end test

```bash
npm run simulate
```

#### `generate-abi.cjs` - ABI Generation
- Compiles contract and extracts ABI
- Updates `src/config/contracts.ts`
- Generates TypeScript types
- Saves raw ABI to `src/config/abi.json`

```bash
npm run generate:abi
```

---

## ✅ Configuration Status

### Environment Variables (.env)

```env
VITE_CONTRACT_ADDRESS=0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24
VITE_CHAIN_ID=11155111
```

✅ **Status**: Configured and active

### Contract ABI

**Location**: `src/config/contracts.ts`

The contract ABI includes the following functions:

#### Read Functions
- `getTotalProperties()` - Get total number of registered properties
- `getProperty(uint256)` - Get property details by ID
- `getListedProperties()` - Get all listed property IDs
- `getPropertiesByOwner(address)` - Get properties owned by address
- `getTransactionsByUser(address)` - Get user's transaction history
- `getTransaction(uint256)` - Get transaction details

#### Write Functions
- `registerProperty(string, uint256)` - Register a new property
- `listProperty(uint256)` - List property for sale
- `delistProperty(uint256)` - Remove property from market
- `purchaseProperty(uint256)` - Purchase a listed property
- `updatePrice(uint256, uint256)` - Update property price

---

## 🔧 Development Server

**Current Status**: ✅ Running
**Access URL**: http://localhost:1293/
**Network Access**:
- http://26.26.26.1:1293/
- http://192.168.0.105:1293/

---

## 🌐 Network Information

| Property | Value |
|----------|-------|
| Network Name | Ethereum Sepolia |
| Chain ID | 11155111 |
| Currency | SepoliaETH |
| RPC URL | https://sepolia.infura.io/v3/YOUR-PROJECT-ID |
| Block Explorer | https://sepolia.etherscan.io/ |

---

## 🔍 Contract Verification

To verify the contract on Etherscan:

```bash
# Set your Etherscan API key in .env
ETHERSCAN_API_KEY=your_api_key_here

# Run verification
npx hardhat verify --network sepolia 0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24
```

---

## 📝 Testing the Contract

### Prerequisites

1. **MetaMask or Web3 Wallet** configured for Sepolia
2. **Test ETH** from Sepolia faucet:
   - https://sepoliafaucet.com/
   - https://www.infura.io/faucet/sepolia
   - https://faucets.chain.link/sepolia

### Testing Steps

#### 1. Connect Wallet

```
1. Open http://localhost:1293/
2. Click "Connect Wallet"
3. Select MetaMask
4. Approve connection
5. Switch to Sepolia network if needed
```

#### 2. Register a Property

```
1. Click "Register Property"
2. Enter property hash (e.g., "QmTest123456789")
3. Enter price in ETH (e.g., "0.1")
4. Click "Register Property"
5. Confirm transaction in MetaMask
6. Wait for confirmation
7. Property appears in "My Properties" tab ✅
```

#### 3. List Property for Sale

```
1. Go to "My Properties" tab
2. Find your property
3. Click "List for Sale"
4. Confirm transaction
5. Property appears in "Marketplace" tab ✅
```

#### 4. Purchase Property

```
1. Go to "Marketplace" tab
2. Find a listed property
3. Click "Purchase for X ETH"
4. Confirm transaction with exact value
5. Property transfers to you
6. Appears in your "My Properties" ✅
```

#### 5. Update Price

```
1. Go to "My Properties" tab
2. Find a listed property
3. Click "Update Price"
4. Enter new price
5. Confirm transaction
6. Price updates in marketplace ✅
```

---

## 🎯 Expected Behavior

### After Registration
- ✅ Property appears in "My Properties" immediately
- ✅ Transaction visible on Etherscan
- ✅ Property ID assigned automatically
- ✅ Property status: "Unlisted"

### After Listing
- ✅ Property appears in "Marketplace"
- ✅ Status changes to "Listed"
- ✅ "List for Sale" button changes to "Delist" and "Update Price"

### After Purchase
- ✅ Property ownership transfers
- ✅ Payment sent to seller
- ✅ Property appears in buyer's "My Properties"
- ✅ Removed from seller's properties
- ✅ Transaction recorded in history

### After Price Update
- ✅ New price displayed immediately
- ✅ Marketplace updates automatically
- ✅ Transaction fee paid by owner

---

## 🚨 Troubleshooting

### Problem: Transaction Fails

**Possible Causes**:
1. Insufficient gas
2. Insufficient balance
3. Wrong network (must be Sepolia)
4. Property doesn't exist
5. Not property owner

**Solutions**:
- Check MetaMask network (should be Sepolia)
- Ensure sufficient SepoliaETH balance
- Verify you own the property (for list/update/delist)
- Check property is listed (for purchase)

### Problem: "Connect Wallet" Not Working

**Solutions**:
1. Install MetaMask extension
2. Refresh page
3. Check browser console for errors
4. Ensure MetaMask is unlocked

### Problem: Property Not Appearing

**Solutions**:
1. Wait for transaction confirmation
2. Check transaction on Etherscan
3. Refresh page
4. Check correct wallet is connected

### Problem: Purchase Button Disabled

**Possible Causes**:
- Property not listed
- You are the owner
- Insufficient balance

**Solutions**:
- Verify property is listed (green "Listed" badge)
- Use different wallet to purchase own property
- Get more SepoliaETH from faucet

---

## 📊 Gas Estimates

| Operation | Estimated Gas | Approx Cost (20 gwei) |
|-----------|---------------|----------------------|
| Register Property | ~158,000 | ~0.00316 ETH |
| List Property | ~87,000 | ~0.00174 ETH |
| Delist Property | ~65,000 | ~0.0013 ETH |
| Purchase Property | ~245,000 | ~0.0049 ETH |
| Update Price | ~65,000 | ~0.0013 ETH |

*Note: Actual gas costs vary based on network congestion*

---

## 🔐 Security Notes

1. **Never share your private key**
2. **Always verify transaction details** before confirming
3. **Use test ETH only** on Sepolia
4. **Check contract address** matches the one above
5. **Verify recipient address** when purchasing

---

## 📞 Support

If you encounter issues:

1. Check browser console for errors (F12)
2. Verify transaction on Etherscan
3. Ensure correct network (Sepolia)
4. Check wallet has sufficient balance
5. Try refreshing the page

---

**Deployment Date**: 2025-10-20
**Network**: Sepolia Testnet
**Status**: ✅ Active
**Contract Address**: `0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24`
