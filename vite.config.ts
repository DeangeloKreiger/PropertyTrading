import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Set base path based on deployment platform
  // Vercel: use '/' (root path)
  // GitHub Pages: use '/PropertyTrading/'
  base: process.env.VERCEL ? '/' : (process.env.NODE_ENV === 'production' ? '/PropertyTrading/' : './'),
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
