
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteOrganizationDialog } from "./DeleteOrganizationDialog";
import { EditOrganizationDialog } from "./EditOrganizationDialog";
import { StatusManagementDialog } from "./StatusManagementDialog";
import { StatusBadge } from "./StatusBadge";
import { OrganizationFormData, OrganizationStatus, StatusChangeData } from "@/types/organization";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface OrganizationsTableProps {
  organizations: any[];
  isLoading: boolean;
  onEdit: (org: any) => void;
  onDelete: (id: string) => void;
  onStatusChange?: (id: string, data: StatusChangeData) => Promise<void>;
  editingOrg: { id: string; data: OrganizationFormData } | null;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  handleUpdate: (formData: OrganizationFormData) => void;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  organizationToDelete: string | null;
  setOrganizationToDelete: (id: string | null) => void;
  isDeleting: boolean;
}

export const OrganizationsTable = ({
  organizations,
  isLoading,
  onEdit,
  onDelete,
  onStatusChange,
  editingOrg,
  isEditDialogOpen,
  setIsEditDialogOpen,
  handleUpdate,
  deleteDialogOpen,
  setDeleteDialogOpen,
  organizationToDelete,
  setOrganizationToDelete,
  isDeleting,
}: OrganizationsTableProps) => {
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<{ id: string; name: string; status: OrganizationStatus } | null>(null);

  const handleStatusClick = (org: any) => {
    setSelectedOrg({
      id: org.id,
      name: org.name,
      status: org.status as OrganizationStatus,
    });
    setStatusDialogOpen(true);
  };

  const handleStatusChange = async (data: StatusChangeData) => {
    if (selectedOrg && onStatusChange) {
      await onStatusChange(selectedOrg.id, data);
      setStatusDialogOpen(false);
      setSelectedOrg(null);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 9 }).map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : organizations?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">
                No organizations found
              </TableCell>
            </TableRow>
          ) : (
            organizations?.map((org) => (
              <TableRow key={org.id}>
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
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleStatusClick(org)}
                    >
                      <Shield className="h-4 w-4" />
                    </Button>

                    <EditOrganizationDialog
                      isOpen={isEditDialogOpen}
                      onOpenChange={setIsEditDialogOpen}
                      onUpdate={handleUpdate}
                      initialData={editingOrg?.data || {
                        name: "",
                        email: "",
                        phone: "",
                        address_line1: "",
                        address_line2: "",
                        city: "",
                        district: "",
                        state: "",
                        pincode: "",
                        subscription_status: "inactive",
                        subscription_type: undefined,
                        subscription_start_date: undefined,
                        subscription_end_date: undefined,
                      }}
                      onEdit={() => onEdit(org)}
                    />

                    <DeleteOrganizationDialog
                      isOpen={deleteDialogOpen}
                      onOpenChange={setDeleteDialogOpen}
                      onDelete={() => onDelete(organizationToDelete || "")}
                      isDeleting={isDeleting}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {selectedOrg && (
        <StatusManagementDialog
          isOpen={statusDialogOpen}
          onClose={() => {
            setStatusDialogOpen(false);
            setSelectedOrg(null);
          }}
          onStatusChange={handleStatusChange}
          currentStatus={selectedOrg.status}
          organizationName={selectedOrg.name}
        />
      )}
    </div>
  );
};
