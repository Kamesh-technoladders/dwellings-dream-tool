import { TrendingUp, Users, DollarSign } from "lucide-react";
import { MetricsCard } from "@/components/MetricsCard";
import { QuickActions } from "@/components/QuickActions";
import { InvoiceChart } from "@/components/InvoiceChart";
import { ProductSalesChart } from "@/components/ProductSalesChart";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Index = () => {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-background p-8">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          
          {/* Top Section: Metrics + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
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
            <QuickActions />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-10 gap-8">
            <div className="col-span-3">
              <InvoiceChart />
            </div>
            <div className="col-span-7">
              <ProductSalesChart />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;