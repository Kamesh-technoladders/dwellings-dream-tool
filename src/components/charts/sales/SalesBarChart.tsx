
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ViewType, MetricType } from "./types";

interface SalesBarChartProps {
  data: any[];
  view: ViewType;
  metric: MetricType;
}

export const SalesBarChart = ({ data, view, metric }: SalesBarChartProps) => {
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
  );
};
