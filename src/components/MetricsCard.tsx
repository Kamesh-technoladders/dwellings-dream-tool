
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export const MetricsCard = ({ title, value, icon: Icon, trend }: MetricsCardProps) => {
  const formattedValue = typeof value === 'number' && !Number.isInteger(value) 
    ? value.toLocaleString('en-US', { maximumFractionDigits: 2 })
    : value;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
        {trend && (
          <p className={`text-xs ${trend.positive ? "text-green-600" : "text-red-600"}`}>
            {trend.value} from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};
