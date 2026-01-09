import type { ReactNode } from "react"
import { useEffect, useState } from "react"

import { themeStore } from "@/shared/lib/themeStore"

type Theme = "light" | "dark"

type Props = {
  children: ReactNode
}

function applyThemeClass(theme: Theme) {
  const root = document.documentElement
  if (theme === "dark") root.classList.add("dark")
  else root.classList.remove("dark")
}

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const load = async () => {
      const saved = await themeStore.getTheme()
      const nextTheme = saved ?? "light"
      setTheme(nextTheme)
      applyThemeClass(nextTheme)
    }

    void load()
  }, [])

  useEffect(() => {
    applyThemeClass(theme)
  }, [theme])

  return <div data-theme={theme}>{children}</div>
}
