# Deployment Guide - Private Property Trading Platform

## Prerequisites

1. **Node.js** (v20 or higher)
2. **MetaMask Wallet** with Sepolia ETH
3. **Alchemy/Infura Account** for RPC access
4. **WalletConnect Project ID** from https://cloud.walletconnect.com/
5. **GitHub Account** for hosting

## Step 1: Environment Setup

1. Copy environment template:
```bash
cp .env.example .env
```

2. Fill in `.env` with your credentials:
```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_wallet_private_key_without_0x
VITE_CONTRACT_ADDRESS=will_be_filled_after_deployment
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

### Getting Sepolia ETH
- Visit https://sepoliafaucet.com/
- Or https://www.alchemy.com/faucets/ethereum-sepolia
- Enter your wallet address and request test ETH

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Compile Smart Contract

```bash
npx hardhat compile
```

Expected output:
```
Compiled 1 Solidity file successfully
```

## Step 4: Deploy Smart Contract to Sepolia

1. Ensure you have Sepolia ETH in your wallet

2. Deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

3. Save the contract address from the output:
```
PrivatePropertyTrading deployed to: 0x...
```

4. Update `.env` file with the contract address:
```env
VITE_CONTRACT_ADDRESS=0xYourContractAddress
```

5. Verify the contract on Etherscan (optional but recommended):
```bash
npx hardhat verify --network sepolia 0xYourContractAddress
```

## Step 5: Test Locally

1. Start development server:
```bash
npm run dev
```

2. Open http://localhost:3000

3. Connect your MetaMask wallet (switch to Sepolia network)

4. Test the following:
   - Register a new property
   - List property for sale
   - Buy a property (use a different wallet)
   - View transaction history

## Step 6: Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

## Step 7: Deploy to GitHub Pages

### Option A: Automatic Deployment (Recommended)

1. Create a new GitHub repository

2. Initialize git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Private Property Trading Platform"
```

3. Add remote and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

4. Configure GitHub Secrets:
   - Go to repository Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `VITE_CONTRACT_ADDRESS`: Your deployed contract address
     - `VITE_WALLETCONNECT_PROJECT_ID`: Your WalletConnect project ID

5. Enable GitHub Pages:
   - Go to Settings → Pages
   - Source: GitHub Actions
   - Save

6. The site will automatically deploy on every push to `main`

7. Access your site at:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```

### Option B: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` folder to any static hosting:
   - **Vercel**: `vercel --prod`
   - **Netlify**: Drag and drop `dist/` folder
   - **GitHub Pages**: Push `dist/` to `gh-pages` branch

## Step 8: Verify Deployment

1. Visit your deployed URL

2. Test the following:
   - Wallet connection works
   - Can view marketplace
   - Can register properties
   - Can purchase properties
   - Transaction history loads

## Troubleshooting

### Contract Compilation Errors
- Ensure Hardhat is installed: `npm install --save-dev hardhat`
- Clear cache: `npx hardhat clean`
- Recompile: `npx hardhat compile`

### Deployment Fails
- Check you have enough Sepolia ETH
- Verify RPC URL is correct
- Ensure private key is valid (without 0x prefix)

### Frontend Issues
- Clear browser cache
- Check MetaMask is on Sepolia network
- Verify contract address in .env
- Check browser console for errors

### Transaction Failures
- Ensure wallet has enough Sepolia ETH
- Check contract is deployed and verified
- Verify you're on Sepolia network
- Check gas limits

## Security Notes

⚠️ **IMPORTANT SECURITY WARNINGS**

1. **Never commit `.env` file** - It contains sensitive keys
2. **Never share your private key** - Use different wallets for testing
3. **Use testnet only** - This is for Sepolia testnet, not mainnet
4. **Verify contracts** - Always verify on Etherscan before use
5. **Audit code** - Get professional audit before mainnet deployment

## Contract Addresses

After deployment, record your contract addresses:

- **Sepolia Contract**: `0x...`
- **Etherscan**: `https://sepolia.etherscan.io/address/0x...`
- **Live Site**: `https://...`

## Maintenance

### Updating the Contract

1. Make changes to `contracts/PrivatePropertyTrading.sol`
2. Recompile: `npx hardhat compile`
3. Deploy new version with different name or to new address
4. Update frontend with new contract address
5. Test thoroughly before announcing update

### Updating the Frontend

1. Make changes to frontend code
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Push to GitHub (auto-deploys) or deploy manually

## Support

For issues:
1. Check console logs
2. Verify environment variables
3. Check network connection
4. Review Hardhat/Vite documentation
5. Open GitHub issue

## Next Steps

After successful deployment:

1. ✅ Share your dApp URL
2. ✅ Write documentation for users
3. ✅ Test with multiple wallets
4. ✅ Monitor contract on Etherscan
5. ✅ Collect feedback
6. ✅ Plan v2 features

---

**Congratulations!** 🎉 Your Private Property Trading Platform is now live!
