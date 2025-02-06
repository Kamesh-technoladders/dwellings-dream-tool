import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PropertyFormData } from '@/components/PropertyForm';

interface PropertiesState {
  properties: PropertyFormData[];
  isLoading: boolean;
  error: string | null;
  fetchProperties: () => Promise<void>;
  addProperty: (property: PropertyFormData) => Promise<void>;
  updateProperty: (id: string, property: PropertyFormData) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
}

export const usePropertiesStore = create<PropertiesState>((set) => ({
  properties: [],
  isLoading: false,
  error: null,

  fetchProperties: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ properties: data || [] });
    } catch (error) {
      set({ error: (error as Error).message });
      toast.error('Failed to fetch properties');
    } finally {
      set({ isLoading: false });
    }
  },

  addProperty: async (property) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([property])
        .select()
        .single();

      if (error) throw error;
      set((state) => ({
        properties: [data, ...state.properties],
      }));
      toast.success('Property added successfully');
    } catch (error) {
      set({ error: (error as Error).message });
      toast.error('Failed to add property');
    } finally {
      set({ isLoading: false });
    }
  },

  updateProperty: async (id, property) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('properties')
        .update(property)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      set((state) => ({
        properties: state.properties.map((p) =>
          p.id === id ? { ...data } : p
        ),
      }));
      toast.success('Property updated successfully');
    } catch (error) {
      set({ error: (error as Error).message });
      toast.error('Failed to update property');
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProperty: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      set((state) => ({
        properties: state.properties.filter((p) => p.id !== id),
      }));
      toast.success('Property deleted successfully');
    } catch (error) {
      set({ error: (error as Error).message });
      toast.error('Failed to delete property');
    } finally {
      set({ isLoading: false });
    }
  },
}));