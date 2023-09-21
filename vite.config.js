import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    headers:{
      OutgoingHttpHeaders: {
        //"Cross-Origin-Opener-Policy": "same-origin",
        //"Cross-Origin-Embedder-Policy": "require-corp",
        //"Cross-Origin-Resource-Policy": "cross-origin"
      }
    },
    host: true,
    strictPort: true,
    port: 5173
  }
})
