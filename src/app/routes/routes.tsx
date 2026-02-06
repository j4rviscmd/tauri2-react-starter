import type { RouteObject } from 'react-router'

import { AppLayout } from '@/app/layout/AppLayout'
import AnimateUiSidebarPage from '@/pages/animate-ui-sidebar'
import { HomePage } from '@/pages/home'
import { SettingsPage } from '@/pages/settings'

/**
 * Application route configuration.
 *
 * Defines the route structure using React Router v7's route object API.
 * All routes are nested under the AppLayout component.
 */
export const routes: RouteObject[] = [
  // Standalone route outside AppLayout
  {
    path: 'animate-ui-sidebar',
    element: <AnimateUiSidebarPage />,
  },
  // Main application routes with AppLayout
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
]
