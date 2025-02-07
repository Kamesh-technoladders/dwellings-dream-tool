
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
import { OrganizationFormData } from "@/types/organization";
import { Badge } from "@/components/ui/badge";

interface OrganizationsTableProps {
  organizations: any[];
  isLoading: boolean;
  onEdit: (org: any) => void;
  onDelete: (id: string) => void;
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
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'trial':
        return 'bg-blue-500';
      case 'expired':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
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
            <TableHead>Subscription</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 8 }).map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : organizations?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
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
                  <div className="flex flex-col gap-1">
                    <Badge className={getStatusColor(org.subscription_status)}>
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
    </div>
  );
};

