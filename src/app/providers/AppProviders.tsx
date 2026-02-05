import type { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { UpdaterProvider } from '@/app/providers/UpdaterProvider'
import { store } from '@/app/store/store'

type Props = {
  children: ReactNode
}

/**
 * Root provider component that composes all application providers.
 *
 * Wraps the application with Redux, Theme, and Updater providers
 * in the correct order. This should be placed at the top of the component tree.
 *
 * @param children - The application component tree.
 */
export function AppProviders({ children }: Props) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <UpdaterProvider>{children}</UpdaterProvider>
      </ThemeProvider>
    </Provider>
  )
}
