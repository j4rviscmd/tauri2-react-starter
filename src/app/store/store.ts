import { configureStore } from '@reduxjs/toolkit'

import { appInfoApi } from '@/features/appInfo/api/appInfoApi'
import { counterReducer } from '@/features/counter/model/counterSlice'
import { updaterReducer } from '@/features/updater'

/**
 * Configured Redux store with all feature reducers and middleware.
 *
 * Integrates Redux Toolkit with RTK Query APIs for state management.
 */
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    updater: updaterReducer,
    [appInfoApi.reducerPath]: appInfoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appInfoApi.middleware),
})

/**
 * TypeScript type for the root state.
 * Use this for typing selectors.
 */
export type RootState = ReturnType<typeof store.getState>

/**
 * TypeScript type for the store's dispatch method.
 * Use this for typing thunks and actions.
 */
export type AppDispatch = typeof store.dispatch
