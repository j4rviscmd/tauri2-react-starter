import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/app/store/store'
import type {
  DownloadProgress,
  UpdateError,
  UpdateInfo,
  UpdateStatus,
} from '../lib/updaterTypes'

/**
 * Redux slice state for application update functionality.
 */
type UpdaterState = {
  /** Current status of the update process. */
  status: UpdateStatus
  /** Information about the available update, if any. */
  updateInfo: UpdateInfo | null
  /** Download progress information during update download. */
  progress: DownloadProgress | null
  /** Error information if an update operation failed. */
  error: UpdateError | null
  /** Whether the update notification dialog is currently open. */
  isDialogOpen: boolean
}

const initialState: UpdaterState = {
  status: 'idle',
  updateInfo: null,
  progress: null,
  error: null,
  isDialogOpen: false,
}

/**
 * Redux slice managing application update state and UI.
 *
 * Provides actions and selectors for controlling the update check,
 * download, and installation process, as well as the update dialog.
 */
export const updaterSlice = createSlice({
  name: 'updater',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<UpdateStatus>) => {
      state.status = action.payload
    },
    setUpdateInfo: (state, action: PayloadAction<UpdateInfo | null>) => {
      state.updateInfo = action.payload
    },
    setProgress: (state, action: PayloadAction<DownloadProgress | null>) => {
      state.progress = action.payload
    },
    setError: (state, action: PayloadAction<UpdateError | null>) => {
      state.error = action.payload
    },
    openDialog: (state) => {
      state.isDialogOpen = true
    },
    closeDialog: (state) => {
      state.isDialogOpen = false
    },
    reset: () => initialState,
  },
})

export const {
  setStatus,
  setUpdateInfo,
  setProgress,
  setError,
  openDialog,
  closeDialog,
  reset,
} = updaterSlice.actions

// Selectors

/**
 * Selects the current update status from the Redux store.
 */
export const selectUpdaterStatus = (state: RootState) => state.updater.status

/**
 * Selects the available update information from the Redux store.
 */
export const selectUpdateInfo = (state: RootState) => state.updater.updateInfo

/**
 * Selects the download progress from the Redux store.
 */
export const selectDownloadProgress = (state: RootState) =>
  state.updater.progress

/**
 * Selects the update error from the Redux store.
 */
export const selectUpdaterError = (state: RootState) => state.updater.error

/**
 * Selects whether the update dialog is open.
 */
export const selectIsDialogOpen = (state: RootState) =>
  state.updater.isDialogOpen

export const updaterReducer = updaterSlice.reducer
