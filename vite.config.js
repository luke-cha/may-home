import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages hosts this repository below /may-home/. Keep local development at /.
  base: process.env.GITHUB_ACTIONS ? '/may-home/' : '/',
  // Serve the supplied content tree directly without duplicating 335 MB of originals.
  publicDir: 'contents',
  server: { host: '0.0.0.0', port: 5174, strictPort: true },
})
