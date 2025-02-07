
import { Users, Building2, DollarSign, Activity } from "lucide-react";
import { MetricsCard } from "./MetricsCard";
import { useOrganizations } from "@/hooks/useOrganizations";

export const GlobalAdminMetrics = () => {
  const { 
    totalOrganizations, 
    activeUsers, 
    totalRevenue,
    isLoading 
  } = useOrganizations();

  if (isLoading) {
    return <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-[120px] bg-muted animate-pulse rounded-lg" />
      ))}
    </div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
      <MetricsCard
        title="Total Organizations"
        value={totalOrganizations}
        icon={Building2}
        trend={{ value: "+3", positive: true }}
      />
      <MetricsCard
        title="Total Users"
        value={activeUsers}
        icon={Users}
        trend={{ value: "+18%", positive: true }}
      />
      <MetricsCard
        title="Total Revenue"
        value={`$${totalRevenue}`}
        icon={DollarSign}
        trend={{ value: "+8%", positive: true }}
      />
      <MetricsCard
        title="Active Sessions"
        value="456"
        icon={Activity}
        trend={{ value: "+12%", positive: true }}
      />
    </div>
  );
};
