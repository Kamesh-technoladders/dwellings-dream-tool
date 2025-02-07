
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ViewType, MetricType } from "./charts/sales/types";
import { ChartFilter } from "./charts/sales/ChartFilter";
import { useSalesData } from "./charts/sales/useSalesData";
import { SalesBarChart } from "./charts/sales/SalesBarChart";

export const ProductSalesChart = () => {
  const [view, setView] = useState<ViewType>('monthly');
  const [metric, setMetric] = useState<MetricType>('revenue_cost');

  const { data = [] } = useSalesData(view, metric);

  return (
    <Card className="w-full border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle className="text-sm font-medium">Product Sales</CardTitle>
          <span className="text-xs text-muted-foreground">2023 Nov - 2024 Dec</span>
        </div>
        <ChartFilter 
          view={view}
          setView={setView}
          metric={metric}
          setMetric={setMetric}
        />
      </CardHeader>
      <CardContent className="h-[300px]">
        <SalesBarChart data={data} view={view} metric={metric} />
      </CardContent>
    </Card>
  );
};
