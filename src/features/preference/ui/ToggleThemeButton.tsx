import { useTheme } from '@/app/providers/ThemeProvider'
import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

/**
 * Props for ToggleThemeButton component.
 */
type ToggleThemeButtonProps = {
  className?: string
}

/**
 * Animated toggle button for light/dark theme selection.
 *
 * Displays a circular button that cycles through light/dark themes
 * with smooth icon transitions. Uses Framer Motion for animations.
 *
 * Ported from bilibili-downloader-gui with animate-ui inspired animations.
 *
 * @example
 * ```tsx
 * <ToggleThemeButton />
 * ```
 */
export function ToggleThemeButton({ className }: ToggleThemeButtonProps) {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    void setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const getIcon = () => {
    return theme === 'light' ? (
      <Sun className="size-4" />
    ) : (
      <Moon className="size-4" />
    )
  }

  return (
    <motion.button
      type="button"
      onClick={cycleTheme}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0, scale: 0 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 180, opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}
