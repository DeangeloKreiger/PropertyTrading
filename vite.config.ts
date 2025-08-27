import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Set base path for GitHub Pages deployment
  // Use '/PropertyTrading/' for GitHub Pages, './' for local development
  base: process.env.NODE_ENV === 'production' ? '/PropertyTrading/' : './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'wagmi': ['@wagmi/core', '@wagmi/connectors'],
          'viem': ['viem'],
        }
      }
    }
  },
  esbuild: {
    target: 'es2020'
  },
  server: {
    port: 1291,
    open: true,
    host: true  // Allow network access
  }
})
