import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1600, },
  server: {
    port: 3000, // Port where it will listen
    // TODO: Comment/Remove when Finished Testing.
    watch: { usePolling: true } // Usefull for Locally Testing: Auto-refresh the page when ever a change is made and save.
  }
})
