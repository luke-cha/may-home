import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // The project remains on GitHub Pages and is served from the custom-domain root.
  base: '/',
  // Serve the supplied content tree directly without duplicating 335 MB of originals.
  publicDir: 'contents',
  server: { host: '0.0.0.0', port: 5174, strictPort: true },
})
