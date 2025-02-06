import { useEffect } from "react";
import { PropertiesTable } from "@/components/PropertiesTable";
import { usePropertiesStore } from "@/store/propertiesStore";

export default function Properties() {
  const { properties, isLoading, error, fetchProperties } = usePropertiesStore();

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Properties</h1>
      <PropertiesTable properties={properties} />
    </div>
  );
}