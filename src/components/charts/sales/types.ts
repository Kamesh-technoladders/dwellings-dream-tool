
export type ViewType = 'monthly' | 'quarterly' | 'yearly';
export type MetricType = 'revenue_cost' | 'growth' | 'top_products';

export interface SalesData {
  [key: string]: number | string;
}

export interface FilterProps {
  view: ViewType;
  setView: (view: ViewType) => void;
  metric: MetricType;
  setMetric: (metric: MetricType) => void;
}
