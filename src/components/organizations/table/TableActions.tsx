
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { EditOrganizationDialog } from "../EditOrganizationDialog";
import { DeleteOrganizationDialog } from "../DeleteOrganizationDialog";

interface TableActionsProps {
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

export const TableActions = ({
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
}: TableActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => onStatusClick(org)}
      >
        <Shield className="h-4 w-4" />
      </Button>

      <EditOrganizationDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdate={onUpdate}
        initialData={initialData}
        onEdit={onEdit}
      />

      <DeleteOrganizationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDelete={onDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};
