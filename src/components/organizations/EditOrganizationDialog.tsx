
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { OrganizationForm } from "@/components/OrganizationForm";
import { OrganizationFormData } from "@/types/organization";

interface EditOrganizationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (data: OrganizationFormData) => void;
  initialData: OrganizationFormData;
  onEdit: () => void;
}

export const EditOrganizationDialog = ({
  isOpen,
  onOpenChange,
  onUpdate,
  initialData,
  onEdit,
}: EditOrganizationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit organization</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <OrganizationForm
          onClose={() => onOpenChange(false)}
          initialData={initialData}
          onSubmit={onUpdate}
          mode="edit"
        />
      </DialogContent>
    </Dialog>
  );
};
