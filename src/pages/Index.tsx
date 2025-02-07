import { SidebarProvider } from "@/components/ui/sidebar";
import { GlobalAdminSidebar } from "@/components/GlobalAdminSidebar";
import { GlobalAdminMetrics } from "@/components/GlobalAdminMetrics";
import { GlobalAdminActions } from "@/components/GlobalAdminActions";
import { InvoiceChart } from "@/components/InvoiceChart";
import { ProductSalesChart } from "@/components/ProductSalesChart";

const Index = () => {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <GlobalAdminSidebar />
        <main className="flex-1 bg-background p-8">
          <h1 className="text-3xl font-bold mb-8">Global Admin Dashboard</h1>
          
          {/* Metrics Section */}
          <GlobalAdminMetrics />

          {/* Actions + Charts Section */}
          <div className="grid grid-cols-10 gap-8">
            <div className="col-span-3">
              <GlobalAdminActions />
              <div className="mt-8">
                <InvoiceChart />
              </div>
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