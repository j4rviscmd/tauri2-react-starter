import { ToggleThemeButton } from '@/features/preference'
import { Separator } from '@/shared/ui/separator'
import { Link } from 'react-router'
import { NavigationButtons } from './NavigationButtons'

/**
 * Application top bar component with navigation and utility controls.
 *
 * Provides a fixed header containing:
 * - **App title/link**: Navigation link to home page
 * - **Navigation buttons**: Back/forward history navigation
 * - **Theme toggle**: Light/dark mode switcher
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
    <div className="sticky top-0 z-50 box-border flex h-9 w-full items-center justify-between bg-accent px-3 shadow-sm sm:mx-auto sm:px-6">
      <div className="flex items-center gap-1.5">
        <Link to="/" className="text-muted-foreground hover:text-foreground">
          App
        </Link>
        <Separator orientation="vertical" className="h-4 mx-1 dark:bg-white/10" />
        <NavigationButtons />
      </div>

      <div className="flex items-center">
        <ToggleThemeButton />
      </div>
    </div>
  )
}
