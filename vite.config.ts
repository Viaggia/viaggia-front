import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: false, // Disable auto-browser opening to prevent Docker errors
  }
})
