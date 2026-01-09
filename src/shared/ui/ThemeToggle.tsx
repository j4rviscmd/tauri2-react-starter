import { useEffect, useState } from "react"

import { themeStore } from "@/shared/lib/themeStore"
import { Button } from "@/shared/ui/button"

type Theme = "light" | "dark"

function toggleTheme(theme: Theme): Theme {
  return theme === "dark" ? "light" : "dark"
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const load = async () => {
      const saved = await themeStore.getTheme()
      setTheme(saved ?? "light")
    }

    void load()
  }, [])

  const onToggle = async () => {
    const next = toggleTheme(theme)
    setTheme(next)
    await themeStore.setTheme(next)
  }

  return (
    <Button type="button" variant="outline" onClick={() => void onToggle()}>
      {theme === "dark" ? "Dark" : "Light"}
    </Button>
  )
}
