import { createApi } from '@reduxjs/toolkit/query/react'

import { tauriBaseQuery } from '@/shared/api/tauriBaseQuery'

/**
 * Application information returned from the Tauri backend.
 */
export type AppInfo = {
  name: string
  version: string
}

/**
 * RTK Query API for fetching application information.
 *
 * Retrieves app metadata (name, version) from the Tauri backend.
 */
export const appInfoApi = createApi({
  reducerPath: 'appInfoApi',
  baseQuery: tauriBaseQuery(),
  endpoints: (build) => ({
    getAppInfo: build.query<AppInfo, void>({
      query: () => ({
        command: 'get_app_info',
      }),
    }),
  }),
})

export const { useGetAppInfoQuery } = appInfoApi
