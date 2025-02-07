
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import {
  SidebarMenuItem as BaseSidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface SidebarMenuItemProps {
  icon: LucideIcon;
  title: string;
  path: string;
}

export function SidebarMenuItem({ icon: Icon, title, path }: SidebarMenuItemProps) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <BaseSidebarMenuItem>
      <SidebarMenuButton
        asChild
        data-active={isActive}
        className="hover:bg-purple-100 data-[active=true]:bg-[#9b87f5] data-[active=true]:text-white"
      >
        <Link to={path} className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </BaseSidebarMenuItem>
  );
}
