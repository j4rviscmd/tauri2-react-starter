import { relaunch } from '@tauri-apps/plugin-process'
import { check } from '@tauri-apps/plugin-updater'

import type { AppDispatch } from '@/app/store/store'
import type { Update } from '@tauri-apps/plugin-updater'
import {
  closeDialog,
  openDialog,
  setError,
  setProgress,
  setStatus,
  setUpdateInfo,
} from '../model/updaterSlice'

/** Stores the current update object for later download/install. */
let currentUpdate: Update | null = null

/**
 * Checks if the app is running in development mode.
 *
 * @returns true if running in development, false otherwise.
 */
function isDevelopment(): boolean {
  return import.meta.env.DEV
}

/**
 * Checks for available application updates.
 *
 * Queries the Tauri updater plugin for new versions. If an update is found,
 * stores the update object and opens the update dialog. Skips checking in
 * development mode.
 *
 * @param dispatch - Redux dispatch function for state updates.
 *
 * @example
 * ```typescript
 * await checkForUpdates(dispatch)
 * ```
 */
export async function checkForUpdates(dispatch: AppDispatch): Promise<void> {
  // Skip update check in development mode
  if (isDevelopment()) {
    console.log('[Updater] Skipping update check in development mode')
    return
  }

  dispatch(setStatus('checking'))
  dispatch(setError(null))

  try {
    const update = await check()

    if (update) {
      currentUpdate = update
      dispatch(
        setUpdateInfo({
          version: update.version,
          currentVersion: update.currentVersion,
          date: update.date ?? null,
          body: update.body ?? null,
        }),
      )
      dispatch(setStatus('available'))
      dispatch(openDialog())
    } else {
      currentUpdate = null
      dispatch(setUpdateInfo(null))
      dispatch(setStatus('up-to-date'))
    }
  } catch (error) {
    console.error('[Updater] Failed to check for updates:', error)
    dispatch(
      setError({
        message:
          error instanceof Error
            ? error.message
            : 'アップデートの確認に失敗しました',
      }),
    )
    dispatch(setStatus('error'))
  }
}

/**
 * Downloads and installs the available update.
 *
 * Downloads the update package while reporting progress to Redux state.
 * Once complete, closes the dialog and relaunches the application.
 *
 * @param dispatch - Redux dispatch function for state updates.
 *
 * @example
 * ```typescript
 * await downloadAndInstallUpdate(dispatch)
 * ```
 */
export async function downloadAndInstallUpdate(
  dispatch: AppDispatch,
): Promise<void> {
  if (!currentUpdate) {
    dispatch(
      setError({
        message: 'アップデート情報がありません。再度確認してください。',
      }),
    )
    dispatch(setStatus('error'))
    return
  }

  dispatch(setStatus('downloading'))
  dispatch(setProgress({ total: null, downloaded: 0, percent: 0 }))

  try {
    let totalSize: number | null = null
    let downloadedSize = 0

    await currentUpdate.downloadAndInstall((event) => {
      if (event.event === 'Started') {
        totalSize = event.data.contentLength ?? null
      } else if (event.event === 'Progress') {
        downloadedSize += event.data.chunkLength
        const percent = totalSize ? (downloadedSize / totalSize) * 100 : 0
        dispatch(
          setProgress({
            total: totalSize,
            downloaded: downloadedSize,
            percent: Math.round(percent),
          }),
        )
      } else if (event.event === 'Finished') {
        dispatch(
          setProgress({
            total: totalSize,
            downloaded: downloadedSize,
            percent: 100,
          }),
        )
      }
    })

    dispatch(setStatus('installing'))
    dispatch(closeDialog())

    // Relaunch the application
    await relaunch()
  } catch (error) {
    console.error('[Updater] Failed to download and install update:', error)
    dispatch(
      setError({
        message:
          error instanceof Error
            ? error.message
            : 'アップデートのインストールに失敗しました',
      }),
    )
    dispatch(setStatus('error'))
  }
}

/**
 * Closes the update dialog without installing the update.
 *
 * @param dispatch - Redux dispatch function for state updates.
 */
export function dismissUpdate(dispatch: AppDispatch): void {
  dispatch(closeDialog())
}
