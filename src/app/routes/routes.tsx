import type { RouteObject } from 'react-router'

import { AppLayout } from '@/app/layout/AppLayout'
import { HomePage } from '@/pages/home'
import { SettingsPage } from '@/pages/settings'

export const routes: RouteObject[] = [
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
