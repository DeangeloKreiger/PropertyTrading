# Private Property Trading - API Documentation

## Contract Interface

### Core Functions

---

## Property Management

### registerProperty

Register a new property with encrypted price.

**Signature:**
```solidity
function registerProperty(
    string memory _propertyHash,
    externalEuint64 _encryptedPrice,
    bytes calldata inputProof
) external whenNotPaused returns (uint256)
```

**Parameters:**
- `_propertyHash`: IPFS hash or reference to property details
- `_encryptedPrice`: FHE-encrypted price value
- `inputProof`: Zero-knowledge proof for encrypted input validation

**Returns:**
- `uint256`: Property ID

**Requirements:**
- Caller must be a verified seller
- Property hash cannot be empty
- Contract must not be paused

**Events Emitted:**
- `PropertyRegistered(propertyId, owner)`

**Example:**
```javascript
const propertyHash = "QmX..."; // IPFS hash
const price = ethers.utils.parseEther("100");
const encryptedPrice = await fhevm.encrypt(price);
const proof = await fhevm.generateProof(encryptedPrice);

const tx = await contract.registerProperty(
    propertyHash,
    encryptedPrice,
    proof
);
const receipt = await tx.wait();
const propertyId = receipt.events[0].args.propertyId;
```

---

### listProperty

List a property for sale and request price decryption via Gateway.

**Signature:**
```solidity
function listProperty(uint256 _propertyId)
    external
    propertyExists(_propertyId)
    onlyPropertyOwner(_propertyId)
    whenNotPaused
```

**Parameters:**
- `_propertyId`: ID of the property to list

**Requirements:**
- Property must exist
- Caller must be property owner
- Property must not already be listed
- Contract must not be paused

**Events Emitted:**
- `PropertyListed(propertyId)`
- `PriceDecryptionRequested(propertyId, requestId)`

**Note:** This function triggers an asynchronous Gateway decryption. Listen for `PriceRevealed` event to know when the price is available.

**Example:**
```javascript
const tx = await contract.listProperty(propertyId);
await tx.wait();

// Listen for price revelation
contract.on("PriceRevealed", (propertyId, revealedPrice) => {
    console.log(`Property ${propertyId} price revealed: ${revealedPrice}`);
});
```

---

### delistProperty

Remove a property from sale listings.

**Signature:**
```solidity
function delistProperty(uint256 _propertyId)
    external
    propertyExists(_propertyId)
    onlyPropertyOwner(_propertyId)
```

**Parameters:**
- `_propertyId`: ID of the property to delist

**Requirements:**
- Property must exist
- Caller must be property owner
- Property must be currently listed

**Events Emitted:**
- `PropertyDelisted(propertyId)`

**Example:**
```javascript
await contract.delistProperty(propertyId);
```

---

## Purchase Flow

### createPurchaseRequest

Create a purchase request with encrypted offer.

**Signature:**
```solidity
function createPurchaseRequest(
    uint256 _propertyId,
    externalEuint64 _encryptedOffer,
    bytes calldata inputProof
) external payable propertyExists(_propertyId) whenNotPaused nonReentrant returns (uint256)
```

**Parameters:**
- `_propertyId`: ID of the property to purchase
- `_encryptedOffer`: FHE-encrypted offer amount
- `inputProof`: Zero-knowledge proof for encrypted input

**Payable:**
- Must send at least 10% of property's revealed price as deposit

**Returns:**
- `uint256`: Purchase request ID

**Requirements:**
- Property must be listed
- Price must be revealed
- Caller cannot be the property owner
- Minimum deposit (10% of price) required
- Contract must not be paused

**Events Emitted:**
- `PurchaseRequestCreated(requestId, propertyId, buyer)`
- `OfferDecryptionRequested(requestId, decryptionRequestId)`

**Note:** This triggers Gateway decryption. Monitor `PurchaseRequestProcessed` event for the result.

