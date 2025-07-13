# 🚀 Contract Deployment Instructions

## ⚠️ Current Situation

**Issue**: Contract at `0x2f1Ec1ef0931C4208c60b5d7169CdEbAC3C9cE24` does NOT match `PrivatePropertyTrading.sol`

**Solution**: Deploy a new contract

---

## 🎯 Recommended: Deploy with Remix IDE

### Why Remix?
- ✅ No Node.js version issues
- ✅ Visual interface
- ✅ Immediate deployment
- ✅ Built-in verification
- ✅ Works in browser

### Step-by-Step Instructions

#### 1️⃣ Prepare the Contract

**Copy this entire contract code**:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title PrivatePropertyTrading
 * @dev Smart contract for private and secure property trading
 */
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
        uint256 propertyId;
        address seller;
        address buyer;
        uint256 price;
        uint256 timestamp;
        bool completed;
    }

    uint256 private propertyCounter;
    uint256 private transactionCounter;

    mapping(uint256 => Property) public properties;
    mapping(uint256 => Transaction) public transactions;
    mapping(address => uint256[]) public userProperties;
    mapping(address => uint256[]) public userTransactions;

    event PropertyRegistered(uint256 indexed propertyId, address indexed owner, uint256 price);
    event PropertyListed(uint256 indexed propertyId, uint256 price);
    event PropertyDelisted(uint256 indexed propertyId);
    event PropertyPurchased(uint256 indexed propertyId, address indexed buyer, address indexed seller, uint256 price);
    event PriceUpdated(uint256 indexed propertyId, uint256 oldPrice, uint256 newPrice);

    modifier onlyPropertyOwner(uint256 _propertyId) {
        require(properties[_propertyId].owner == msg.sender, "Not property owner");
        _;
    }

    modifier propertyExists(uint256 _propertyId) {
        require(_propertyId > 0 && _propertyId <= propertyCounter, "Property does not exist");
        _;
    }

    modifier propertyListed(uint256 _propertyId) {
        require(properties[_propertyId].isListed, "Property not listed");
        _;
    }

    function registerProperty(string memory _propertyHash, uint256 _price) external returns (uint256) {
        require(bytes(_propertyHash).length > 0, "Property hash cannot be empty");
        require(_price > 0, "Price must be greater than 0");

        propertyCounter++;

        properties[propertyCounter] = Property({
            id: propertyCounter,
            owner: msg.sender,
            propertyHash: _propertyHash,
            price: _price,
            isListed: false,
            listedAt: 0
        });

        userProperties[msg.sender].push(propertyCounter);

        emit PropertyRegistered(propertyCounter, msg.sender, _price);

        return propertyCounter;
    }

    function listProperty(uint256 _propertyId)
        external
        propertyExists(_propertyId)
        onlyPropertyOwner(_propertyId)
    {
        require(!properties[_propertyId].isListed, "Property already listed");

        properties[_propertyId].isListed = true;
        properties[_propertyId].listedAt = block.timestamp;

        emit PropertyListed(_propertyId, properties[_propertyId].price);
    }

    function delistProperty(uint256 _propertyId)
        external
        propertyExists(_propertyId)
        onlyPropertyOwner(_propertyId)
    {
        require(properties[_propertyId].isListed, "Property not listed");

        properties[_propertyId].isListed = false;
        properties[_propertyId].listedAt = 0;

        emit PropertyDelisted(_propertyId);
    }

    function updatePrice(uint256 _propertyId, uint256 _newPrice)
        external
        propertyExists(_propertyId)
        onlyPropertyOwner(_propertyId)
    {
        require(_newPrice > 0, "Price must be greater than 0");

        uint256 oldPrice = properties[_propertyId].price;
        properties[_propertyId].price = _newPrice;

        emit PriceUpdated(_propertyId, oldPrice, _newPrice);
    }

    function purchaseProperty(uint256 _propertyId)
        external
        payable
        propertyExists(_propertyId)
        propertyListed(_propertyId)
    {
        Property storage property = properties[_propertyId];

        require(msg.sender != property.owner, "Cannot buy your own property");
        require(msg.value >= property.price, "Insufficient payment");

        address previousOwner = property.owner;

        property.owner = msg.sender;
        property.isListed = false;
        property.listedAt = 0;

        userProperties[msg.sender].push(_propertyId);

        transactionCounter++;
        transactions[transactionCounter] = Transaction({
            propertyId: _propertyId,
            seller: previousOwner,
            buyer: msg.sender,
            price: property.price,
            timestamp: block.timestamp,
            completed: true
        });

        userTransactions[msg.sender].push(transactionCounter);
        userTransactions[previousOwner].push(transactionCounter);

        (bool success, ) = payable(previousOwner).call{value: property.price}("");
        require(success, "Payment transfer failed");

        if (msg.value > property.price) {
            (bool refundSuccess, ) = payable(msg.sender).call{value: msg.value - property.price}("");
            require(refundSuccess, "Refund failed");
        }

        emit PropertyPurchased(_propertyId, msg.sender, previousOwner, property.price);
    }

    function getPropertiesByOwner(address _owner) external view returns (uint256[] memory) {
        return userProperties[_owner];
    }

    function getTransactionsByUser(address _user) external view returns (uint256[] memory) {
        return userTransactions[_user];
    }

    function getListedProperties() external view returns (uint256[] memory) {
        uint256 listedCount = 0;

        for (uint256 i = 1; i <= propertyCounter; i++) {
            if (properties[i].isListed) {
                listedCount++;
            }
        }

        uint256[] memory listedProperties = new uint256[](listedCount);
        uint256 index = 0;

        for (uint256 i = 1; i <= propertyCounter; i++) {
            if (properties[i].isListed) {
                listedProperties[index] = i;
                index++;
            }
        }

        return listedProperties;
    }

    function getTotalProperties() external view returns (uint256) {
        return propertyCounter;
    }

    function getTotalTransactions() external view returns (uint256) {
        return transactionCounter;
    }

    function getProperty(uint256 _propertyId)
        external
        view
        propertyExists(_propertyId)
        returns (
            uint256 id,
            address owner,
            string memory propertyHash,
            uint256 price,
            bool isListed,
            uint256 listedAt
        )
    {
        Property memory property = properties[_propertyId];
        return (
            property.id,
            property.owner,
            property.propertyHash,
            property.price,
            property.isListed,
            property.listedAt
        );
    }

    function getTransaction(uint256 _transactionId)
        external
        view
        returns (
            uint256 propertyId,
            address seller,
            address buyer,
            uint256 price,
            uint256 timestamp,
            bool completed
        )
    {
        require(_transactionId > 0 && _transactionId <= transactionCounter, "Transaction does not exist");
        Transaction memory txn = transactions[_transactionId];
        return (
            txn.propertyId,
            txn.seller,
            txn.buyer,
            txn.price,
            txn.timestamp,
            txn.completed
        );
    }
}
```

#### 2️⃣ Open Remix IDE

1. Visit: **https://remix.ethereum.org/**
2. Wait for it to load

#### 3️⃣ Create Contract File

1. In the **File Explorer** (left sidebar)
2. Click the **"+"** icon (Create New File)
3. Name it: `PrivatePropertyTrading.sol`
4. **Paste the contract code** from above

#### 4️⃣ Compile Contract

1. Click **"Solidity Compiler"** icon (left sidebar, 3rd icon)
2. Select compiler version: **0.8.24**
3. Click **"Compile PrivatePropertyTrading.sol"**
4. Wait for green checkmark ✅

#### 5️⃣ Deploy to Sepolia

1. Click **"Deploy & Run Transactions"** icon (left sidebar, 4th icon)
2. **ENVIRONMENT**: Select **"Injected Provider - MetaMask"**
3. MetaMask popup appears → Click **"Next"** → **"Connect"**
4. **Check network**: Must be **Sepolia Testnet**
   - If not, switch in MetaMask to Sepolia
5. **CONTRACT**: Dropdown should show **"PrivatePropertyTrading"**
6. Click the **orange "Deploy"** button
7. MetaMask popup → **Confirm** transaction
8. Wait ~15 seconds for confirmation

#### 6️⃣ Copy Contract Address

1. Look at **"Deployed Contracts"** section (bottom)
2. You'll see: `PRIVATEPROPERTYTRADING AT 0x...`
3. Click the **copy icon** next to the address
4. **Save this address!** You'll need it

Example: `0xABCD1234567890abcdef1234567890ABCDEF1234`

#### 7️⃣ Update .env File

Open `D:\private-property-platform\.env` and update:

```env
VITE_CONTRACT_ADDRESS=0xYOUR_NEW_CONTRACT_ADDRESS_FROM_REMIX
```

Replace `0xYOUR_NEW_CONTRACT_ADDRESS_FROM_REMIX` with the address you copied.

#### 8️⃣ Restart Development Server

```bash
# Press Ctrl+C in the terminal running dev server
# Then restart:
npm run dev
```

#### 9️⃣ Test Your Application

1. Open: **http://localhost:1293/**
2. Connect MetaMask (Sepolia network)
3. Try registering a property
4. **Should work now!** ✅

---

## 📋 Deployment Checklist

Before deploying:
- [ ] Have MetaMask installed
- [ ] Connected to Sepolia testnet
- [ ] Have Sepolia ETH (get from faucet if needed)
- [ ] Contract code copied correctly
- [ ] Compiler version set to 0.8.24

During deployment:
- [ ] Compiled successfully (green checkmark)
- [ ] MetaMask connected to Remix
- [ ] Network is Sepolia (Chain ID: 11155111)
- [ ] Deployment transaction confirmed

After deployment:
- [ ] Contract address copied
- [ ] `.env` file updated
- [ ] Dev server restarted
- [ ] Application tested

---

## 🔧 Alternative: Hardhat Deployment (Requires Node.js 22.10+)

If you upgrade Node.js to 22.10 or higher, you can use:

### 1. Update .env with Real Values

```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_REAL_API_KEY
PRIVATE_KEY=0xYOUR_REAL_PRIVATE_KEY
```

**⚠️ Security Warning**: Never commit `.env` with real keys!

### 2. Get Sepolia ETH

From faucets:
- https://sepoliafaucet.com/
- https://www.infura.io/faucet/sepolia
- https://faucets.chain.link/sepolia

### 3. Deploy with Hardhat

```bash
npm run deploy
```

Output will show:
```
PrivatePropertyTrading deployed to: 0xABCD1234...
```

### 4. Update .env

```env
VITE_CONTRACT_ADDRESS=0xABCD1234...
```

### 5. Verify on Etherscan (Optional)

Get Etherscan API key from: https://etherscan.io/myapikey

```env
ETHERSCAN_API_KEY=your_api_key
```

```bash
npm run verify
```

---

## 📊 Expected Gas Costs (Sepolia)

| Operation | Estimated Gas | Cost (at 20 gwei) |
|-----------|---------------|-------------------|
| Deploy Contract | ~1,500,000 | ~0.03 ETH |
| Register Property | ~158,000 | ~0.00316 ETH |
| List Property | ~87,000 | ~0.00174 ETH |
| Purchase Property | ~245,000 | ~0.0049 ETH |

**Total for deployment + testing**: ~0.04-0.05 Sepolia ETH

---

## 🆘 Troubleshooting

### Problem: MetaMask not connecting to Remix

**Solution**:
1. Refresh Remix page
2. Clear browser cache
3. Try different browser (Chrome/Firefox)
4. Unlock MetaMask

### Problem: "Insufficient funds"

**Solution**:
Get Sepolia ETH from faucets (see above)

### Problem: "Wrong network"

**Solution**:
Switch MetaMask to Sepolia:
- Network name: Sepolia
- RPC URL: https://sepolia.infura.io/v3/...
- Chain ID: 11155111
- Currency: ETH

### Problem: Compilation failed

**Solution**:
- Check compiler version is **0.8.24**
- Check entire contract code was copied
- Look for syntax errors in red

---

## ✅ After Successful Deployment

1. **Save deployment info**:
   - Contract address
   - Transaction hash
   - Deployment date
   - Deployer address

2. **Update documentation**:
   ```
   Contract Address: 0xYOUR_ADDRESS
   Network: Sepolia
   Deployed: 2025-10-20
   ```

3. **Test all functions**:
   - Register property ✅
   - List property ✅
   - Update price ✅
   - Purchase property ✅
   - Delist property ✅

4. **Optional: Verify on Etherscan**
   Makes your contract publicly readable

---

## 📞 Need Help?

1. Check browser console (F12)
2. Check MetaMask for error messages
3. Verify network is Sepolia
4. Ensure you have Sepolia ETH
5. See TROUBLESHOOTING.md for more help

---

**Recommended Path**: Use Remix IDE (easiest, no Node.js issues)

**Status**: Ready to deploy
**Network**: Sepolia Testnet
**Estimated time**: 5-10 minutes
