import { useEffect, type ReactNode } from 'react'

import { useAppDispatch } from '@/app/store/hooks'
import { checkForUpdates, UpdateNotification } from '@/features/updater'

type Props = {
  children: ReactNode
}

/**
 * Provider that automatically checks for updates on app startup
 * and renders the update notification dialog.
 */
export function UpdaterProvider({ children }: Props) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Check for updates on app startup (with slight delay)
    const timeoutId = setTimeout(() => {
      void checkForUpdates(dispatch)
    }, 2000) // 2 second delay to let app fully initialize

    return () => clearTimeout(timeoutId)
  }, [dispatch])

  return (
    <>
      {children}
      <UpdateNotification />
    </>
  )
}
