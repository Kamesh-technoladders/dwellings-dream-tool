
import { SidebarMenu as BaseSidebarMenu } from "@/components/ui/sidebar";

interface SidebarMenuProps {
  children: React.ReactNode;
}

export function SidebarMenu({ children }: SidebarMenuProps) {
  return <BaseSidebarMenu>{children}</BaseSidebarMenu>;
}
