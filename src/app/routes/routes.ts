import type { RouteObject } from 'react-router'

export const routes: RouteObject[] = [
  {
    path: '/',
    lazy: async () => {
      const { HomePage } = await import('../../pages/home')
      return { Component: HomePage }
    },
  },
  {
    path: '/settings',
    lazy: async () => {
      const { SettingsPage } = await import('../../pages/settings')
      return { Component: SettingsPage }
    },
  },
]
