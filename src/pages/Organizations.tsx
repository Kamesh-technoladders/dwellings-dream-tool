
import { useOrganizations } from "@/hooks/useOrganizations";
import { useOrganizationMutations } from "@/hooks/useOrganizationMutations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { GlobalAdminActions } from "@/components/GlobalAdminActions";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { OrganizationForm } from "@/components/OrganizationForm";
import { OrganizationFormData } from "@/types/organization";

const Organizations = () => {
  const { organizations, isLoading } = useOrganizations();
  const { deleteOrganization, updateOrganization } = useOrganizationMutations();
  const [editingOrg, setEditingOrg] = useState<{ id: string; data: OrganizationFormData } | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [organizationToDelete, setOrganizationToDelete] = useState<string | null>(null);

  const handleEdit = (org: any) => {
    setEditingOrg({
      id: org.id,
      data: {
        name: org.name,
        organization_type: org.organization_type,
        email: org.email,
        phone: org.phone,
        address_line1: org.address_line1,
        address_line2: org.address_line2 || "",
        city: org.city,
        district: org.district,
        state: org.state,
        pincode: org.pincode,
      },
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setOrganizationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!organizationToDelete) return;
    
    try {
      await deleteOrganization.mutateAsync(organizationToDelete);
      setDeleteDialogOpen(false);
      setOrganizationToDelete(null);
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  const handleUpdate = async (formData: OrganizationFormData) => {
    if (!editingOrg) return;
    await updateOrganization.mutateAsync({
      id: editingOrg.id,
      data: formData,
    });
    setIsEditDialogOpen(false);
    setEditingOrg(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <GlobalAdminActions />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead>District</TableHead>
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
                  <TableCell>{org.organization_type}</TableCell>
                  <TableCell>{org.email}</TableCell>
                  <TableCell>{org.phone}</TableCell>
                  <TableCell>{org.address_line1}</TableCell>
                  <TableCell>{org.city}</TableCell>
                  <TableCell>{org.district}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogTrigger asChild>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleEdit(org)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit organization</TooltipContent>
                          </Tooltip>
                        </DialogTrigger>
                        <DialogContent>
                          {editingOrg && (
                            <OrganizationForm
                              onClose={() => setIsEditDialogOpen(false)}
                              initialData={editingOrg.data}
                              onSubmit={handleUpdate}
                              mode="edit"
                            />
                          )}
                        </DialogContent>
                      </Dialog>

                      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                        <AlertDialogTrigger asChild>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
                                onClick={() => handleDeleteClick(org.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete organization</TooltipContent>
                          </Tooltip>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Organization</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this organization? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDelete}
                              className="bg-red-600 hover:bg-red-700"
                              disabled={deleteOrganization.isPending}
                            >
                              {deleteOrganization.isPending ? 'Deleting...' : 'Delete'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Organizations;
