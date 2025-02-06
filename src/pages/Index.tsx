import { Building2, TrendingUp, Users, DollarSign } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { MetricsCard } from "@/components/MetricsCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { QuickActions } from "@/components/QuickActions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricsCard
          title="Total Properties"
          value="156"
          icon={Building2}
          trend={{ value: "+12%", positive: true }}
        />
        <MetricsCard
          title="Active Listings"
          value="89"
          icon={TrendingUp}
          trend={{ value: "+5%", positive: true }}
        />
        <MetricsCard
          title="Total Leads"
          value="2,345"
          icon={Users}
          trend={{ value: "+18%", positive: true }}
        />
        <MetricsCard
          title="Revenue"
          value="$1.2M"
          icon={DollarSign}
          trend={{ value: "+8%", positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Properties Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold">Recent Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PropertyCard
              address="123 Main Street, City"
              price="$450,000"
              beds={3}
              baths={2}
              sqft={2100}
              image="/placeholder.svg"
            />
            <PropertyCard
              address="456 Oak Avenue, Town"
              price="$675,000"
              beds={4}
              baths={3}
              sqft={2800}
              image="/placeholder.svg"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <QuickActions />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Index;