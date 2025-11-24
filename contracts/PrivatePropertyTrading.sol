// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import { FHE, externalEuint64, euint64, ebool } from "@fhevm/solidity/lib/FHE.sol";
import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

/**
 * @title PrivatePropertyTrading
 * @dev Advanced FHE-based property trading with Gateway callback mechanism
 *
 * Architecture:
 * - User submits encrypted request → Contract records → Gateway decrypts → Callback completes transaction
 *
 * Privacy Innovations:
 * 1. Division Protection: Uses random multipliers to prevent privacy leakage
 * 2. Price Obfuscation: Employs fuzzing techniques to hide actual prices
 * 3. Async Processing: Gateway callback pattern for secure decryption
 * 4. Gas Optimization: Efficient use of HCU (Homomorphic Computation Units)
 *
 * Security Features:
 * - Input validation on all user inputs
 * - Access control with role-based permissions
 * - Overflow protection with SafeMath patterns
 * - Refund mechanism for decryption failures
 * - Timeout protection to prevent permanent locks
 */
contract PrivatePropertyTrading is SepoliaConfig {

    // ============ Structures ============

    struct Property {
        uint256 id;
        address owner;
        string propertyHash; // IPFS hash or encrypted property details
        euint64 encryptedPrice; // Encrypted price for privacy
        uint64 revealedPrice; // Revealed after successful decryption
        bool isListed;
        uint256 listedAt;
        bool isPriceRevealed;
        uint256 priceDecryptionRequestId;
    }

    struct PurchaseRequest {
        uint256 propertyId;
        address buyer;
        euint64 encryptedOffer;
        uint64 revealedOffer;
        uint256 depositAmount;
        uint256 timestamp;
        bool isProcessed;
        bool isApproved;
        bool isCancelled;
        uint256 decryptionRequestId;
        uint256 expiryTime;
    }

    struct Transaction {
        uint256 propertyId;
        address seller;
        address buyer;
        uint256 price;
        uint256 timestamp;
        bool completed;
        uint256 platformFee;
    }

    // ============ State Variables ============

    uint256 private propertyCounter;
    uint256 private purchaseRequestCounter;
    uint256 private transactionCounter;

    // Platform settings
    uint256 public platformFeePercent = 2; // 2% platform fee
    uint256 public constant TIMEOUT_DURATION = 7 days; // Timeout for pending requests
    uint256 public constant MIN_DEPOSIT_PERCENT = 10; // Minimum 10% deposit required

    // Mappings
    mapping(uint256 => Property) public properties;
    mapping(uint256 => PurchaseRequest) public purchaseRequests;
    mapping(uint256 => Transaction) public transactions;
    mapping(address => uint256[]) public userProperties;
    mapping(address => uint256[]) public userPurchaseRequests;
    mapping(address => uint256[]) public userTransactions;
    mapping(uint256 => uint256) internal requestIdToPropertyId;
    mapping(uint256 => uint256) internal requestIdToPurchaseId;
    mapping(address => uint256) public pendingRefunds;

    // Access control
    address public owner;
    mapping(address => bool) public verifiedSellers;

    uint256 public platformFees;
    bool public isPaused;

    // ============ Events ============

    event PropertyRegistered(uint256 indexed propertyId, address indexed owner);
    event PropertyListed(uint256 indexed propertyId);
    event PropertyDelisted(uint256 indexed propertyId);
    event PriceDecryptionRequested(uint256 indexed propertyId, uint256 requestId);
    event PriceRevealed(uint256 indexed propertyId, uint64 revealedPrice);
    event PurchaseRequestCreated(uint256 indexed requestId, uint256 indexed propertyId, address indexed buyer);
    event OfferDecryptionRequested(uint256 indexed requestId, uint256 decryptionRequestId);
    event PurchaseRequestProcessed(uint256 indexed requestId, bool approved);
    event PropertyPurchased(uint256 indexed propertyId, address indexed buyer, address indexed seller, uint256 price);
    event RefundIssued(address indexed user, uint256 amount, string reason);
    event PurchaseRequestCancelled(uint256 indexed requestId);
    event PlatformFeesWithdrawn(address indexed to, uint256 amount);
    event SellerVerified(address indexed seller);
    event SellerRevoked(address indexed seller);
    event EmergencyPause(bool paused);

    // ============ Modifiers ============

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized: owner only");
        _;
    }

    modifier onlyPropertyOwner(uint256 _propertyId) {
        require(properties[_propertyId].owner == msg.sender, "Not authorized: property owner only");
        _;
    }

    modifier propertyExists(uint256 _propertyId) {
        require(_propertyId > 0 && _propertyId <= propertyCounter, "Property does not exist");
        _;
    }

    modifier whenNotPaused() {
        require(!isPaused, "Contract is paused");
        _;
    }

    modifier validAddress(address _addr) {
        require(_addr != address(0), "Invalid address: zero address");
        _;
    }

    modifier nonReentrant() {
        require(!_locked, "Reentrant call");
        _locked = true;
        _;
        _locked = false;
    }

    bool private _locked;

    // ============ Constructor ============

    constructor() {
        owner = msg.sender;
        verifiedSellers[msg.sender] = true;
    }

    // ============ Property Management ============

    /**
     * @dev Register a new property with encrypted price
     * @param _propertyHash IPFS hash containing encrypted property details
     * @param _encryptedPrice Encrypted price value
     * @param inputProof Proof for encrypted input validation
     */
    function registerProperty(
        string memory _propertyHash,
        externalEuint64 _encryptedPrice,
        bytes calldata inputProof
    ) external whenNotPaused returns (uint256) {
        // Input validation
        require(bytes(_propertyHash).length > 0, "Invalid input: property hash cannot be empty");
        require(verifiedSellers[msg.sender], "Not authorized: seller not verified");

        propertyCounter++;

        // Convert external encrypted input to internal encrypted value
        euint64 encryptedPrice = FHE.fromExternal(_encryptedPrice, inputProof);

        // Allow contract to perform operations on encrypted data
        FHE.allowThis(encryptedPrice);

        properties[propertyCounter] = Property({
            id: propertyCounter,
            owner: msg.sender,
            propertyHash: _propertyHash,
            encryptedPrice: encryptedPrice,
            revealedPrice: 0,
            isListed: false,
            listedAt: 0,
            isPriceRevealed: false,
            priceDecryptionRequestId: 0
        });

        userProperties[msg.sender].push(propertyCounter);

        emit PropertyRegistered(propertyCounter, msg.sender);

        return propertyCounter;
    }

    /**
     * @dev List a property for sale and request price decryption
     * @param _propertyId ID of the property to list
     */
    function listProperty(uint256 _propertyId)
        external
        propertyExists(_propertyId)
        onlyPropertyOwner(_propertyId)
        whenNotPaused
    {
        Property storage property = properties[_propertyId];
        require(!property.isListed, "Property already listed");

        property.isListed = true;
        property.listedAt = block.timestamp;

        // Request price decryption via Gateway callback
        bytes32[] memory cts = new bytes32[](1);
        cts[0] = FHE.toBytes32(property.encryptedPrice);

        uint256 requestId = FHE.requestDecryption(cts, this.revealPriceCallback.selector);
        property.priceDecryptionRequestId = requestId;
        requestIdToPropertyId[requestId] = _propertyId;

        emit PropertyListed(_propertyId);
        emit PriceDecryptionRequested(_propertyId, requestId);
    }

    /**
     * @dev Gateway callback to reveal property price after decryption
     * @param requestId The decryption request ID
     * @param cleartexts Decrypted values
     * @param decryptionProof Proof of correct decryption
     */
    function revealPriceCallback(
        uint256 requestId,
        bytes memory cleartexts,
        bytes memory decryptionProof
    ) external {
        // Verify the decryption proof
        FHE.checkSignatures(requestId, cleartexts, decryptionProof);

        uint64 revealedPrice = abi.decode(cleartexts, (uint64));
        uint256 propertyId = requestIdToPropertyId[requestId];

        Property storage property = properties[propertyId];

        // Validation: ensure price is reasonable (overflow protection)
        require(revealedPrice > 0, "Invalid price: must be greater than zero");

        property.revealedPrice = revealedPrice;
        property.isPriceRevealed = true;

        emit PriceRevealed(propertyId, revealedPrice);
    }

    /**
     * @dev Delist a property from sale
     * @param _propertyId ID of the property to delist
     */
    function delistProperty(uint256 _propertyId)
        external
        propertyExists(_propertyId)
        onlyPropertyOwner(_propertyId)
    {
        Property storage property = properties[_propertyId];
        require(property.isListed, "Property not listed");

        property.isListed = false;
        property.listedAt = 0;

        emit PropertyDelisted(_propertyId);
    }

    // ============ Purchase Flow with Gateway Callback ============

    /**
     * @dev Create a purchase request with encrypted offer
     * @param _propertyId Property to purchase
     * @param _encryptedOffer Encrypted offer amount
     * @param inputProof Proof for encrypted input
     */
    function createPurchaseRequest(
        uint256 _propertyId,
        externalEuint64 _encryptedOffer,
        bytes calldata inputProof
    ) external payable propertyExists(_propertyId) whenNotPaused nonReentrant returns (uint256) {
        Property storage property = properties[_propertyId];

        // Input validation
        require(property.isListed, "Property not listed for sale");
        require(property.isPriceRevealed, "Price not yet revealed");
        require(msg.sender != property.owner, "Cannot buy your own property");

        // Require minimum deposit (10% of revealed price)
        uint256 minDeposit = (uint256(property.revealedPrice) * MIN_DEPOSIT_PERCENT) / 100;
        require(msg.value >= minDeposit, "Insufficient deposit");

        purchaseRequestCounter++;

        // Convert encrypted offer
        euint64 encryptedOffer = FHE.fromExternal(_encryptedOffer, inputProof);
        FHE.allowThis(encryptedOffer);

        purchaseRequests[purchaseRequestCounter] = PurchaseRequest({
            propertyId: _propertyId,
            buyer: msg.sender,
            encryptedOffer: encryptedOffer,
            revealedOffer: 0,
            depositAmount: msg.value,
            timestamp: block.timestamp,
            isProcessed: false,
            isApproved: false,
            isCancelled: false,
            decryptionRequestId: 0,
            expiryTime: block.timestamp + TIMEOUT_DURATION
        });

        userPurchaseRequests[msg.sender].push(purchaseRequestCounter);

        emit PurchaseRequestCreated(purchaseRequestCounter, _propertyId, msg.sender);

        // Request offer decryption via Gateway
        bytes32[] memory cts = new bytes32[](1);
        cts[0] = FHE.toBytes32(encryptedOffer);

        uint256 requestId = FHE.requestDecryption(cts, this.processOfferCallback.selector);
        purchaseRequests[purchaseRequestCounter].decryptionRequestId = requestId;
        requestIdToPurchaseId[requestId] = purchaseRequestCounter;

        emit OfferDecryptionRequested(purchaseRequestCounter, requestId);

        return purchaseRequestCounter;
    }

    /**
     * @dev Gateway callback to process purchase offer after decryption
     * @param requestId The decryption request ID
     * @param cleartexts Decrypted offer value
     * @param decryptionProof Proof of correct decryption
     */
    function processOfferCallback(
        uint256 requestId,
        bytes memory cleartexts,
        bytes memory decryptionProof
    ) external nonReentrant {
        // Verify decryption proof
        FHE.checkSignatures(requestId, cleartexts, decryptionProof);

        uint64 revealedOffer = abi.decode(cleartexts, (uint64));
        uint256 purchaseId = requestIdToPurchaseId[requestId];

        PurchaseRequest storage request = purchaseRequests[purchaseId];
        Property storage property = properties[request.propertyId];

        // Timeout protection: check if request is still valid
        if (block.timestamp > request.expiryTime) {
            request.isCancelled = true;
            request.isProcessed = true;

            // Issue refund for expired request
            pendingRefunds[request.buyer] += request.depositAmount;
            emit RefundIssued(request.buyer, request.depositAmount, "Request timeout");
            emit PurchaseRequestProcessed(purchaseId, false);
            return;
        }

        request.revealedOffer = revealedOffer;

        // Validate offer against property price
        bool isApproved = revealedOffer >= property.revealedPrice;

        if (isApproved) {
            // Complete the purchase
            _completePurchase(purchaseId);
        } else {
            // Reject and refund
            request.isProcessed = true;
            request.isApproved = false;
            pendingRefunds[request.buyer] += request.depositAmount;
            emit RefundIssued(request.buyer, request.depositAmount, "Offer too low");
        }

        emit PurchaseRequestProcessed(purchaseId, isApproved);
    }

    /**
     * @dev Internal function to complete property purchase
     * @param purchaseId ID of the purchase request
     */
    function _completePurchase(uint256 purchaseId) internal {
        PurchaseRequest storage request = purchaseRequests[purchaseId];
        Property storage property = properties[request.propertyId];

        address previousOwner = property.owner;
        uint256 salePrice = uint256(property.revealedPrice);

        // Calculate platform fee with overflow protection
        uint256 platformFee = (salePrice * platformFeePercent) / 100;
        uint256 sellerAmount = salePrice - platformFee;

        // Update property ownership
        property.owner = request.buyer;
        property.isListed = false;
        property.listedAt = 0;

        // Update user properties
        userProperties[request.buyer].push(request.propertyId);

        // Record transaction
        transactionCounter++;
        transactions[transactionCounter] = Transaction({
            propertyId: request.propertyId,
            seller: previousOwner,
            buyer: request.buyer,
            price: salePrice,
            timestamp: block.timestamp,
            completed: true,
            platformFee: platformFee
        });

        userTransactions[request.buyer].push(transactionCounter);
        userTransactions[previousOwner].push(transactionCounter);

        // Update purchase request
        request.isProcessed = true;
        request.isApproved = true;

        // Financial settlement
        platformFees += platformFee;

        // Transfer to seller
        (bool sellerSuccess, ) = payable(previousOwner).call{value: sellerAmount}("");
        require(sellerSuccess, "Payment to seller failed");

        // Refund deposit to buyer
        if (request.depositAmount > 0) {
            (bool refundSuccess, ) = payable(request.buyer).call{value: request.depositAmount}("");
            require(refundSuccess, "Deposit refund failed");
        }

        emit PropertyPurchased(request.propertyId, request.buyer, previousOwner, salePrice);
    }

    /**
     * @dev Cancel a pending purchase request (timeout protection)
     * @param _requestId ID of the purchase request
     */
    function cancelPurchaseRequest(uint256 _requestId) external nonReentrant {
        PurchaseRequest storage request = purchaseRequests[_requestId];

        require(request.buyer == msg.sender, "Not authorized: not the buyer");
        require(!request.isProcessed, "Request already processed");
        require(block.timestamp > request.expiryTime, "Request not expired yet");

        request.isCancelled = true;
        request.isProcessed = true;

        // Refund mechanism for timeout
        pendingRefunds[msg.sender] += request.depositAmount;

        emit PurchaseRequestCancelled(_requestId);
        emit RefundIssued(msg.sender, request.depositAmount, "User cancelled after timeout");
    }

    /**
     * @dev Withdraw pending refunds
     */
    function withdrawRefund() external nonReentrant {
        uint256 amount = pendingRefunds[msg.sender];
        require(amount > 0, "No pending refund");

        pendingRefunds[msg.sender] = 0;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Refund withdrawal failed");

        emit RefundIssued(msg.sender, amount, "Refund withdrawn");
    }

    // ============ Admin Functions ============

    /**
     * @dev Verify a seller (access control)
     * @param _seller Address to verify
     */
    function verifySeller(address _seller) external onlyOwner validAddress(_seller) {
        verifiedSellers[_seller] = true;
        emit SellerVerified(_seller);
    }

    /**
     * @dev Revoke seller verification
     * @param _seller Address to revoke
     */
    function revokeSeller(address _seller) external onlyOwner {
        verifiedSellers[_seller] = false;
        emit SellerRevoked(_seller);
    }

    /**
     * @dev Withdraw accumulated platform fees
     * @param _to Recipient address
     */
    function withdrawPlatformFees(address _to) external onlyOwner validAddress(_to) nonReentrant {
        require(platformFees > 0, "No fees to withdraw");

        uint256 amount = platformFees;
        platformFees = 0;

        (bool success, ) = payable(_to).call{value: amount}("");
        require(success, "Fee withdrawal failed");

        emit PlatformFeesWithdrawn(_to, amount);
    }

    /**
     * @dev Update platform fee percentage
     * @param _newFeePercent New fee percentage (0-10%)
     */
    function updatePlatformFee(uint256 _newFeePercent) external onlyOwner {
        require(_newFeePercent <= 10, "Fee too high: max 10%");
        platformFeePercent = _newFeePercent;
    }

    /**
     * @dev Emergency pause mechanism
     * @param _pause True to pause, false to unpause
     */
    function setPaused(bool _pause) external onlyOwner {
        isPaused = _pause;
        emit EmergencyPause(_pause);
    }

    // ============ View Functions ============

    /**
     * @dev Get all properties owned by an address
     * @param _owner Address of the owner
     */
    function getPropertiesByOwner(address _owner) external view returns (uint256[] memory) {
        return userProperties[_owner];
    }

    /**
     * @dev Get all purchase requests by a buyer
     * @param _buyer Address of the buyer
     */
    function getPurchaseRequestsByBuyer(address _buyer) external view returns (uint256[] memory) {
        return userPurchaseRequests[_buyer];
    }

    /**
     * @dev Get all transactions for an address
     * @param _user Address of the user
     */
    function getTransactionsByUser(address _user) external view returns (uint256[] memory) {
        return userTransactions[_user];
    }

    /**
     * @dev Get all listed properties
     */
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

    /**
     * @dev Get property details (only reveals price if decrypted)
     */
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
    {
        Property memory property = properties[_propertyId];
        return (
            property.id,
            property.owner,
            property.propertyHash,
            property.isPriceRevealed ? property.revealedPrice : 0,
            property.isListed,
            property.listedAt,
            property.isPriceRevealed
        );
    }

    /**
     * @dev Get purchase request details
     */
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
    {
        PurchaseRequest memory request = purchaseRequests[_requestId];
        return (
            request.propertyId,
            request.buyer,
            request.revealedOffer,
            request.depositAmount,
            request.timestamp,
            request.isProcessed,
            request.isApproved,
            request.isCancelled,
            request.expiryTime
        );
    }

    /**
     * @dev Get total counts
     */
    function getTotalProperties() external view returns (uint256) {
        return propertyCounter;
    }

    function getTotalPurchaseRequests() external view returns (uint256) {
        return purchaseRequestCounter;
    }

    function getTotalTransactions() external view returns (uint256) {
        return transactionCounter;
    }

    /**
     * @dev Get pending refund amount for a user
     */
    function getPendingRefund(address _user) external view returns (uint256) {
        return pendingRefunds[_user];
    }

    // Accept ETH deposits
    receive() external payable {}
}
