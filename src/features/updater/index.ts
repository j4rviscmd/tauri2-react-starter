/**
 * Updater feature module.
 *
 * Manages application update checking, downloading, and installation.
 * Integrates with Tauri's updater plugin for seamless desktop app updates.
 *
 * @exports checkForUpdates - Initiates update check and displays dialog if update available.
 * @exports downloadAndInstallUpdate - Downloads and installs available update.
 * @exports dismissUpdate - Closes the update notification dialog.
 * @exports UpdateStatus - Type for update process status.
 * @exports UpdateInfo - Type for available update information.
 * @exports DownloadProgress - Type for download progress tracking.
 * @exports UpdateError - Type for update error information.
 * @exports updaterReducer - Redux reducer for updater state.
 * @exports selectors - Redux selectors for accessing updater state.
 * @exports UpdateNotification - Dialog component for update notifications.
 */

// Public API for updater feature
export {
  checkForUpdates,
  dismissUpdate,
  downloadAndInstallUpdate,
} from './api/updaterApi'
export type {
  DownloadProgress,
  UpdateError,
  UpdateInfo,
  UpdateStatus,
} from './lib/updaterTypes'
export {
  selectDownloadProgress,
  selectIsDialogOpen,
  selectUpdateInfo,
  selectUpdaterError,
  selectUpdaterStatus,
  updaterReducer,
} from './model/updaterSlice'
export { UpdateNotification } from './ui/UpdateNotification'
