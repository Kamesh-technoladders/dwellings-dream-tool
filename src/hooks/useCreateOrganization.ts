
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { OrganizationFormData } from "@/types/organization";

export const useCreateOrganization = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: OrganizationFormData) => {
      const { data, error } = await supabase
        .from('organizations')
        .insert({
          ...formData,
          status: 'active' as const,
          updated_at: new Date().toISOString(),
          last_status_change: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      toast.success('Organization created successfully');
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Error creating organization:', error);
      toast.error('Failed to create organization');
    },
  });
};
