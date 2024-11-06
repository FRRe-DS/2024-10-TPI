import { Home, Inbox, Search, Settings, User } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  //   {
  //     title: "Eventos",
  //     url: "#",
  //     icon: Inbox,
  //   },
  {
    title: "Eventos",
    url: "/admin/events",
    icon: User,
  },
  {
    title: "Escultores",
    url: "/admin/sculptors",
    icon: Inbox,
  },
  {
    title: "Buscar",
    url: "#/events",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Bienal Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Calendar />
    </Sidebar>
  );
}
