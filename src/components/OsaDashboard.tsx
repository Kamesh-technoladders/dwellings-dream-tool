
import { useEffect, useState } from "react";
import { MetricsCard } from "@/components/MetricsCard";
import { Building2, Users, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ActivityFeed } from "@/components/ActivityFeed";
import { useToast } from "@/components/ui/use-toast";

export function OsaDashboard() {
  const [metrics, setMetrics] = useState({
    totalProperties: 0,
    activeProperties: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error("User not authenticated");
        }

        const { data: organizationData, error: orgError } = await supabase
          .from("organization_users")
          .select("organization_id, role")
          .eq("user_id", user.id)
          .maybeSingle();

        if (orgError) {
          throw new Error("Failed to fetch organization data");
        }

        if (!organizationData) {
          throw new Error("No organization found for user");
        }

        const { data: metricsData, error: metricsError } = await supabase
          .from("organization_metrics")
          .select("*")
          .eq("organization_id", organizationData.organization_id)
          .maybeSingle();

        if (metricsError) {
          throw new Error("Failed to fetch metrics data");
        }

        if (metricsData) {
          setMetrics({
            totalProperties: metricsData.total_properties || 0,
            activeProperties: metricsData.active_properties || 0,
            totalUsers: metricsData.total_users || 0,
          });
        }
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

    fetchMetrics();
    // Set up an interval to refresh metrics every 5 minutes
    const interval = setInterval(fetchMetrics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [toast]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg" />
          ))}
        </div>
        <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
        <p className="text-red-600">Failed to load dashboard data: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricsCard
          title="Total Properties"
          value={metrics.totalProperties.toString()}
          icon={Building2}
        />
        <MetricsCard
          title="Active Properties"
          value={metrics.activeProperties.toString()}
          icon={Activity}
        />
        <MetricsCard
          title="Team Members"
          value={metrics.totalUsers.toString()}
          icon={Users}
        />
      </div>

      <div className="w-full">
        <ActivityFeed />
      </div>
    </div>
  );
}
