# Private Property Trading - Architecture Documentation

## System Overview

Private Property Trading is an advanced smart contract platform for conducting confidential real estate transactions using Fully Homomorphic Encryption (FHE). The system ensures complete privacy while maintaining security and transparency.

## Core Architecture

### Gateway Callback Pattern

The system uses an innovative **Gateway Callback Architecture** for secure asynchronous processing:

```
User Request → Smart Contract → Gateway Decryption → Callback → Transaction Completion
```

#### Workflow:

1. **User Submission**: User submits encrypted data (prices, offers) to the smart contract
2. **Contract Recording**: Contract records the request and generates a decryption request ID
3. **Gateway Processing**: Zama Gateway decrypts the encrypted values off-chain
4. **Callback Execution**: Gateway calls the contract's callback function with decrypted values
5. **Transaction Finalization**: Contract completes the transaction based on decrypted data

### Key Components

#### 1. Property Management
- **Encrypted Registration**: Properties registered with FHE-encrypted prices
- **Privacy-Preserving Listings**: Prices remain encrypted until listing
- **Controlled Revelation**: Prices only revealed through Gateway callback

#### 2. Purchase Request System
- **Encrypted Offers**: Buyers submit encrypted offers
- **Deposit Mechanism**: Minimum 10% deposit required
- **Timeout Protection**: 7-day expiry for pending requests
- **Automatic Processing**: Gateway callback automatically processes offers

#### 3. Refund Mechanism
- **Decryption Failure Protection**: Automatic refunds if decryption fails
- **Timeout Refunds**: Refunds issued for expired requests
- **Rejected Offer Refunds**: Deposits returned for unsuccessful offers
- **Pending Refund Pool**: Centralized refund management

#### 4. Security Layer
- **Input Validation**: All user inputs validated
- **Access Control**: Role-based permissions for sellers
- **Reentrancy Protection**: Guards against reentrancy attacks
- **Overflow Protection**: SafeMath patterns throughout
- **Emergency Pause**: Admin can pause contract in emergencies

## Privacy Innovations

### 1. Division Privacy Protection

**Problem**: Direct division of encrypted values can leak information about the dividend and divisor.

**Solution**: Random multiplier technique
```solidity
// Instead of: encryptedA / encryptedB
// Use: (encryptedA * randomMultiplier) / (encryptedB * randomMultiplier)
```

This approach preserves privacy by adding randomness to both numerator and denominator.

### 2. Price Obfuscation

**Technique**: Prices stored encrypted and only revealed when necessary
- During registration: Fully encrypted
- During listing: Decrypted via secure Gateway
- During viewing: Only revealed if price revelation complete

### 3. Asymmetric Processing

**Gateway Callback Model Benefits**:
- Decryption happens off-chain (no gas cost for HCU)
- Callback only executes with verified proof
- Prevents on-chain price leakage
- Enables complex privacy-preserving calculations

## Gas Optimization

### HCU (Homomorphic Computation Unit) Efficiency

1. **Minimal On-Chain Operations**:
   - Encrypted values stored, not computed on-chain
   - Decryption delegated to Gateway

2. **Batch Processing**:
   - Single decryption request can handle multiple ciphertexts
   - Reduces overall HCU consumption

3. **Smart Storage**:
   - Encrypted values stored only when necessary
   - Revealed values cached after decryption

## Security Features

### Input Validation
```solidity
- Property hash must not be empty
- Prices must be greater than zero
- Deposits must meet minimum requirements
- Addresses validated against zero address
```

### Access Control
```solidity
- Owner-only functions for admin tasks
- Verified seller system
- Property owner restrictions
- Buyer authorization checks
```

### Overflow Protection
```solidity
- SafeMath patterns in fee calculations
- Validated arithmetic operations
- Range checks on all numeric inputs
```

### Timeout Protection
```solidity
- 7-day timeout on purchase requests
- Automatic refund on expiry
- User-initiated cancellation after timeout
```

## Transaction Flow Examples

### Scenario 1: Successful Property Sale

```
1. Seller registers property with encrypted price (100 ETH)
2. Seller lists property → Gateway decrypts price
3. Buyer creates purchase request with deposit (10 ETH) and encrypted offer (100 ETH)
4. Gateway decrypts offer
5. Callback verifies offer ≥ price
6. Purchase completed automatically
7. Seller receives 98 ETH (2% platform fee)
8. Buyer receives deposit refund (10 ETH)
9. Ownership transferred
```

### Scenario 2: Rejected Offer

```
1. Property listed with price 100 ETH
2. Buyer submits offer 80 ETH with 10 ETH deposit
3. Gateway decrypts offer
4. Callback determines offer < price
5. Request rejected
6. Deposit added to pending refunds
7. Buyer withdraws refund
```

### Scenario 3: Timeout Protection

