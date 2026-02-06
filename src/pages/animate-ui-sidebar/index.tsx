import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/shared/ui/animate-ui/components/radix/sidebar'

export default function AnimateUiSidebarPage() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>Item 1</SidebarMenuItem>
            <SidebarMenuItem>Item 2</SidebarMenuItem>
            <SidebarMenuItem>Item 3</SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Label 2</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>Item 1</SidebarMenuItem>
              <SidebarMenuItem>Item 2</SidebarMenuItem>
              <SidebarMenuItem>Item 3</SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>Item 1</SidebarMenuItem>
            <SidebarMenuItem>Item 2</SidebarMenuItem>
            <SidebarMenuItem>Item 3</SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <div className="p-4">
          <h1 className="text-2xl font-bold">Content Area</h1>
          <p className="text-muted-foreground">
            This is the main content area with Animate UI Sidebar
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
