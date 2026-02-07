import { SettingsIcon } from '@/shared/ui/icons/SettingsIcon'
import { Home, type LucideIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from '@/shared/ui/animate-ui/components/radix/sidebar'

/**
 * Navigation menu item configuration.
 *
 * @property title - Display text for the menu item.
 * @property url - Route path for the menu item.
 * @property icon - Lucide React icon component to display.
 */
type MenuItem = {
  title: string
  url: string
  icon: LucideIcon
}

/**
 * Application sidebar navigation component.
 *
 * Displays navigation menu items for Home and Settings pages.
 * Active route is highlighted automatically.
 * Sidebar trigger button is positioned at the top of the sidebar.
 *
 * The sidebar state (expanded/collapsed) is controlled by the parent
 * SidebarProvider based on screen size.
 *
 * @example
 * ```tsx
 * <AppSidebar />
 * ```
 */

export function AppSidebar() {
  const location = useLocation()

  const menuItems: MenuItem[] = [{ title: 'Home', url: '/', icon: Home }]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-1">
          <SidebarTrigger />
          {/* App title can be added here later */}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={location.pathname === '/settings'}
              tooltip="Settings"
            >
              <Link to="/settings">
                <SettingsIcon />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