```
1. Buyer creates purchase request
2. 7 days pass without Gateway response
3. Buyer calls cancelPurchaseRequest()
4. Request marked as cancelled
5. Deposit added to pending refunds
6. Buyer withdraws refund
```

## Data Structures

### Property
```solidity
struct Property {
    uint256 id;                          // Unique identifier
    address owner;                       // Current owner
    string propertyHash;                 // IPFS hash of property details
    euint64 encryptedPrice;             // FHE-encrypted price
    uint64 revealedPrice;               // Decrypted price (0 if not revealed)
    bool isListed;                      // Listing status
    uint256 listedAt;                   // Listing timestamp
    bool isPriceRevealed;               // Price revelation status
    uint256 priceDecryptionRequestId;   // Gateway request ID
}
```

### PurchaseRequest
```solidity
struct PurchaseRequest {
    uint256 propertyId;                 // Target property
    address buyer;                      // Buyer address
    euint64 encryptedOffer;            // FHE-encrypted offer
    uint64 revealedOffer;              // Decrypted offer
    uint256 depositAmount;             // Deposit paid
    uint256 timestamp;                 // Request creation time
    bool isProcessed;                  // Processing status
    bool isApproved;                   // Approval status
    bool isCancelled;                  // Cancellation status
    uint256 decryptionRequestId;       // Gateway request ID
    uint256 expiryTime;                // Timeout deadline
}
```

## Event System

### Critical Events
- `PropertyRegistered`: New property added
- `PriceRevealed`: Price successfully decrypted
- `PurchaseRequestCreated`: New purchase request
- `PurchaseRequestProcessed`: Request processed with result
- `RefundIssued`: Refund added to pending pool
- `PropertyPurchased`: Successful sale completed

## Admin Controls

### Owner Privileges
1. **Seller Verification**: Approve/revoke seller status
2. **Fee Management**: Adjust platform fees (max 10%)
3. **Emergency Pause**: Halt contract operations
4. **Fee Withdrawal**: Collect accumulated platform fees

### Governance Parameters
- `platformFeePercent`: 2% (adjustable 0-10%)
- `TIMEOUT_DURATION`: 7 days
- `MIN_DEPOSIT_PERCENT`: 10%

## Integration Guide

### For Sellers

```javascript
// 1. Get verified
await contract.verifySeller(sellerAddress);

// 2. Register property
const encryptedPrice = await fhevm.encrypt(priceInWei);
await contract.registerProperty(ipfsHash, encryptedPrice, proof);

// 3. List property
await contract.listProperty(propertyId);

// 4. Wait for Gateway to reveal price
// Listen for PriceRevealed event
```

### For Buyers

```javascript
// 1. View listed properties
const listed = await contract.getListedProperties();

// 2. Check property details
const property = await contract.getProperty(propertyId);

// 3. Create purchase request
const encryptedOffer = await fhevm.encrypt(offerInWei);
const deposit = property.revealedPrice * 0.1; // 10% deposit
await contract.createPurchaseRequest(
    propertyId,
    encryptedOffer,
    proof,
    { value: deposit }
);

// 4. Monitor processing
// Listen for PurchaseRequestProcessed event
```

## Security Audits Checklist

### Smart Contract Security
- ✅ Reentrancy protection on all payable functions
- ✅ Integer overflow/underflow protection
- ✅ Access control on sensitive functions
- ✅ Input validation on all external calls
- ✅ Emergency pause mechanism
- ✅ Proper event emission for all state changes

### FHE-Specific Security
- ✅ Proper encryption proof validation
- ✅ Gateway signature verification
- ✅ Encrypted value permission management
- ✅ Decryption request tracking
- ✅ Callback authentication

### Economic Security
- ✅ Platform fee limits (max 10%)
- ✅ Deposit requirements
- ✅ Refund mechanism for failures
- ✅ Timeout protection against locks
- ✅ Overflow protection in fee calculations

## Future Enhancements

### Planned Features
1. **Multi-Party Escrow**: Support for complex escrow scenarios
2. **Auction Mechanism**: Private bidding with FHE
3. **Fractional Ownership**: Split property ownership
4. **Reputation System**: Encrypted seller/buyer ratings
5. **Advanced Privacy**: Zero-knowledge proofs for identity verification

### Optimization Opportunities
1. **Batch Operations**: Multiple property operations in one transaction
2. **L2 Integration**: Deploy on Layer 2 for lower fees
3. **IPFS Optimization**: Enhanced property data storage
4. **Gas Token**: Custom gas optimization strategies

## Conclusion

This architecture provides a robust, privacy-preserving platform for real estate transactions. By leveraging FHE and the Gateway callback pattern, it achieves:

- **Complete Privacy**: Prices and offers remain encrypted
- **Security**: Multiple layers of protection
- **Reliability**: Timeout and refund mechanisms
- **Efficiency**: Optimized gas usage
- **Transparency**: Full audit trail via events

The system is production-ready and designed for scalability.
