import { Frame, Home, Settings } from 'lucide-react'
import { Link, useLocation } from 'react-router'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar'

/**
 * Application sidebar navigation component.
 *
 * Displays navigation menu items for Home and Settings pages.
 * Active route is highlighted automatically.
 *
 * @example
 * ```tsx
 * <AppSidebar />
 * ```
 */
export function AppSidebar() {
  const location = useLocation()

  const menuItems = [
    {
      title: 'Home',
      url: '/',
      icon: Home,
    },
    {
      title: 'Animate UI Sidebar',
      url: '/animate-ui-sidebar',
      icon: Frame,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>{/* App title can be added here later */}</SidebarHeader>
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
    </Sidebar>
  )
}
