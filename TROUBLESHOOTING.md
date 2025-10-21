# Troubleshooting Guide - Contract Interaction Issues

## 🔴 Current Issues Identified

### Issue 1: Contract Function Reversion

**Error Message**:
```
ContractFunctionRevertedError: The contract function "getListedProperties" reverted
ContractFunctionRevertedError: The contract function "getPropertiesByOwner" reverted
```

**Cause**:
The contract at address `0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24` either:
1. Does not match our expected ABI
2. Has different function signatures
3. Is a different contract entirely

### Issue 2: Gas Limit Too High

**Error Message**:
```
transaction gas limit too high (cap: 16777216, tx: 21000000)
```

**Fix Applied**: ✅
Added explicit gas limits to all write functions:
- `registerProperty`: 500,000 gas
- `listProperty`: 300,000 gas
- `delistProperty`: 300,000 gas
- `updatePrice`: 300,000 gas
- `purchaseProperty`: 500,000 gas

### Issue 3: WalletConnect Project ID Missing

**Error Message**:
```
Failed to load resource: the server responded with a status of 400/403
```

**Cause**:
Using placeholder `YOUR_WALLETCONNECT_PROJECT_ID` in environment

---

## ✅ Applied Fixes

### 1. Added Gas Limits (COMPLETED)

Updated `src/utils/contract.ts` to include explicit gas limits for all transactions.

### 2. Improved Error Handling (COMPLETED)

Updated `src/main.ts` to show user-friendly error messages when contract calls fail.

### 3. Better Error Messages (COMPLETED)

Now displays helpful information about potential issues:
- ABI mismatch
- Wrong contract address
- Wrong network

---

## 🔍 Verification Needed

### Step 1: Verify Contract Address

The current contract address is: `0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24`

**To verify**:
1. Visit: https://sepolia.etherscan.io/address/0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24
2. Check if this is the correct PrivatePropertyTrading contract
3. Compare the contract ABI with our expected functions

### Step 2: Get Correct ABI

If this is the correct contract, we need to:

1. **Option A**: Get the actual ABI from Etherscan
   ```bash
   # Visit contract page on Etherscan
   # Go to "Contract" tab
   # Click "Code"
   # Copy the ABI
   ```

2. **Option B**: Deploy a new contract with our ABI
   - Use the contract code from `contracts/PrivatePropertyTrading.sol`
   - Deploy to Sepolia using Hardhat or Remix
   - Update `.env` with new address

---

## 🛠️ Solution Options

### Option 1: Use Correct ABI for Existing Contract (RECOMMENDED)

If `0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24` is your deployed contract:

1. Get the ABI from Etherscan
2. Update `src/config/contracts.ts` with the correct ABI
3. Restart dev server

### Option 2: Deploy Our Contract

If you need to deploy the contract from `contracts/PrivatePropertyTrading.sol`:

#### Using Remix IDE (Easiest):

1. Open https://remix.ethereum.org/
2. Create new file: `PrivatePropertyTrading.sol`
3. Copy contract code from `contracts/PrivatePropertyTrading.sol`
4. Compile with Solidity 0.8.24
5. Deploy to Sepolia:
   - Select "Injected Provider - MetaMask"
   - Connect to Sepolia
   - Deploy
6. Copy deployed contract address
7. Update `.env`:
   ```env
   VITE_CONTRACT_ADDRESS=0xYOUR_NEW_CONTRACT_ADDRESS
   ```

#### Using Hardhat (Requires Node 22.10+):

```bash
# Upgrade Node.js first
# Then:
npm run compile
npm run deploy
```

### Option 3: Test with Mock Data

For UI/UX testing without blockchain:

1. Comment out contract calls
2. Use mock data
3. Test interface functionality

---

## 📝 Current Contract ABI

Our application expects these functions:

```typescript
// Read Functions
getTotalProperties() returns (uint256)
getProperty(uint256 _propertyId) returns (Property)
getListedProperties() returns (uint256[])
getPropertiesByOwner(address _owner) returns (uint256[])
getTransactionsByUser(address _user) returns (uint256[])
getTransaction(uint256 _txId) returns (Transaction)

// Write Functions
registerProperty(string _propertyHash, uint256 _price) returns (uint256)
listProperty(uint256 _propertyId)
delistProperty(uint256 _propertyId)
purchaseProperty(uint256 _propertyId) payable
updatePrice(uint256 _propertyId, uint256 _newPrice)
```

**Struct Definitions**:
```solidity
struct Property {
    uint256 id;
    address owner;
    string propertyHash;
    uint256 price;
    bool isListed;
    uint256 listedAt;
}

struct Transaction {
    uint256 propertyId;
    address seller;
    address buyer;
    uint256 price;
    uint256 timestamp;
    bool completed;
}
```

