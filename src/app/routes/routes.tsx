import type { RouteObject } from 'react-router'

export const routes: RouteObject[] = [
  {
    path: '/',
    lazy: async () => {
      const { HomePage } = await import('../../pages/home/index')
      return { Component: HomePage }
    },
  },
  {
    path: '/settings',
    lazy: async () => {
      const { SettingsPage } = await import('../../pages/settings/index')
      return { Component: SettingsPage }
    },
  },
]
