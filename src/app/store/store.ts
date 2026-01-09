import { configureStore } from "@reduxjs/toolkit"

import { appInfoApi } from "@/features/appInfo/api/appInfoApi"

export const store = configureStore({
  reducer: {
    [appInfoApi.reducerPath]: appInfoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appInfoApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
