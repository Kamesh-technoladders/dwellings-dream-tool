
import { useQuery } from "@tanstack/react-query";
import { ViewType, MetricType, SalesData } from "./types";

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

export const useSalesData = (view: ViewType, metric: MetricType) => {
  return useQuery({
    queryKey: ['sales-data', view, metric],
    queryFn: () => fetchSalesData(view, metric),
  });
};
