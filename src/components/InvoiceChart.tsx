import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

/**
 * Data structure for invoice statistics
 * @property {string} name - Category name (Paid, Overdue, Unpaid)
 * @property {number} value - Percentage value for the category
 * @property {string} color - HEX color code for the category
 */
const data = [
  { name: "Paid", value: 35.3, color: "#9b87f5" },
  { name: "Overdue", value: 25.7, color: "#F30CBF" },
  { name: "Unpaid", value: 39, color: "#D9D9D9" },
];

/**
 * InvoiceChart Component
 * 
 * A donut chart component that displays invoice statistics with a clean, minimal design.
 * The chart shows the distribution of invoice statuses (Paid, Overdue, Unpaid) as percentages.
 * 
 * Features:
 * - Clean donut chart visualization
 * - Color-coded segments
 * - Legend with status labels and percentages
 * - Time period selector
 * - Responsive design
 * 
 * @component
 * @example
 * ```tsx
 * <InvoiceChart />
 * ```
 */
export const InvoiceChart = () => {
  return (
    <Card className="w-[130%] border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Invoice statistics</CardTitle>
        <select className="text-xs bg-transparent border-none outline-none text-muted-foreground hover:text-[#9b87f5] cursor-pointer">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </CardHeader>
      <CardContent className="relative h-[420px]">
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
        <div className="flex justify-center gap-6 mt-4">
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