**Example:**
```javascript
const property = await contract.getProperty(propertyId);
const offer = ethers.utils.parseEther("100");
const encryptedOffer = await fhevm.encrypt(offer);
const proof = await fhevm.generateProof(encryptedOffer);
const deposit = property.revealedPrice.mul(10).div(100); // 10%

const tx = await contract.createPurchaseRequest(
    propertyId,
    encryptedOffer,
    proof,
    { value: deposit }
);
const receipt = await tx.wait();
const requestId = receipt.events[0].args.requestId;

// Listen for processing result
contract.on("PurchaseRequestProcessed", (reqId, approved) => {
    if (reqId.eq(requestId)) {
        console.log(`Request ${approved ? 'approved' : 'rejected'}`);
    }
});
```

---

### cancelPurchaseRequest

Cancel an expired purchase request and claim refund.

**Signature:**
```solidity
function cancelPurchaseRequest(uint256 _requestId) external nonReentrant
```

**Parameters:**
- `_requestId`: ID of the purchase request to cancel

**Requirements:**
- Caller must be the buyer
- Request must not be processed
- Request must be expired (past timeout period)

**Events Emitted:**
- `PurchaseRequestCancelled(requestId)`
- `RefundIssued(user, amount, reason)`

**Example:**
```javascript
// After 7 days timeout
await contract.cancelPurchaseRequest(requestId);
await contract.withdrawRefund(); // Claim the refund
```

---

### withdrawRefund

Withdraw accumulated refunds.

**Signature:**
```solidity
function withdrawRefund() external nonReentrant
```

**Requirements:**
- Must have pending refunds

**Events Emitted:**
- `RefundIssued(user, amount, "Refund withdrawn")`

**Example:**
```javascript
const pendingRefund = await contract.getPendingRefund(userAddress);
if (pendingRefund.gt(0)) {
    await contract.withdrawRefund();
}
```

---

## Admin Functions

### verifySeller

Verify a seller to allow property registration.

**Signature:**
```solidity
function verifySeller(address _seller) external onlyOwner validAddress(_seller)
```

**Parameters:**
- `_seller`: Address to verify

**Requirements:**
- Caller must be contract owner
- Address must not be zero address

**Events Emitted:**
- `SellerVerified(seller)`

**Example:**
```javascript
await contract.verifySeller(sellerAddress);
```

---

### revokeSeller

Revoke seller verification.

**Signature:**
```solidity
function revokeSeller(address _seller) external onlyOwner
```

**Parameters:**
- `_seller`: Address to revoke

**Requirements:**
- Caller must be contract owner

**Events Emitted:**
- `SellerRevoked(seller)`

---

### withdrawPlatformFees

Withdraw accumulated platform fees.

**Signature:**
```solidity
function withdrawPlatformFees(address _to) external onlyOwner validAddress(_to) nonReentrant
```

**Parameters:**
- `_to`: Recipient address

**Requirements:**
- Caller must be contract owner
- Must have accumulated fees
- Recipient cannot be zero address

**Events Emitted:**
- `PlatformFeesWithdrawn(to, amount)`

---

### updatePlatformFee

Update the platform fee percentage.

**Signature:**
```solidity
function updatePlatformFee(uint256 _newFeePercent) external onlyOwner
```

**Parameters:**
- `_newFeePercent`: New fee percentage (0-10)

**Requirements:**
- Caller must be contract owner
- Fee must be ≤ 10%

---

### setPaused

Emergency pause/unpause the contract.

**Signature:**
```solidity
function setPaused(bool _pause) external onlyOwner
```

**Parameters:**
- `_pause`: True to pause, false to unpause

**Requirements:**
- Caller must be contract owner

**Events Emitted:**
- `EmergencyPause(paused)`

---

## View Functions

### getProperty

Get property details.

**Signature:**
```solidity
function getProperty(uint256 _propertyId)
    external
    view
    propertyExists(_propertyId)
    returns (
        uint256 id,
        address propertyOwner,
        string memory propertyHash,
        uint64 revealedPrice,
        bool isListed,
        uint256 listedAt,
        bool isPriceRevealed
    )
```

**Parameters:**
- `_propertyId`: Property ID

**Returns:**
- `id`: Property ID
- `propertyOwner`: Current owner address
- `propertyHash`: IPFS hash of property details
- `revealedPrice`: Decrypted price (0 if not revealed)
- `isListed`: Listing status
- `listedAt`: Timestamp when listed
- `isPriceRevealed`: Whether price has been decrypted

