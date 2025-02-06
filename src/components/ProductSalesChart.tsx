import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type ViewType = 'monthly' | 'quarterly' | 'yearly';
type MetricType = 'revenue_cost' | 'growth' | 'top_products';

// Simulated data fetching function
const fetchSalesData = async (view: ViewType, metric: MetricType) => {
  // In a real app, this would be an API call
  const mockData = {
    monthly: {
      revenue_cost: [
        { month: "Jan", sales: 4000, cost: 2400 },
        { month: "Feb", sales: 3000, cost: 1398 },
        { month: "Mar", sales: 2000, cost: 9800 },
        { month: "Apr", sales: 2780, cost: 3908 },
        { month: "May", sales: 1890, cost: 4800 },
        { month: "Jun", sales: 2390, cost: 3800 },
      ],
      growth: [
        { month: "Jan", growth: 15 },
        { month: "Feb", growth: 25 },
        { month: "Mar", growth: 18 },
        { month: "Apr", growth: 22 },
        { month: "May", growth: 28 },
        { month: "Jun", growth: 32 },
      ],
      top_products: [
        { month: "Jan", product_a: 2400, product_b: 1398 },
        { month: "Feb", product_a: 1398, product_b: 2400 },
        { month: "Mar", product_a: 9800, product_b: 2400 },
        { month: "Apr", product_a: 3908, product_b: 2780 },
        { month: "May", product_a: 4800, product_b: 1890 },
        { month: "Jun", product_a: 3800, product_b: 2390 },
      ],
    },
    quarterly: {
      revenue_cost: [
        { quarter: "Q1", sales: 9000, cost: 5000 },
        { quarter: "Q2", sales: 7060, cost: 4200 },
        { quarter: "Q3", sales: 8500, cost: 4800 },
        { quarter: "Q4", sales: 11200, cost: 6300 },
      ],
      growth: [
        { quarter: "Q1", growth: 20 },
        { quarter: "Q2", growth: 25 },
        { quarter: "Q3", growth: 30 },
        { quarter: "Q4", growth: 35 },
      ],
      top_products: [
        { quarter: "Q1", product_a: 5000, product_b: 4000 },
        { quarter: "Q2", product_a: 4200, product_b: 2860 },
        { quarter: "Q3", product_a: 4800, product_b: 3700 },
        { quarter: "Q4", product_a: 6300, product_b: 4900 },
      ],
    },
    yearly: {
      revenue_cost: [
        { year: "2020", sales: 35000, cost: 20000 },
        { year: "2021", sales: 42000, cost: 25000 },
        { year: "2022", sales: 48000, cost: 28000 },
        { year: "2023", sales: 55000, cost: 32000 },
      ],
      growth: [
        { year: "2020", growth: 15 },
        { year: "2021", growth: 20 },
        { year: "2022", growth: 25 },
        { year: "2023", growth: 30 },
      ],
      top_products: [
        { year: "2020", product_a: 20000, product_b: 15000 },
        { year: "2021", product_a: 25000, product_b: 17000 },
        { year: "2022", product_a: 28000, product_b: 20000 },
        { year: "2023", product_a: 32000, product_b: 23000 },
      ],
    },
  };

  return mockData[view][metric];
};

export const ProductSalesChart = () => {
  const [view, setView] = useState<ViewType>('monthly');
  const [metric, setMetric] = useState<MetricType>('revenue_cost');

  const { data = [] } = useQuery({
    queryKey: ['sales-data', view, metric],
    queryFn: () => fetchSalesData(view, metric),
  });

  const getChartBars = () => {
    switch (metric) {
      case 'revenue_cost':
        return (
          <>
            <Bar dataKey="sales" fill="#9b87f5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cost" fill="#D9D9D9" radius={[4, 4, 0, 0]} />
          </>
        );
      case 'growth':
        return <Bar dataKey="growth" fill="#9b87f5" radius={[4, 4, 0, 0]} />;
      case 'top_products':
        return (
          <>
            <Bar dataKey="product_a" fill="#9b87f5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="product_b" fill="#D9D9D9" radius={[4, 4, 0, 0]} />
          </>
        );
      default:
        return null;
    }
  };

  const getXAxisKey = () => {
    switch (view) {
      case 'monthly':
        return 'month';
      case 'quarterly':
        return 'quarter';
      case 'yearly':
        return 'year';
      default:
        return 'month';
    }
  };

  return (
    <Card className="w-full border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle className="text-sm font-medium">Product Sales</CardTitle>
          <span className="text-xs text-muted-foreground">2023 Nov - 2024 Dec</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              className="h-8 w-8 hover:text-primary hover:border-primary bg-white"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white w-48">
            <DropdownMenuLabel className="py-1 text-sm">View</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={view} onValueChange={(v: ViewType) => setView(v)}>
              <DropdownMenuRadioItem value="monthly" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Monthly</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="quarterly" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Quarterly</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="yearly" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Yearly</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="py-1 text-sm">Metric</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={metric} onValueChange={(v: MetricType) => setMetric(v)}>
              <DropdownMenuRadioItem value="revenue_cost" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Revenue vs Cost</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="growth" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Growth Trend</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="top_products" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Top Products</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            className="[&_.recharts-cartesian-grid-horizontal_line]:stroke-gray-100 [&_.recharts-cartesian-grid-vertical_line]:stroke-gray-100"
          >
            <XAxis 
              dataKey={getXAxisKey()} 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            {getChartBars()}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};