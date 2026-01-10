import { createApi } from '@reduxjs/toolkit/query/react'

import { tauriBaseQuery } from '@/shared/api/tauriBaseQuery'

export type AppInfo = {
  name: string
  version: string
}

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
