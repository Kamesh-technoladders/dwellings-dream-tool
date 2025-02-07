
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
    <div>
      <PropertiesTable properties={properties} />
    </div>
  );
}
