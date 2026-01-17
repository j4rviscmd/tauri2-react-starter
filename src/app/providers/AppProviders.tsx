import type { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { UpdaterProvider } from '@/app/providers/UpdaterProvider'
import { store } from '@/app/store/store'

type Props = {
  children: ReactNode
}

export function AppProviders({ children }: Props) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <UpdaterProvider>{children}</UpdaterProvider>
      </ThemeProvider>
    </Provider>
  )
}
