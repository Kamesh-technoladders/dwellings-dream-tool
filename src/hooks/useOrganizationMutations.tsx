
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { OrganizationFormData, StatusChangeData } from "@/types/organization";

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

  const updateOrganizationStatus = useMutation({
    mutationFn: async ({ id, status, reason }: { id: string } & StatusChangeData) => {
      const { data: oldStatus } = await supabase
        .from('organizations')
        .select('status')
        .eq('id', id)
        .single();

      const { error: updateError } = await supabase
        .from('organizations')
        .update({
          status,
          status_reason: reason,
          last_status_change: new Date().toISOString(),
        })
        .eq('id', id);

      if (updateError) throw updateError;

      // Log the status change in audit logs
      const { error: auditError } = await supabase
        .from('organization_audit_logs')
        .insert({
          organization_id: id,
          changed_by: (await supabase.auth.getUser()).data.user?.id,
          old_status: oldStatus?.status,
          new_status: status,
          reason,
        });

      if (auditError) throw auditError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      toast.success('Organization status updated successfully');
    },
    onError: (error) => {
      console.error('Error updating organization status:', error);
      toast.error('Failed to update organization status');
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
    updateOrganizationStatus,
  };
};
