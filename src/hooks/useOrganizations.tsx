
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useOrganizations = () => {
  const { data: metrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['organization_metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('organization_metrics')
        .select('*')
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: organizations, isLoading: isLoadingOrganizations } = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('organizations')
        .select('*');

      if (error) throw error;
      return data;
    },
  });

  return {
    totalOrganizations: organizations?.length || 0,
    activeUsers: metrics?.total_users || 0,
    totalRevenue: metrics?.total_revenue || 0,
    isLoading: isLoadingMetrics || isLoadingOrganizations
  };
};
