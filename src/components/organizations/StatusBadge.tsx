
import { Badge } from "@/components/ui/badge";
import { OrganizationStatus } from "@/types/organization";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: OrganizationStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = (status: OrganizationStatus) => {
    switch (status) {
      case "active":
        return "bg-green-500 hover:bg-green-600";
      case "restricted":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "inactive":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <Badge className={cn(getStatusColor(status), "capitalize")}>
      {status}
    </Badge>
  );
}
