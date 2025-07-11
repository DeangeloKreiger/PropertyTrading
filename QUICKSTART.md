# Quick Start Guide

Get your Private Property Trading Platform up and running in 5 minutes!

## 1. Prerequisites Check

Make sure you have:
- ✅ Node.js v20+ installed
- ✅ MetaMask browser extension
- ✅ Some Sepolia ETH (get from faucet)
- ✅ Text editor (VS Code recommended)

## 2. Installation (1 minute)

```bash
# Clone or download the project
cd private-property-platform

# Install dependencies
npm install
```

## 3. Environment Setup (2 minutes)

```bash
# Copy environment template
cp .env.example .env

# Edit .env file
# Add your RPC URL and private key
```

Get free RPC URL from:
- Alchemy: https://www.alchemy.com/ (recommended)
- Infura: https://www.infura.io/

Get WalletConnect ID from:
- https://cloud.walletconnect.com/ (free)

## 4. Deploy Contract (1 minute)

```bash
# Compile contract
npx hardhat compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia
```

Copy the contract address from output and add to `.env`:
```env
VITE_CONTRACT_ADDRESS=0xYourContractAddressHere
```

## 5. Run Locally (1 minute)

```bash
# Start development server
npm run dev
```

Visit http://localhost:3000 and connect your wallet!

## 6. Test the Platform

1. **Connect Wallet** - Click "Connect Wallet" button
2. **Register Property** - Add a test property
3. **List for Sale** - List your property
4. **Purchase** - Buy it with another wallet
5. **View History** - Check transaction history

## Need Help?

- 📖 Full guide: See `DEPLOYMENT_GUIDE.md`
- 🐛 Issues: Check browser console
- 💬 Support: Open GitHub issue

## What's Next?

- ✅ Deploy to GitHub Pages (see DEPLOYMENT_GUIDE.md)
- ✅ Verify contract on Etherscan
- ✅ Share with friends
- ✅ Add your own features

---

Happy trading! 🏠
