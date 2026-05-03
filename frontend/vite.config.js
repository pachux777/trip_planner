import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow external connections
    port: 3000, // Different port
    strictPort: false, // Allow other ports if 3000 is busy
    open: true, // Auto-open browser
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
