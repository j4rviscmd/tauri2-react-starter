import { Store } from '@tauri-apps/plugin-store'

const SETTINGS_FILE = 'settings.json'
const THEME_KEY = 'theme' as const

type Theme = 'light' | 'dark'

type ThemeStore = {
  getTheme: () => Promise<Theme | null>
  setTheme: (theme: Theme) => Promise<void>
}

let storePromise: Promise<Store> | null = null

/**
 * Lazily initializes and returns the Tauri store instance.
 *
 * Uses a promise cache pattern to ensure the store is only loaded once
 * during the application lifetime.
 *
 * @returns The Tauri store instance.
 */
async function getStore(): Promise<Store> {
  storePromise ??= Store.load(SETTINGS_FILE, {
    defaults: {},
    autoSave: true,
  })
  return storePromise
}

/**
 * Theme store for persisting theme preferences using Tauri's store plugin.
 *
 * Provides methods to get and set the current theme ('light' or 'dark')
 * in a persistent JSON settings file.
 */
export const themeStore: ThemeStore = {
  /**
   * Retrieves the saved theme preference from persistent storage.
   *
   * @returns The saved theme ('light' or 'dark'), or null if not set.
   */
  async getTheme() {
    const store = await getStore()
    const value = await store.get<string>(THEME_KEY)

    if (value === 'light' || value === 'dark') return value
    return null
  },
  /**
   * Saves the theme preference to persistent storage.
   *
   * @param theme - The theme to save ('light' or 'dark').
   */
  async setTheme(theme) {
    const store = await getStore()
    await store.set(THEME_KEY, theme)

    await store.save()
  },
}
