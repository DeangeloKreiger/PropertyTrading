import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Use environment variable for base path
  // Default to '/' for Vercel and local dev
  // GitHub Pages CI sets VITE_BASE_PATH to '/PropertyTrading/'
  base: process.env.VITE_BASE_PATH || '/',
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
