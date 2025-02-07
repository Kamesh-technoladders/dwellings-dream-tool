
import { SidebarProvider } from "@/components/ui/sidebar";
import { GlobalAdminSidebar } from "@/components/GlobalAdminSidebar";
import { OsaSidebar } from "@/components/OsaSidebar";
import { GlobalAdminMetrics } from "@/components/GlobalAdminMetrics";
import { OsaDashboard } from "@/components/OsaDashboard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error("User not authenticated");
        }

        // First check if user is a global admin
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("is_global_admin")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          throw new Error("Failed to fetch user profile");
        }

        if (profile?.is_global_admin) {
          setIsGlobalAdmin(true);
          return;
        }

        // If not global admin, check organization roles
        const { data: orgUser, error: orgError } = await supabase
          .from("organization_users")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "org_super_admin")
          .maybeSingle();

        if (orgError) {
          console.error("Error fetching organization role:", orgError);
          throw new Error("Failed to fetch organization role");
        }

        setIsGlobalAdmin(!!orgUser);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-pulse rounded-full bg-gray-200" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
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
