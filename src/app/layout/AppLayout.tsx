import { useIsMobile } from '@/shared/hooks/use-mobile'
import {
  SidebarInset,
  SidebarProvider,
} from '@/shared/ui/animate-ui/components/radix/sidebar'
import { AppBar, AppSidebar } from '@/shared/ui/AppBar'
import { ScrollArea } from '@/shared/ui/scroll-area'
import * as React from 'react'
import { Outlet } from 'react-router'

/**
 * Application shell component that provides the main layout structure.
 *
 * This layout component serves as the root wrapper for all routes in the application.
 * It comprises three main sections:
 * - **Sidebar**: Navigation menu for route switching
 *   - Mobile (<768px): Icon-only mode (collapsed)
 *   - Desktop (≥768px): Full sidebar (expanded)
 * - **AppBar**: Fixed header containing app title, theme toggle, and settings link
 * - **Main Content**: Scrollable area where page content is rendered via the Outlet
 *
 * @returns A layout component with sidebar navigation and app bar
 *
 * @example
 * ```tsx
 * // Used in route configuration
 * const routes = [
 *   {
 *     path: '/',
 *     element: <AppLayout />,
 *     children: [
 *       { path: '/', element: <HomePage /> },
 *       { path: '/settings', element: <SettingsPage /> }
 *     ]
 *   }
 * ]
 * ```
 */
export function AppLayout() {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(!isMobile)

  React.useEffect(() => {
    setOpen(!isMobile)
  }, [isMobile])

  return (
    <SidebarProvider open={open} onOpenChange={setOpen} className="h-svh">
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-full w-full flex-col">
          <AppBar />
          <ScrollArea className="min-h-0 flex-1 p-3">
            <Outlet />
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
