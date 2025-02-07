
import { GlobalAdminMetrics } from "@/components/GlobalAdminMetrics";
import { InvoiceChart } from "@/components/InvoiceChart";
import { ProductSalesChart } from "@/components/ProductSalesChart";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { OrganizationForm } from "@/components/OrganizationForm";

const Index = () => {
  const [showOrgModal, setShowOrgModal] = useState(false);

  return (
    <main className="min-h-screen w-full bg-background p-4 lg:p-8">
      <div className="flex justify-between items-center mb-4 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => setShowOrgModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Organization
        </Button>
      </div>
      
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

      <AlertDialog open={showOrgModal} onOpenChange={setShowOrgModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Organization</AlertDialogTitle>
          </AlertDialogHeader>
          <OrganizationForm onClose={() => setShowOrgModal(false)} />
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Index;
