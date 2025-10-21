import './style.css'
import { getAccount, connect, disconnect, watchAccount } from '@wagmi/core'
import { config } from './config/wagmi'
import { injected } from '@wagmi/connectors'
import { getListedProperties, getProperty, registerProperty, listProperty, delistProperty, purchaseProperty, getPropertiesByOwner, getTransactionsByUser, getTransaction, formatPrice, type Property, type Transaction } from './utils/contract'
import { showError, showSuccess, showInfo } from './utils/notifications'
import { loadingState } from './utils/loading'

let currentAccount: string | undefined

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  initializeApp()
})

function initializeApp() {
  console.log('Private Property Trading Platform loaded')
  showInfo('Welcome to Private Property Trading Platform')
}
