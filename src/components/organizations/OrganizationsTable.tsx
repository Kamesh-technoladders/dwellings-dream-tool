
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrganizationFormData, OrganizationStatus, StatusChangeData } from "@/types/organization";
import { useState } from "react";
import { StatusManagementDialog } from "./StatusManagementDialog";
import { TableSkeleton } from "./table/TableSkeleton";
import { OrganizationRow } from "./table/OrganizationRow";

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
            <TableSkeleton />
          ) : organizations?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">
                No organizations found
              </TableCell>
            </TableRow>
          ) : (
            organizations?.map((org) => (
              <OrganizationRow
                key={org.id}
                org={org}
                onStatusClick={handleStatusClick}
                onEdit={() => onEdit(org)}
                isEditDialogOpen={isEditDialogOpen}
                setIsEditDialogOpen={setIsEditDialogOpen}
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
                isDeleteDialogOpen={deleteDialogOpen}
                setDeleteDialogOpen={setDeleteDialogOpen}
                onDelete={() => onDelete(organizationToDelete || "")}
                isDeleting={isDeleting}
              />
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
