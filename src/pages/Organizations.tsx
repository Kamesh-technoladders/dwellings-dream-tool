
import { useOrganizations } from "@/hooks/useOrganizations";
import { useOrganizationMutations } from "@/hooks/useOrganizationMutations";
import { GlobalAdminActions } from "@/components/GlobalAdminActions";
import { useState } from "react";
import { OrganizationFormData, StatusChangeData } from "@/types/organization";
import { OrganizationsTable } from "@/components/organizations/OrganizationsTable";

const Organizations = () => {
  const { organizations, isLoading } = useOrganizations();
  const { deleteOrganization, updateOrganization, updateOrganizationStatus } = useOrganizationMutations();
  const [editingOrg, setEditingOrg] = useState<{ id: string; data: OrganizationFormData } | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [organizationToDelete, setOrganizationToDelete] = useState<string | null>(null);

  const handleEdit = (org: any) => {
    setEditingOrg({
      id: org.id,
      data: {
        name: org.name,
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

  const handleStatusChange = async (id: string, data: StatusChangeData) => {
    await updateOrganizationStatus.mutateAsync({
      id,
      ...data,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <GlobalAdminActions />
      </div>
      <OrganizationsTable
        organizations={organizations || []}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        editingOrg={editingOrg}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        handleUpdate={handleUpdate}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        organizationToDelete={organizationToDelete}
        setOrganizationToDelete={setOrganizationToDelete}
        isDeleting={deleteOrganization.isPending}
      />
    </div>
  );
};

export default Organizations;
