import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/app/store/store'
import type {
  DownloadProgress,
  UpdateError,
  UpdateInfo,
  UpdateStatus,
} from '../lib/updaterTypes'

type UpdaterState = {
  status: UpdateStatus
  updateInfo: UpdateInfo | null
  progress: DownloadProgress | null
  error: UpdateError | null
  isDialogOpen: boolean
}

const initialState: UpdaterState = {
  status: 'idle',
  updateInfo: null,
  progress: null,
  error: null,
  isDialogOpen: false,
}

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
export const selectUpdaterStatus = (state: RootState) => state.updater.status
export const selectUpdateInfo = (state: RootState) => state.updater.updateInfo
export const selectDownloadProgress = (state: RootState) =>
  state.updater.progress
export const selectUpdaterError = (state: RootState) => state.updater.error
export const selectIsDialogOpen = (state: RootState) =>
  state.updater.isDialogOpen

export const updaterReducer = updaterSlice.reducer
