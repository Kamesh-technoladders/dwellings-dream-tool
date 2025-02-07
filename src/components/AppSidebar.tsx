
import {
  Building,
  Home,
  Settings,
  Users,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { SidebarGroup } from "./sidebar/SidebarGroup";
import { SidebarMenu } from "./sidebar/SidebarMenu";
import { SidebarMenuItem } from "./sidebar/SidebarMenuItem";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    title: "Organizations",
    icon: Building,
    path: "/organizations",
  },
  {
    title: "Properties",
    icon: Building,
    path: "/properties",
  },
  {
    title: "Users",
    icon: Users,
    path: "/users",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    path: "/messages",
  },
  {
    title: "Calendar",
    icon: Calendar,
    path: "/calendar",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup label="Menu">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem
                key={item.path}
                icon={item.icon}
                title={item.title}
                path={item.path}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
