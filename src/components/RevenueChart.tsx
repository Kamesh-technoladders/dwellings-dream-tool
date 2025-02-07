
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface RevenueData {
  date: string;
  revenue: number;
}

interface RevenueChartProps {
  startDate?: Date;
  endDate?: Date;
}

export const RevenueChart = ({ startDate, endDate }: RevenueChartProps) => {
  const { data: revenueData, isLoading } = useQuery({
    queryKey: ["revenue-data", startDate, endDate],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Get user's organization
      const { data: orgUser } = await supabase
        .from("organization_users")
        .select("organization_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!orgUser) throw new Error("No organization found");

      const query = supabase
        .from("sales_transactions")
        .select("amount, transaction_date")
        .eq("organization_id", orgUser.organization_id)
        .order("transaction_date");

      if (startDate) {
        query.gte("transaction_date", startDate.toISOString());
      }
      if (endDate) {
        query.lte("transaction_date", endDate.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;

      // Aggregate data by date
      const aggregatedData = data.reduce((acc: Record<string, number>, curr) => {
        const date = new Date(curr.transaction_date).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + Number(curr.amount);
        return acc;
      }, {});

      return Object.entries(aggregatedData).map(([date, revenue]) => ({
        date,
        revenue,
      }));
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="h-32 w-32 animate-pulse rounded-full bg-gray-200" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#9b87f5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
