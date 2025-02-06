import { PropertyForm, PropertyFormData } from "@/components/PropertyForm";
import { PropertiesTable } from "@/components/PropertiesTable";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Properties = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [properties, setProperties] = useState<PropertyFormData[]>([]);

  const handleSaveProperty = (data: PropertyFormData) => {
    setProperties((prev) => [...prev, data]);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Properties</h1>
            <Button onClick={() => setIsDrawerOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>

          {properties.length > 0 ? (
            <PropertiesTable properties={properties} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              No properties added yet. Click the button above to add your first property.
            </div>
          )}

          <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Property</SheetTitle>
              </SheetHeader>
              <PropertyForm onClose={() => setIsDrawerOpen(false)} onSave={handleSaveProperty} />
            </SheetContent>
          </Sheet>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Properties;