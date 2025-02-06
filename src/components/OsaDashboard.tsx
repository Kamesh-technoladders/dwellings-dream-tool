import { useEffect, useState } from "react";
import { MetricsCard } from "@/components/MetricsCard";
import { Building2, Users, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ActivityFeed } from "@/components/ActivityFeed";

export function OsaDashboard() {
  const [metrics, setMetrics] = useState({
    totalProperties: 0,
    activeProperties: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data: organizationData } = await supabase
        .from("organization_users")
        .select("organization_id")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (organizationData) {
        const { data: metricsData } = await supabase
          .from("organization_metrics")
          .select("*")
          .eq("organization_id", organizationData.organization_id)
          .single();

        if (metricsData) {
          setMetrics({
            totalProperties: metricsData.total_properties,
            activeProperties: metricsData.active_properties,
            totalUsers: metricsData.total_users,
          });
        }
      }
    };

    fetchMetrics();
  }, []);

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

      <div className="grid gap-4 md:grid-cols-2">
        <ActivityFeed />
      </div>
    </div>
  );
}