---

## 🔧 Quick Fixes to Try

### Fix 1: Get WalletConnect Project ID

1. Visit: https://cloud.walletconnect.com/
2. Create free account
3. Create new project
4. Copy Project ID
5. Update `.env`:
   ```env
   VITE_WALLETCONNECT_PROJECT_ID=your_actual_project_id
   ```

### Fix 2: Verify Network

Make sure MetaMask is connected to:
- **Network**: Sepolia Test Network
- **Chain ID**: 11155111
- **RPC URL**: https://sepolia.infura.io/v3/...

### Fix 3: Check Balance

Ensure you have Sepolia ETH:
- Get from: https://sepoliafaucet.com/
- Minimum: ~0.1 ETH for testing

---

## 📊 Testing Checklist

Before contract interaction:

- [ ] MetaMask installed
- [ ] Connected to Sepolia network
- [ ] Have Sepolia ETH (>0.05 ETH)
- [ ] Contract address is correct
- [ ] Contract ABI matches deployed contract
- [ ] WalletConnect Project ID set (optional)

---

## 🆘 Emergency Solution

If nothing works, you can:

1. **Verify the contract address** is correct
2. **Get the actual ABI** from the contract owner or Etherscan
3. **Deploy a new contract** using Remix IDE
4. **Update configuration** with correct address and ABI

---

## 📞 Next Steps

**Immediate Actions**:
1. ✅ Gas limits fixed
2. ✅ Error handling improved
3. ⚠️ **NEED**: Verify contract address and ABI match
4. ⚠️ **NEED**: Get WalletConnect Project ID

**To Continue Testing**:
- Provide correct contract ABI, OR
- Deploy new contract and provide address, OR
- Confirm contract address `0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24` is correct

---

## 🔴 ROOT CAUSE IDENTIFIED

The contract at `0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24`:
- ✅ **EXISTS** on Sepolia (deployed 3 days ago)
- ❌ **NOT VERIFIED** on Etherscan
- ❌ **ABI MISMATCH** - We don't know if it matches our expected functions
- ❌ **2 FAILED TRANSACTIONS** showing "execution reverted"

**Conclusion**: The contract's ABI doesn't match our application's expected ABI. We need to deploy our own contract.

---

## ✅ RECOMMENDED SOLUTION: Deploy Using Remix IDE

### Step-by-Step Deployment Guide

#### 1. Open Remix IDE
Visit: https://remix.ethereum.org/

#### 2. Create New Contract File
1. Click "+" icon in File Explorer
2. Name it: `PrivatePropertyTrading.sol`
3. Copy the entire contract code from `D:\private-property-platform\contracts\PrivatePropertyTrading.sol`
4. Paste into Remix editor

#### 3. Compile Contract
1. Click "Solidity Compiler" tab (left sidebar)
2. Select compiler version: **0.8.24**
3. Click "Compile PrivatePropertyTrading.sol"
4. Wait for green checkmark ✓

#### 4. Deploy to Sepolia
1. Click "Deploy & Run Transactions" tab
2. **ENVIRONMENT**: Select "Injected Provider - MetaMask"
3. MetaMask will popup - **Connect to Sepolia network**
4. **CONTRACT**: Select "PrivatePropertyTrading"
5. Click **"Deploy"** button (orange)
6. Confirm transaction in MetaMask
7. Wait for confirmation (~12 seconds)

#### 5. Copy Contract Address
After deployment succeeds:
1. Look at "Deployed Contracts" section
2. You'll see: `PRIVATEPROPERTYTRADING AT 0x...`
3. **Copy this address** (e.g., `0xABCD1234...`)

#### 6. Update Your .env File
```env
VITE_CONTRACT_ADDRESS=0xYOUR_NEW_CONTRACT_ADDRESS_FROM_REMIX
VITE_CHAIN_ID=11155111
```

#### 7. Restart Dev Server
```bash
# Kill current server (Ctrl+C)
npm run dev
```

#### 8. Test Your Application
1. Open http://localhost:1293/
2. Connect MetaMask (Sepolia network)
3. Try registering a property
4. Should work now! ✅

---

## 🎯 Expected Result

After deploying your own contract:
- ✅ Contract address matches your deployment
- ✅ ABI perfectly matches your code
- ✅ All functions work (register, list, purchase, etc.)
- ✅ Transactions succeed
- ✅ Events emit correctly

---

**Status**: ⚠️ Need to deploy new contract using Remix IDE
**Updated**: 2025-10-20
**Server**: Running at http://localhost:1293/
