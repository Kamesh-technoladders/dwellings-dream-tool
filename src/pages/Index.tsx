import { SidebarProvider } from "@/components/ui/sidebar";
import { GlobalAdminSidebar } from "@/components/GlobalAdminSidebar";
import { OsaSidebar } from "@/components/OsaSidebar";
import { GlobalAdminMetrics } from "@/components/GlobalAdminMetrics";
import { OsaDashboard } from "@/components/OsaDashboard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_global_admin")
          .eq("id", user.id)
          .single();

        setIsGlobalAdmin(profile?.is_global_admin || false);
      }
      setLoading(false);
    };

    checkUserRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        {isGlobalAdmin ? <GlobalAdminSidebar /> : <OsaSidebar />}
        <main className="flex-1 bg-background p-8">
          <h1 className="text-3xl font-bold mb-8">
            {isGlobalAdmin ? "Global Admin Dashboard" : "Organization Dashboard"}
          </h1>
          
          {isGlobalAdmin ? <GlobalAdminMetrics /> : <OsaDashboard />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;