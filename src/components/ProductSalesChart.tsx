import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const data = [
  { month: "Jan", sales: 4000, cost: 2400 },
  { month: "Feb", sales: 3000, cost: 1398 },
  { month: "Mar", sales: 2000, cost: 9800 },
  { month: "Apr", sales: 2780, cost: 3908 },
  { month: "May", sales: 1890, cost: 4800 },
  { month: "Jun", sales: 2390, cost: 3800 },
];

export const ProductSalesChart = () => {
  return (
    <Card className="w-full border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle className="text-sm font-medium">Product Sales</CardTitle>
          <span className="text-xs text-muted-foreground">2023 Nov - 2024 Dec</span>
        </div>
        <Button 
          variant="outline" 
          size="icon"
          className="h-8 w-8 hover:text-[#9b87f5] hover:border-[#9b87f5]"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            className="[&_.recharts-cartesian-grid-horizontal_line]:stroke-gray-100 [&_.recharts-cartesian-grid-vertical_line]:stroke-gray-100"
          >
            <XAxis 
              dataKey="month" 
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
            <Bar dataKey="sales" fill="#9b87f5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cost" fill="#D9D9D9" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};