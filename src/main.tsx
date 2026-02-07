import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'

import App from './App.tsx'
import { AppProviders } from './app/providers/AppProviders'
import './index.css'

/**
 * Application entry point.
 *
 * Mounts the React application to the DOM with the following provider stack:
 * 1. StrictMode - Enables React development mode checks
 * 2. AppProviders - Composes Redux, Theme, and Updater providers
 * 3. HashRouter - Provides client-side routing using hash-based URLs
 * 4. App - Root application component that renders route configuration
 *
 * Uses HashRouter instead of BrowserRouter for Tauri desktop app compatibility.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <HashRouter>
        <App />
      </HashRouter>
    </AppProviders>
  </StrictMode>,
)
