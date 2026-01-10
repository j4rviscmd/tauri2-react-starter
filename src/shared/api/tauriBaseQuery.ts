import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { invoke } from '@tauri-apps/api/core'

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
