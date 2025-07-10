# Changelog

All notable changes to the PrivatePropertyTrading contract will be documented in this file.

## [2.0.0] - 2025-10-17

### Added - Gateway Contract Compliance

#### New Features
- **Multi-Pauser System**: Support for multiple pauser addresses via array
  - `addPauser(address)` - Add new pauser address
  - `removePauser(address)` - Remove existing pauser
  - `getPauserCount()` - Get total number of pausers
  - `getPauserAtIndex(uint256)` - Get pauser at specific index
  - `getAllPausers()` - Get all pauser addresses

- **Pause/Unpause Functionality**: Contract-wide pause mechanism
  - `pause()` - Pause contract (pausers only)
  - `unpause()` - Unpause contract (owner only)
  - `emergencyPause()` - Emergency pause with full deactivation
  - `isPaused` state variable
  - `whenNotPaused` modifier on critical functions

- **KMS Generation Management**: Track and update KMS generation
  - `kmsGeneration` state variable (renamed from kmsManagement)
  - `updateKmsGeneration(uint256)` - Update KMS generation number
  - `getKmsGeneration()` - View current KMS generation

- **Decryption Request System**: Individual KMS node responses
  - `requestDecryption(bytes32)` - Request decryption from KMS
  - `submitDecryptionResponse(uint256, bytes, bytes)` - Submit KMS response
  - `getDecryptionRequest(uint256)` - Get request details
  - `DecryptionRequest` struct for tracking requests
  - Individual KMS node events (not aggregated)

- **New View Functions**: Boolean-returning validation functions
  - `isPublicDecryptAllowed()` - Check if decryption is allowed
  - `isPauser(address)` - Check if address is pauser
  - `isContractPaused()` - Check if contract is paused
  - `isPropertyValid(uint256)` - Check if property is valid
  - `isOfferValid(uint256)` - Check if offer is valid

#### Events
- `PauserAdded(address indexed pauser, uint256 timestamp)`
- `PauserRemoved(address indexed pauser, uint256 timestamp)`
- `ContractPaused(address indexed by, uint256 timestamp)`
- `ContractUnpaused(address indexed by, uint256 timestamp)`
- `KmsGenerationUpdated(uint256 oldGeneration, uint256 newGeneration)`
- `DecryptionRequested(uint256 indexed requestId, address indexed requester, uint256 kmsGeneration, bytes32 encryptedValue, uint256 timestamp)`
- `DecryptionResponse(uint256 indexed requestId, address indexed kmsNode, bytes encryptedShare, bytes signature, uint256 timestamp)`

#### Environment Variables
- `NUM_PAUSERS` - Number of pauser addresses (n_kms + n_copro)
- `PAUSER_ADDRESS_0` to `PAUSER_ADDRESS_N` - Individual pauser addresses
- `KMS_GENERATION` - KMS generation number
- `KMS_GENERATION_CONTRACT_ADDRESS` - New naming for KMS contract

### Changed

#### Breaking Changes
- **Constructor Signature**: Now requires pauser addresses array and KMS generation
  ```solidity
  // OLD
  constructor()

  // NEW
  constructor(address[] memory _pauserAddresses, uint256 _kmsGeneration)
  ```

- **Function Replacements**: All `check...()` functions replaced with `is...()`
  - `checkPublicDecryptAllowed()` → `isPublicDecryptAllowed()`
  - Returns `bool` instead of reverting
  - No more `check...` view functions

- **Modified Functions**: Added `whenNotPaused` modifier to:
  - `listProperty()`
  - `submitPrivateOffer()`
  - `acceptOffer()`
  - `rejectOffer()`

#### Renamed
- `kmsManagement` → `kmsGeneration`
- `KMS_MANAGEMENT_CONTRACT_ADDRESS` → `KMS_GENERATION_CONTRACT_ADDRESS`

### Deprecated

#### Environment Variables
- `PAUSER_ADDRESS` - Single pauser (use `PAUSER_ADDRESS_[0-N]` instead)
- `KMS_MANAGEMENT_CONTRACT_ADDRESS` - Old naming (use `KMS_GENERATION_CONTRACT_ADDRESS`)

#### Functions
- All `check...()` view functions (use `is...()` equivalents)

### Security

#### Enhancements
- **Transaction Input Re-randomization**: All inputs automatically re-randomized before FHE evaluation
  - Provides sIND-CPAD security
  - Transparent to users
  - No code changes required

- **Improved Access Control**:
  - Multiple pausers for redundancy
  - Separate pause/unpause permissions
  - Emergency pause functionality

- **KMS Response Tracking**: Individual node responses for better auditability

### Documentation
- Added `MIGRATION_GUIDE.md` - Comprehensive migration documentation
- Added `CHANGELOG.md` - Version history and changes
- Updated contract documentation with NatSpec comments
- Created `.env.example` with new variable structure
- Added deployment script (`scripts/deploy.js`)
- Created comprehensive test suite (`test/PrivatePropertyTrading.test.js`)

### Deployment
- New deployment script validates pauser addresses
- Automatic Etherscan verification support
- Deployment summary output
- Environment variable validation

## [1.0.0] - Initial Release

### Features
- Property listing with encrypted asking price and square footage
- Private offer submission with encrypted amounts
- Offer acceptance/rejection by property owner
- Transaction completion and recording
- View access control for encrypted data
- Platform statistics tracking
- Property and offer management
- Owner-based access control

### Encryption
- FHE encryption for:
  - Property asking prices (euint64)
  - Property square footage (euint32)
  - Offer amounts (euint64)
  - Financing terms (euint32)

### Events
- PropertyListed
- OfferSubmitted
- OfferAccepted
- OfferRejected
- TransactionCompleted
- PropertyViewGranted
- OfferViewGranted

---

## Migration Path

### From v1.0 to v2.0

1. **Update Environment Configuration**:
   ```bash
   # Add to .env
   NUM_PAUSERS=3
   PAUSER_ADDRESS_0=0x...
   PAUSER_ADDRESS_1=0x...
   PAUSER_ADDRESS_2=0x...
   KMS_GENERATION=1
   ```

2. **Update Deployment Script**:
   - Use new `scripts/deploy.js`
   - Pass pauser addresses array and KMS generation

3. **Update Frontend/Backend**:
   - Replace `check...()` calls with `is...()`
   - Handle boolean returns instead of reverts
   - Add pause state checking

4. **Redeploy Contract**:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

5. **Verify Deployment**:
   - Check pauser configuration
   - Verify KMS generation
   - Test pause/unpause functionality

---

## Version Numbering

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for added functionality (backwards compatible)
- **PATCH** version for backwards compatible bug fixes

---

## Support

For questions about this version:
- Review `MIGRATION_GUIDE.md` for detailed migration instructions
- Check test suite for usage examples
- Consult fhEVM documentation at https://docs.fhevm.zama.ai