**Example:**
```javascript
const property = await contract.getProperty(propertyId);
console.log(`Owner: ${property.propertyOwner}`);
console.log(`Price: ${ethers.utils.formatEther(property.revealedPrice)} ETH`);
console.log(`Listed: ${property.isListed}`);
```

---

### getListedProperties

Get all listed property IDs.

**Signature:**
```solidity
function getListedProperties() external view returns (uint256[] memory)
```

**Returns:**
- `uint256[]`: Array of listed property IDs

**Example:**
```javascript
const listedIds = await contract.getListedProperties();
for (const id of listedIds) {
    const property = await contract.getProperty(id);
    console.log(`Property ${id}: ${property.propertyHash}`);
}
```

---

### getPropertiesByOwner

Get all properties owned by an address.

**Signature:**
```solidity
function getPropertiesByOwner(address _owner) external view returns (uint256[] memory)
```

**Parameters:**
- `_owner`: Owner address

**Returns:**
- `uint256[]`: Array of property IDs

**Example:**
```javascript
const myProperties = await contract.getPropertiesByOwner(userAddress);
```

---

### getPurchaseRequest

Get purchase request details.

**Signature:**
```solidity
function getPurchaseRequest(uint256 _requestId)
    external
    view
    returns (
        uint256 propertyId,
        address buyer,
        uint64 revealedOffer,
        uint256 depositAmount,
        uint256 timestamp,
        bool isProcessed,
        bool isApproved,
        bool isCancelled,
        uint256 expiryTime
    )
```

**Parameters:**
- `_requestId`: Purchase request ID

**Returns:**
- `propertyId`: Target property ID
- `buyer`: Buyer address
- `revealedOffer`: Decrypted offer amount
- `depositAmount`: Deposit paid
- `timestamp`: Request creation time
- `isProcessed`: Processing status
- `isApproved`: Approval status
- `isCancelled`: Cancellation status
- `expiryTime`: Timeout deadline

---

### getPurchaseRequestsByBuyer

Get all purchase requests by a buyer.

**Signature:**
```solidity
function getPurchaseRequestsByBuyer(address _buyer) external view returns (uint256[] memory)
```

**Parameters:**
- `_buyer`: Buyer address

**Returns:**
- `uint256[]`: Array of purchase request IDs

---

### getTransactionsByUser

Get all transactions for a user.

**Signature:**
```solidity
function getTransactionsByUser(address _user) external view returns (uint256[] memory)
```

**Parameters:**
- `_user`: User address

**Returns:**
- `uint256[]`: Array of transaction IDs

---

### getPendingRefund

Get pending refund amount for a user.

**Signature:**
```solidity
function getPendingRefund(address _user) external view returns (uint256)
```

**Parameters:**
- `_user`: User address

**Returns:**
- `uint256`: Pending refund amount in wei

---

### getTotalProperties

Get total number of properties.

**Signature:**
```solidity
function getTotalProperties() external view returns (uint256)
```

**Returns:**
- `uint256`: Total property count

---

### getTotalPurchaseRequests

Get total number of purchase requests.

**Signature:**
```solidity
function getTotalPurchaseRequests() external view returns (uint256)
```

**Returns:**
- `uint256`: Total purchase request count

---

### getTotalTransactions

Get total number of completed transactions.

**Signature:**
```solidity
function getTotalTransactions() external view returns (uint256)
```

**Returns:**
- `uint256`: Total transaction count

---

## Gateway Callback Functions

These functions are called by the Zama Gateway and should NOT be called directly by users.

### revealPriceCallback

Gateway callback to reveal property price.

**Signature:**
```solidity
function revealPriceCallback(
    uint256 requestId,
    bytes memory cleartexts,
    bytes memory decryptionProof
) external
```

**Note:** This is automatically called by the Gateway after `listProperty()`.

---

### processOfferCallback

Gateway callback to process purchase offer.

**Signature:**
```solidity
function processOfferCallback(
    uint256 requestId,
    bytes memory cleartexts,
    bytes memory decryptionProof
) external nonReentrant
```

**Note:** This is automatically called by the Gateway after `createPurchaseRequest()`.

---

## Events Reference

### PropertyRegistered
```solidity
event PropertyRegistered(uint256 indexed propertyId, address indexed owner)
```

