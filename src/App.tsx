import { useRoutes } from 'react-router'
import './App.css'

import { routes } from './app/routes/routes.tsx'

/**
 * Root application component.
 *
 * Uses React Router's useRoutes hook to render the route configuration.
 * This component is mounted by the main entry point and serves as the
 * top-level component that delegates rendering to the matched route.
 *
 * @returns The rendered route component based on the current URL.
 */
function App() {
  return useRoutes(routes)
}

export default App
