# PrivatePropertyTrading v2.0 - Migration Guide

## Overview

This guide documents the migration to support the new fhEVM Gateway contract specifications. The contract functionality remains unchanged, but several important updates have been made to support the new architecture.

## What Changed

### 1. PauserSet - Immutable Contract

**OLD (Deprecated):**
- Single pauser address via `PAUSER_ADDRESS` environment variable

**NEW (v2.0):**
- Multiple pauser addresses via array
- Environment variables: `NUM_PAUSERS` and `PAUSER_ADDRESS_[0-N]`
- `NUM_PAUSERS` should be set to `n_kms + n_copro` where:
  - `n_kms` = number of registered KMS nodes
  - `n_copro` = number of registered coprocessors

**Configuration Example:**
```env
NUM_PAUSERS=3
PAUSER_ADDRESS_0=0x1234...
PAUSER_ADDRESS_1=0x5678...
PAUSER_ADDRESS_2=0x9abc...
```

### 2. KMS Address Renaming

**OLD (Deprecated):**
- `PAUSER_ADDRESS` (single)
- `KMS_MANAGEMENT_CONTRACT_ADDRESS`

**NEW (v2.0):**
- `PAUSER_ADDRESS_[0-N]` (multiple)
- `KMS_GENERATION_CONTRACT_ADDRESS`
- `kmsManagement` renamed to `kmsGeneration`

### 3. Gateway Functions Replaced

All `check...()` view functions have been replaced with `is...()` functions that return booleans instead of reverting.

**OLD (Deprecated):**
```solidity
function checkPublicDecryptAllowed() external view;
function checkPropertyValid(uint256 propertyId) external view;
```

**NEW (v2.0):**
```solidity
function isPublicDecryptAllowed() external view returns (bool);
function isPropertyValid(uint256 propertyId) external view returns (bool);
function isOfferValid(uint256 offerId) external view returns (bool);
function isPauser(address addr) external view returns (bool);
function isContractPaused() external view returns (bool);
```

### 4. Transaction Input Re-randomization

All transaction inputs (including state inputs) are now automatically re-randomized before FHE evaluation to provide **sIND-CPAD security**. This is transparent to users.

### 5. Decryption Response Changes

**OLD:** Aggregated encrypted shares and signatures on-chain
**NEW:** Individual KMS node responses via separate events

```solidity
event DecryptionRequested(
    uint256 indexed requestId,
    address indexed requester,
    uint256 kmsGeneration,
    bytes32 encryptedValue,
    uint256 timestamp
);

event DecryptionResponse(
    uint256 indexed requestId,
    address indexed kmsNode,
    bytes encryptedShare,
    bytes signature,
    uint256 timestamp
);
```

## New Features

### 1. Pauser Management

```solidity
// Add a new pauser (only owner)
function addPauser(address _pauser) external onlyOwner;

// Remove a pauser (only owner)
function removePauser(address _pauser) external onlyOwner;

// Get pauser information
function getPauserCount() external view returns (uint256);
function getPauserAtIndex(uint256 _index) external view returns (address);
function getAllPausers() external view returns (address[] memory);
```

### 2. Pause/Unpause Functionality

```solidity
// Pause contract (only pausers)
function pause() external onlyPauser;

// Unpause contract (only owner)
function unpause() external onlyOwner;

// Emergency pause - deactivates all properties and offers
function emergencyPause() external onlyPauser;
```

### 3. KMS Generation Management

```solidity
// Update KMS generation number
function updateKmsGeneration(uint256 _newGeneration) external onlyOwner;

// Get current KMS generation
function getKmsGeneration() external view returns (uint256);
```

### 4. Decryption Request System

```solidity
// Request decryption from KMS
function requestDecryption(bytes32 _encryptedValue) external returns (uint256);

// Submit decryption response (called by KMS nodes)
function submitDecryptionResponse(
    uint256 _requestId,
    bytes calldata _encryptedShare,
    bytes calldata _signature
) external;

// Get decryption request details
function getDecryptionRequest(uint256 _requestId) external view returns (...);
```

## Constructor Changes

**OLD:**
```solidity
constructor() {
    owner = msg.sender;
    propertyCounter = 0;
    offerCounter = 0;
}
```

**NEW:**
```solidity
constructor(address[] memory _pauserAddresses, uint256 _kmsGeneration) {
    owner = msg.sender;
    propertyCounter = 0;
    offerCounter = 0;
    kmsGeneration = _kmsGeneration;
    isPaused = false;
    decryptionRequestCounter = 0;

    // Initialize pauser addresses
    for (uint256 i = 0; i < _pauserAddresses.length; i++) {
        pauserAddresses.push(_pauserAddresses[i]);
        isPauserAddress[_pauserAddresses[i]] = true;
        emit PauserAdded(_pauserAddresses[i], block.timestamp);
    }
}
```

## Deployment Instructions

### 1. Configure Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Set number of pausers
NUM_PAUSERS=3

# Set each pauser address
PAUSER_ADDRESS_0=0x...
PAUSER_ADDRESS_1=0x...
PAUSER_ADDRESS_2=0x...

# Set KMS generation
KMS_GENERATION=1

# Other required variables
PRIVATE_KEY=...
SEPOLIA_RPC_URL=...
```

### 2. Deploy Contract

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 3. Verify Deployment

The deployment script will automatically:
- Validate all pauser addresses
- Verify KMS generation configuration
- Deploy the contract
- Verify on Etherscan (if configured)
- Print deployment summary

## Modified Functions

The following functions now have the `whenNotPaused` modifier:

- `listProperty()`
- `submitPrivateOffer()`
- `acceptOffer()`
- `rejectOffer()`

## Breaking Changes

⚠️ **IMPORTANT:** The following are breaking changes:

1. **Constructor signature changed** - requires pauser addresses array and KMS generation
2. **Deprecated environment variables** - `PAUSER_ADDRESS` and `KMS_MANAGEMENT_CONTRACT_ADDRESS` no longer used
3. **Function signatures changed** - all `check...()` functions removed, use `is...()` instead

## Backward Compatibility

This version is **NOT backward compatible** with v1.0 deployments. You must:

1. Deploy a new contract instance
2. Migrate any existing data manually
3. Update frontend/backend to use new constructor parameters
4. Update any code calling `check...()` functions to use `is...()` functions

## Testing

Test that all new features work correctly:

```javascript
// Test pauser functionality
await contract.addPauser(pauserAddress);
await contract.connect(pauser).pause();
await contract.unpause();

// Test KMS generation update
await contract.updateKmsGeneration(2);

// Test decryption requests
const requestId = await contract.requestDecryption(encryptedValue);

// Test is...() functions
const isAllowed = await contract.isPublicDecryptAllowed();
const isValid = await contract.isPropertyValid(propertyId);
```

## Security Considerations

1. **Pauser addresses** should be carefully managed - they can pause the entire contract
2. **KMS generation** changes should be coordinated with KMS node updates
3. **Emergency pause** will deactivate ALL properties and offers
4. **Transaction re-randomization** provides sIND-CPAD security automatically

## Support

For questions or issues related to this migration:

1. Check the fhEVM documentation at https://docs.fhevm.zama.ai
2. Review the reference implementation
3. Consult the Zama community forums

## Version History

- **v2.0** (2025) - Gateway contract specification compliance
  - Added PauserSet with multiple addresses
  - Renamed kmsManagement to kmsGeneration
  - Replaced check...() with is...() functions
  - Added decryption request system
  - Implemented transaction input re-randomization support

- **v1.0** - Initial release
  - Basic property trading functionality
  - Single pauser support
  - Original gateway integration
