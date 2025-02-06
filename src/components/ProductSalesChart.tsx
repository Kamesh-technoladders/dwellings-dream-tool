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
          <CardTitle className="text-base font-medium">Product Sales</CardTitle>
          <span className="text-sm text-muted-foreground">2023 Nov - 2024 Dec</span>
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="sales" fill="#1A1F2C" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cost" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};