### PropertyListed
```solidity
event PropertyListed(uint256 indexed propertyId)
```

### PropertyDelisted
```solidity
event PropertyDelisted(uint256 indexed propertyId)
```

### PriceDecryptionRequested
```solidity
event PriceDecryptionRequested(uint256 indexed propertyId, uint256 requestId)
```

### PriceRevealed
```solidity
event PriceRevealed(uint256 indexed propertyId, uint64 revealedPrice)
```

### PurchaseRequestCreated
```solidity
event PurchaseRequestCreated(uint256 indexed requestId, uint256 indexed propertyId, address indexed buyer)
```

### OfferDecryptionRequested
```solidity
event OfferDecryptionRequested(uint256 indexed requestId, uint256 decryptionRequestId)
```

### PurchaseRequestProcessed
```solidity
event PurchaseRequestProcessed(uint256 indexed requestId, bool approved)
```

### PropertyPurchased
```solidity
event PropertyPurchased(uint256 indexed propertyId, address indexed buyer, address indexed seller, uint256 price)
```

### RefundIssued
```solidity
event RefundIssued(address indexed user, uint256 amount, string reason)
```

### PurchaseRequestCancelled
```solidity
event PurchaseRequestCancelled(uint256 indexed requestId)
```

### PlatformFeesWithdrawn
```solidity
event PlatformFeesWithdrawn(address indexed to, uint256 amount)
```

### SellerVerified
```solidity
event SellerVerified(address indexed seller)
```

### SellerRevoked
```solidity
event SellerRevoked(address indexed seller)
```

### EmergencyPause
```solidity
event EmergencyPause(bool paused)
```

---

## Error Messages

| Error | Meaning |
|-------|---------|
| `Not authorized: owner only` | Function requires contract owner |
| `Not authorized: property owner only` | Function requires property owner |
| `Not authorized: seller not verified` | Seller must be verified first |
| `Not authorized: not the buyer` | Function requires purchase request buyer |
| `Property does not exist` | Invalid property ID |
| `Property already listed` | Cannot list already listed property |
| `Property not listed` | Property must be listed first |
| `Property not listed for sale` | Cannot purchase unlisted property |
| `Invalid input: property hash cannot be empty` | Property hash required |
| `Invalid price: must be greater than zero` | Price must be positive |
| `Invalid address: zero address` | Address cannot be 0x0 |
| `Insufficient deposit` | Deposit below minimum requirement |
| `Cannot buy your own property` | Buyer cannot be property owner |
| `Price not yet revealed` | Wait for Gateway to reveal price |
| `Request already processed` | Purchase request already handled |
| `Request not expired yet` | Cannot cancel before timeout |
| `No pending refund` | No refunds available |
| `Contract is paused` | Contract in emergency pause |
| `Reentrant call` | Reentrancy attack detected |
| `Payment to seller failed` | ETH transfer failed |
| `Refund withdrawal failed` | ETH refund failed |
| `Fee too high: max 10%` | Platform fee exceeds limit |

---

## Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `TIMEOUT_DURATION` | 7 days | Expiry time for purchase requests |
| `MIN_DEPOSIT_PERCENT` | 10 | Minimum deposit percentage |
| `platformFeePercent` | 2 (default) | Platform fee percentage (adjustable 0-10) |

---

## Complete Usage Example

### Seller Workflow

```javascript
// 1. Get verified (admin action)
await contract.verifySeller(sellerAddress);

// 2. Register property
const propertyData = {
    address: "123 Main St",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000
};
const ipfsHash = await uploadToIPFS(propertyData);
const price = ethers.utils.parseEther("100");
const encryptedPrice = await fhevm.encrypt(price);
const proof = await fhevm.generateProof(encryptedPrice);

const registerTx = await contract.registerProperty(
    ipfsHash,
    encryptedPrice,
    proof
);
const registerReceipt = await registerTx.wait();
const propertyId = registerReceipt.events[0].args.propertyId;

// 3. List property
const listTx = await contract.listProperty(propertyId);
await listTx.wait();

// 4. Wait for price revelation
await new Promise((resolve) => {
    contract.once("PriceRevealed", (propId, price) => {
        if (propId.eq(propertyId)) {
            console.log(`Price revealed: ${ethers.utils.formatEther(price)} ETH`);
            resolve();
        }
    });
});
```

