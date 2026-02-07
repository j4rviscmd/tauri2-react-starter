/**
 * Vite configuration for Tauri 2 + React 19 + TypeScript application.
 *
 * Features:
 * - React plugin with Fast Refresh
 * - Path aliases for clean imports (@/, @/app/*, @/pages/*, @/features/*, @/shared/*)
 * - Local development server configuration for Tauri integration
 *
 * @see https://vite.dev/config/
 */

import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@/pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@/features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@/shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: '127.0.0.1',
      port: 5173,
    },
  },
})
