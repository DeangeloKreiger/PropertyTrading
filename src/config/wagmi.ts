import { http, createConfig } from '@wagmi/core'
import { sepolia } from '@wagmi/core/chains'
import { injected, walletConnect } from '@wagmi/connectors'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

// Only add WalletConnect if a valid project ID is provided
const connectors = [injected()]

// Add WalletConnect only if projectId is configured properly
if (projectId && projectId !== 'YOUR_WALLETCONNECT_PROJECT_ID') {
  connectors.push(walletConnect({ projectId }))
}

export const config = createConfig({
  chains: [sepolia],
  connectors,
  transports: {
    [sepolia.id]: http(),
  },
})

export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x...'
