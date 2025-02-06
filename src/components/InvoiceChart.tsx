import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Paid", value: 35.3, color: "#1A1F2C" },
  { name: "Overdue", value: 25.7, color: "#E2E8F0" },
  { name: "Unpaid", value: 39, color: "#F8FAFC" },
];

export const InvoiceChart = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Invoice statistics</CardTitle>
        <select className="text-sm bg-transparent border-none outline-none text-muted-foreground">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </CardHeader>
      <CardContent className="relative h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold">1.25</span>
          <span className="text-sm text-muted-foreground">Invoice</span>
        </div>
        <div className="mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};