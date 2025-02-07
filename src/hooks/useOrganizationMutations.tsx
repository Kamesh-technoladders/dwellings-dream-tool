
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { OrganizationFormData } from "@/types/organization";

export const useOrganizationMutations = () => {
  const queryClient = useQueryClient();

  const updateOrganization = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: OrganizationFormData }) => {
      const { data: updatedOrg, error } = await supabase
        .from('organizations')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return updatedOrg;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      toast.success('Organization updated successfully');
    },
    onError: (error) => {
      console.error('Error updating organization:', error);
      toast.error('Failed to update organization');
    },
  });

  const deleteOrganization = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('organizations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      toast.success('Organization deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting organization:', error);
      toast.error('Failed to delete organization');
    },
  });

  return {
    updateOrganization,
    deleteOrganization,
  };
};
