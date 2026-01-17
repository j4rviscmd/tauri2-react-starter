/**
 * Status of the update check and installation process.
 */
export type UpdateStatus =
  | 'idle'
  | 'checking'
  | 'available'
  | 'downloading'
  | 'installing'
  | 'error'
  | 'up-to-date'

/**
 * Information about an available update.
 */
export type UpdateInfo = {
  version: string
  currentVersion: string
  date: string | null
  body: string | null
}

/**
 * Download progress information.
 */
export type DownloadProgress = {
  total: number | null
  downloaded: number
  percent: number
}

/**
 * Error information for update failures.
 */
export type UpdateError = {
  message: string
  code?: string
}
