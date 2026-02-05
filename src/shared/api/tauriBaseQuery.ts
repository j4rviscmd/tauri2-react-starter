import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { invoke } from '@tauri-apps/api/core'

type TauriBaseQueryArgs = {
  command: string
  args?: Record<string, unknown>
}

/**
 * Redux Toolkit Query base query adapter for Tauri commands.
 *
 * Bridges RTK Query with Tauri's invoke system, allowing Tauri commands
 * to be used as if they were HTTP endpoints. Returns data in the format
 * expected by RTK Query ({ data } or { error }).
 *
 * @returns A base query function for RTK Query.
 *
 * @example
 * ```typescript
 * const api = createApi({
 *   baseQuery: tauriBaseQuery(),
 *   endpoints: (build) => ({
 *     get_data: build.query({
 *       query: () => ({ command: 'get_data' }),
 *     }),
 *   }),
 * })
 * ```
 */
export const tauriBaseQuery =
  (): BaseQueryFn<TauriBaseQueryArgs, unknown, unknown> =>
  async ({ command, args }) => {
    try {
      const data = await invoke(command, args)
      return { data }
    } catch (error) {
      return { error }
    }
  }
