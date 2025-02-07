
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { StatusBadge } from "../StatusBadge";
import { OrganizationStatus } from "@/types/organization";

interface OrganizationRowProps {
  org: any;
  onStatusClick: (org: any) => void;
  onEdit: () => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  onUpdate: (formData: any) => void;
  initialData: any;
  isDeleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export const OrganizationRow = ({
  org,
  onStatusClick,
  onEdit,
  isEditDialogOpen,
  setIsEditDialogOpen,
  onUpdate,
  initialData,
  isDeleteDialogOpen,
  setDeleteDialogOpen,
  onDelete,
  isDeleting,
}: OrganizationRowProps) => {
  return (
    <TableRow>
      <TableCell>{org.name}</TableCell>
      <TableCell>{org.email}</TableCell>
      <TableCell>{org.phone}</TableCell>
      <TableCell>{org.address_line1}</TableCell>
      <TableCell>{org.city}</TableCell>
      <TableCell>{org.district}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <StatusBadge status={org.status as OrganizationStatus} />
          {org.status !== 'active' && org.status_reason && (
            <Tooltip>
              <TooltipTrigger>
                <Shield className="h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-[200px] text-sm">
                  {org.status_reason}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <Badge className={org.subscription_status === 'active' ? "bg-green-500" : "bg-gray-500"}>
            {org.subscription_status}
          </Badge>
          {org.subscription_type && (
            <span className="text-xs text-gray-600">
              {org.subscription_type}
            </span>
          )}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <TableActions
          org={org}
          onStatusClick={onStatusClick}
          onEdit={onEdit}
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
          onUpdate={onUpdate}
          initialData={initialData}
          isDeleteDialogOpen={isDeleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      </TableCell>
    </TableRow>
  );
};
