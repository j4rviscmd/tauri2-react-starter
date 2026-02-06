import { ToggleThemeButton } from '@/features/preference'
import { Button } from '@/shared/ui/button'
import { SettingsIcon } from '@/shared/ui/icons/SettingsIcon'
import { SidebarTrigger } from '@/shared/ui/sidebar'
import { Link } from 'react-router'
import { NavigationButtons } from './NavigationButtons'

/**
 * Application top bar component.
 *
 * Displays:
 * - Sidebar trigger (left)
 * - App title (left)
 * - Navigation buttons (center)
 * - Theme toggle button (right)
 * - Settings button with hover animation (right)
 *
 * Ported from bilibili-downloader-gui with adaptations:
 * - User display removed (no user feature in current project)
 * - i18n removed (can be added later)
 * - Direct Link component for settings navigation
 * - Navigation buttons added for history navigation
 *
 * @example
 * ```tsx
 * <AppBar />
 * ```
 */
export function AppBar() {
  return (
    <div className="sticky top-0 z-50 box-border flex h-9 w-full items-center justify-between bg-accent px-3 shadow-sm sm:mx-auto sm:max-w-7xl sm:px-6">
      <div className="flex items-center gap-1.5">
        <SidebarTrigger />
        <Link to="/" className="text-muted-foreground hover:text-foreground">
          App
        </Link>
        <NavigationButtons />
      </div>

      <div className="flex items-center">
        <ToggleThemeButton />
        <div className="mx-1.5" />
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          asChild
          aria-label="Open settings"
        >
          <Link to="/settings">
            <SettingsIcon size={18} />
          </Link>
        </Button>
      </div>
    </div>
  )
}
