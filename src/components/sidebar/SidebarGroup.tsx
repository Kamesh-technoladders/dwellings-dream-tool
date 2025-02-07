
import {
  SidebarGroup as BaseSidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

interface SidebarGroupProps {
  label: string;
  children: React.ReactNode;
}

export function SidebarGroup({ label, children }: SidebarGroupProps) {
  return (
    <BaseSidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>{children}</SidebarGroupContent>
    </BaseSidebarGroup>
  );
}
