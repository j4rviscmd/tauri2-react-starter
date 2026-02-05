import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { themeStore } from '@/shared/lib/themeStore'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => Promise<void>
  toggleTheme: () => Promise<void>
}

type Props = {
  children: ReactNode
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/**
 * Applies or removes the 'dark' class on the document element.
 *
 * @param theme - The theme to apply ('light' or 'dark').
 */
function applyThemeClass(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

/**
 * Internal hook to access the theme context.
 *
 * @throws {Error} If used outside of ThemeProvider.
 * @returns The theme context value.
 */
function useThemeInternal(): ThemeContextValue {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used within ThemeProvider')
  return value
}

export const useTheme = useThemeInternal

/**
 * Theme provider component that manages theme state and persistence.
 *
 * Loads the saved theme on mount and provides theme switching functionality
 * to child components via context. Persists theme changes using the themeStore.
 *
 * @param children - Child components to be wrapped with theme context.
 */
export function ThemeProvider({ children }: Props) {
  const [theme, setThemeState] = useState<Theme>('light')

  const setTheme = useCallback(async (next: Theme) => {
    setThemeState(next)
    applyThemeClass(next)
    await themeStore.setTheme(next)
  }, [])

  const toggleTheme = useCallback(async () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    await setTheme(next)
  }, [setTheme, theme])

  useEffect(() => {
    const load = async () => {
      const saved = await themeStore.getTheme()
      const nextTheme = saved ?? 'light'
      setThemeState(nextTheme)
      applyThemeClass(nextTheme)
    }

    void load()
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  )
}
