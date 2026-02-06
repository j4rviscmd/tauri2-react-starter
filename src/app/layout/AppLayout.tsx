import { AppBar, AppSidebar } from '@/shared/ui/AppBar'
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { Outlet } from 'react-router'

/**
 * Application shell component that provides the main layout structure.
 *
 * Comprises the Sidebar (navigation), AppBar (fixed header with app title, theme toggle, and settings),
 * and a scrollable main content area.
 *
 * @returns The application layout component.
 */
export function AppLayout() {
  return (
    <SidebarProvider defaultOpen={true} className="h-svh">
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-full w-full flex-col">
          <AppBar />
          <ScrollArea className="flex-1 min-h-0">
            <main className="bg-blue-500">
              <Outlet />
            </main>
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
