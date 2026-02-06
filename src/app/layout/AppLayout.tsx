import { AppBar, AppSidebar } from '@/shared/ui/AppBar'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { SidebarInset, SidebarProvider } from '@/shared/ui/animate-ui/components/radix/sidebar'
import { Outlet } from 'react-router'

/**
 * Application shell component that provides the main layout structure.
 *
 * This layout component serves as the root wrapper for all routes in the application.
 * It comprises three main sections:
 * - **Sidebar**: Navigation menu for route switching (always visible in icon mode on mobile)
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
  return (
    <SidebarProvider defaultOpen={true} className="h-svh">
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
