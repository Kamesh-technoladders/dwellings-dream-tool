
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterProps } from "./types";

export const ChartFilter = ({ view, setView, metric, setMetric }: FilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="h-8 w-8 hover:text-primary hover:border-primary bg-white"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-48">
        <DropdownMenuLabel className="py-1 text-sm">View</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={view} onValueChange={setView}>
          <DropdownMenuRadioItem value="monthly" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Monthly</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="quarterly" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Quarterly</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="yearly" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Yearly</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="py-1 text-sm">Metric</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={metric} onValueChange={setMetric}>
          <DropdownMenuRadioItem value="revenue_cost" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Revenue vs Cost</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="growth" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Growth Trend</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="top_products" className="py-1 text-sm hover:bg-primary hover:text-white transition-colors">Top Products</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
