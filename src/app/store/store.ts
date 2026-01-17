import { configureStore } from '@reduxjs/toolkit'

import { appInfoApi } from '@/features/appInfo/api/appInfoApi'
import { counterReducer } from '@/features/counter/model/counterSlice'
import { updaterReducer } from '@/features/updater'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    updater: updaterReducer,
    [appInfoApi.reducerPath]: appInfoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appInfoApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
