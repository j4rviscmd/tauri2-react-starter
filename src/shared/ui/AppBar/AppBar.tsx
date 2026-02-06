import { ToggleThemeButton } from '@/features/preference'
import { Button } from '@/shared/ui/button'
import { SettingsIcon } from '@/shared/ui/icons/SettingsIcon'
import { Separator } from '@/shared/ui/separator'
import { SidebarTrigger } from '@/shared/ui/animate-ui/components/radix/sidebar'
import { Link } from 'react-router'
import { NavigationButtons } from './NavigationButtons'

/**
 * Application top bar component with navigation and utility controls.
 *
 * Provides a fixed header containing:
 * - **Sidebar trigger**: Button to toggle the collapsible sidebar
 * - **App title/link**: Navigation link to home page
 * - **Navigation buttons**: Back/forward history navigation
 * - **Theme toggle**: Light/dark mode switcher
 * - **Settings button**: Link to settings page
 *
 * The bar is sticky at the top of the viewport with a subtle shadow
 * and responsive max-width container on larger screens.
 *
 * @returns A top bar component with navigation and theme controls
 *
 * @example
 * ```tsx
 * // Used in AppLayout
 * <SidebarInset>
 *   <AppBar />
 *   <ScrollArea>
 *     <Outlet />
 *   </ScrollArea>
 * </SidebarInset>
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
        <Separator orientation="vertical" className="h-4" />
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
