
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { PageHeader } from "@/components/PageHeader";
import { useLocation } from "react-router-dom";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    return path.substring(1).charAt(0).toUpperCase() + path.slice(2);
  };

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-full w-full flex-col">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
            <SidebarTrigger />
            <PageHeader title={getPageTitle()} />
          </div>
          <div className="flex-1 p-6">{children}</div>
        </div>
      </SidebarInset>
    </div>
  );
}
