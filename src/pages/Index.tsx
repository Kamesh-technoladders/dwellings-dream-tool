
import { GlobalAdminMetrics } from "@/components/GlobalAdminMetrics";
import { InvoiceChart } from "@/components/InvoiceChart";
import { ProductSalesChart } from "@/components/ProductSalesChart";

const Index = () => {
  return (
    <main className="min-h-screen w-full bg-background p-4 lg:p-8">
      <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-8">Dashboard</h1>
      
      {/* Metrics Section */}
      <GlobalAdminMetrics />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
        <div className="lg:col-span-4">
          <InvoiceChart />
        </div>
        <div className="lg:col-span-8">
          <ProductSalesChart />
        </div>
      </div>
    </main>
  );
};

export default Index;

