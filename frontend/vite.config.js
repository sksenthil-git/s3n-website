import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-deployment-files',
      closeBundle() {
        // Copy Azure deployment config files to dist for hosting
        try {
          copyFileSync(resolve(__dirname, 'staticwebapp.config.json'), resolve(__dirname, 'dist/staticwebapp.config.json'))
          copyFileSync(resolve(__dirname, 'web.config'), resolve(__dirname, 'dist/web.config'))
          console.log('✅ Copied deployment config files to dist/')
        } catch (error) {
          console.error('⚠️  Failed to copy deployment config files:', error.message)
        }
      }
    }
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
