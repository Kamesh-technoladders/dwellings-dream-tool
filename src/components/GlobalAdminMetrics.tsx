import { Users, Building2, DollarSign, Activity } from "lucide-react";
import { MetricsCard } from "./MetricsCard";

export const GlobalAdminMetrics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
      <MetricsCard
        title="Total Organizations"
        value="15"
        icon={Building2}
        trend={{ value: "+3", positive: true }}
      />
      <MetricsCard
        title="Total Users"
        value="2,345"
        icon={Users}
        trend={{ value: "+18%", positive: true }}
      />
      <MetricsCard
        title="Total Revenue"
        value="$1.2M"
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