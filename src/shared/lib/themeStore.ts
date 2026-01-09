import { Store } from "@tauri-apps/plugin-store"

const SETTINGS_FILE = "settings.json"
const THEME_KEY = "theme" as const

type Theme = "light" | "dark"

type ThemeStore = {
  getTheme: () => Promise<Theme | null>
  setTheme: (theme: Theme) => Promise<void>
}

let storePromise: Promise<Store> | null = null

async function getStore(): Promise<Store> {
  storePromise ??= Store.load(SETTINGS_FILE, {
    defaults: {},
    autoSave: true,
  })
  return storePromise
}

export const themeStore: ThemeStore = {
  async getTheme() {
    const store = await getStore()
    const value = await store.get<string>(THEME_KEY)

    if (value === "light" || value === "dark") return value
    return null
  },
  async setTheme(theme) {
    const store = await getStore()
    await store.set(THEME_KEY, theme)

    await store.save()
  },
}
