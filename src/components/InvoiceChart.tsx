import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type TimeRange = 'last_7_days' | 'last_30_days' | 'last_quarter' | 'last_year' | 'ytd';

// Simulated data fetching function
const fetchInvoiceData = async (timeRange: TimeRange) => {
  // In a real app, this would be an API call
  const mockData = {
    'last_7_days': [
      { name: "Paid", value: 35.3, color: "#9b87f5" },
      { name: "Overdue", value: 25.7, color: "#F30CBF" },
      { name: "Unpaid", value: 39, color: "#D9D9D9" },
    ],
    'last_30_days': [
      { name: "Paid", value: 45.3, color: "#9b87f5" },
      { name: "Overdue", value: 15.7, color: "#F30CBF" },
      { name: "Unpaid", value: 39, color: "#D9D9D9" },
    ],
    'last_quarter': [
      { name: "Paid", value: 55.3, color: "#9b87f5" },
      { name: "Overdue", value: 20.7, color: "#F30CBF" },
      { name: "Unpaid", value: 24, color: "#D9D9D9" },
    ],
    'last_year': [
      { name: "Paid", value: 60.3, color: "#9b87f5" },
      { name: "Overdue", value: 10.7, color: "#F30CBF" },
      { name: "Unpaid", value: 29, color: "#D9D9D9" },
    ],
    'ytd': [
      { name: "Paid", value: 48.3, color: "#9b87f5" },
      { name: "Overdue", value: 22.7, color: "#F30CBF" },
      { name: "Unpaid", value: 29, color: "#D9D9D9" },
    ],
  };
  
  return mockData[timeRange];
};

export const InvoiceChart = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('last_7_days');

  const { data = [], isLoading } = useQuery({
    queryKey: ['invoice-stats', timeRange],
    queryFn: () => fetchInvoiceData(timeRange),
  });

  return (
    <Card className="w-full border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Invoice statistics</CardTitle>
        <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
          <SelectTrigger className="w-[140px] h-8 text-xs bg-white hover:bg-primary hover:text-white transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white w-[140px]">
            <SelectItem value="last_7_days" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Last 7 days</SelectItem>
            <SelectItem value="last_30_days" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Last 30 days</SelectItem>
            <SelectItem value="last_quarter" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Last Quarter</SelectItem>
            <SelectItem value="last_year" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Last Year</SelectItem>
            <SelectItem value="ytd" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Year to Date</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="relative h-[300px]">
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              cornerRadius={6}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">
                {item.name} ({item.value}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};