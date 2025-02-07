
import { useEffect, useState } from "react";
import { MetricsCard } from "@/components/MetricsCard";
import { Building2, Users, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ActivityFeed } from "@/components/ActivityFeed";
import { useToast } from "@/components/ui/use-toast";
import { ProductSalesChart } from "@/components/ProductSalesChart";
import { RevenueChart } from "@/components/RevenueChart";
import { InvoiceChart } from "@/components/InvoiceChart";
import { DateRangeFilter } from "@/components/DateRangeFilter";

export function OsaDashboard() {
  const [metrics, setMetrics] = useState({
    totalProperties: 0,
    activeProperties: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
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

        // Get user's organization
        const { data: organizationUser, error: orgUserError } = await supabase
          .from("organization_users")
          .select("organization_id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (orgUserError) {
          throw new Error("Failed to fetch organization");
        }

        if (!organizationUser) {
          throw new Error("No organization found for user");
        }

        // Fetch metrics for the organization
        const { data: metricsData, error: metricsError } = await supabase
          .from("organization_metrics")
          .select("*")
          .eq("organization_id", organizationUser.organization_id)
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

  const handleDateChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
  };

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
      <DateRangeFilter onDateChange={handleDateChange} />

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
        <ProductSalesChart />
        <RevenueChart startDate={startDate} endDate={endDate} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <InvoiceChart />
        <ActivityFeed />
      </div>
    </div>
  );
};
