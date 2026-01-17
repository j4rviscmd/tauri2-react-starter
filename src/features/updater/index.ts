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
