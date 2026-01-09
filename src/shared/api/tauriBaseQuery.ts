import { invoke } from '@tauri-apps/api/core'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

type TauriBaseQueryArgs = {
  command: string
  args?: Record<string, unknown>
}

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