### Buyer Workflow

```javascript
// 1. Browse listings
const listedIds = await contract.getListedProperties();

// 2. View property details
const property = await contract.getProperty(listedIds[0]);
console.log(`Property: ${property.propertyHash}`);
console.log(`Price: ${ethers.utils.formatEther(property.revealedPrice)} ETH`);

// 3. Make an offer
const offer = ethers.utils.parseEther("100");
const encryptedOffer = await fhevm.encrypt(offer);
const proof = await fhevm.generateProof(encryptedOffer);
const deposit = property.revealedPrice.mul(10).div(100);

const requestTx = await contract.createPurchaseRequest(
    listedIds[0],
    encryptedOffer,
    proof,
    { value: deposit }
);
const requestReceipt = await requestTx.wait();
const requestId = requestReceipt.events[0].args.requestId;

// 4. Monitor processing
contract.once("PurchaseRequestProcessed", async (reqId, approved) => {
    if (reqId.eq(requestId)) {
        if (approved) {
            console.log("Purchase successful!");
            // Listen for PropertyPurchased event
        } else {
            console.log("Offer rejected, claiming refund...");
            await contract.withdrawRefund();
        }
    }
});
```

---

## Integration with Frontend

### React Example

```javascript
import { ethers } from 'ethers';
import { FhevmInstance } from 'fhevmjs';

// Initialize
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);
const fhevm = await FhevmInstance.create(fhevmConfig);

// Register property
async function registerProperty(propertyData, price) {
    const ipfsHash = await uploadToIPFS(propertyData);
    const encryptedPrice = await fhevm.encrypt64(price);
    const proof = await fhevm.generateProof(encryptedPrice);

    const tx = await contract.registerProperty(ipfsHash, encryptedPrice, proof);
    const receipt = await tx.wait();

    return receipt.events.find(e => e.event === 'PropertyRegistered').args.propertyId;
}

// Create purchase request
async function createPurchaseRequest(propertyId, offer) {
    const property = await contract.getProperty(propertyId);
    const deposit = property.revealedPrice.mul(10).div(100);

    const encryptedOffer = await fhevm.encrypt64(offer);
    const proof = await fhevm.generateProof(encryptedOffer);

    const tx = await contract.createPurchaseRequest(
        propertyId,
        encryptedOffer,
        proof,
        { value: deposit }
    );

    return await tx.wait();
}
```

---

## Testing Guide

### Unit Tests

```javascript
describe("PrivatePropertyTrading", function() {
    it("Should register a property", async function() {
        const tx = await contract.registerProperty(hash, encPrice, proof);
        const receipt = await tx.wait();
        expect(receipt.events[0].event).to.equal("PropertyRegistered");
    });

    it("Should complete a purchase", async function() {
        // Register and list property
        const propertyId = await registerAndList();

        // Create purchase request
        const requestId = await createPurchaseRequest(propertyId, offer);

        // Wait for Gateway callback
        await waitForCallback();

        // Verify ownership transfer
        const property = await contract.getProperty(propertyId);
        expect(property.propertyOwner).to.equal(buyerAddress);
    });

    it("Should refund on timeout", async function() {
        const requestId = await createPurchaseRequest(propertyId, offer);

        // Fast forward 7 days
        await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]);
        await ethers.provider.send("evm_mine");

        // Cancel and withdraw
        await contract.cancelPurchaseRequest(requestId);
        await contract.withdrawRefund();

        const balance = await contract.getPendingRefund(buyerAddress);
        expect(balance).to.equal(0);
    });
});
```

---

## Security Considerations

1. **Always validate encrypted inputs** with proper proofs
2. **Monitor Gateway callbacks** for completion
3. **Handle timeouts gracefully** in your UI
4. **Check pending refunds** regularly
5. **Verify seller status** before transacting
6. **Never call callback functions directly**
7. **Use event listeners** for async operations
8. **Implement proper error handling** for failed transactions

---

## Support

For issues or questions:
- Review the Architecture documentation
- Check event logs for transaction status
- Verify Gateway is operational
- Ensure sufficient gas for transactions
- Confirm proper FHE encryption setup
