
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Organization = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  status: 'active' | 'inactive' | 'restricted';
  created_at: string;
  updated_at: string | null;
  last_status_change: string | null;
  status_changed_by: string | null;
  status_reason: string | null;
};

export const useOrganizations = () => {
  const queryClient = useQueryClient();

  const { data: organizations, isLoading: isLoadingOrganizations } = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Organization[];
    },
  });

  const { data: metrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['organization_metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('organization_metrics')
        .select('*');

      if (error) throw error;
      return data;
    },
  });

  const { data: salesData, isLoading: isLoadingSales } = useQuery({
    queryKey: ['sales_transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales_transactions')
        .select('*');

      if (error) throw error;
      return data;
    },
  });

  const createOrganization = useMutation({
    mutationFn: async (newOrg: Omit<Organization, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('organizations')
        .insert(newOrg)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      toast.success('Organization created successfully');
    },
    onError: (error) => {
      console.error('Error creating organization:', error);
      toast.error('Failed to create organization');
    },
  });

  const updateOrganization = useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Organization> & { id: string }) => {
      const { data, error } = await supabase
        .from('organizations')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
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

      if (error) throw error;
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

  const calculateTotalRevenue = () => {
    if (!salesData) return 0;
    return salesData.reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  };

  const calculateActiveUsers = () => {
    if (!metrics) return 0;
    return metrics.reduce((sum, metric) => sum + (metric.total_users || 0), 0);
  };

  return {
    organizations,
    isLoading: isLoadingOrganizations || isLoadingMetrics || isLoadingSales,
    createOrganization,
    updateOrganization,
    deleteOrganization,
    totalRevenue: calculateTotalRevenue(),
    activeUsers: calculateActiveUsers(),
    totalOrganizations: organizations?.length || 0,
  };
};
