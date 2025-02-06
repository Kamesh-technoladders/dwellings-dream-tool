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

const mapToDbFormat = (property: PropertyFormData) => ({
  property_name: property.propertyName,
  property_type: property.propertyType,
  number_of_units: property.numberOfUnits,
  address_line: property.addressLine,
  district: property.district,
  state: property.state,
  country: property.country,
  pincode: property.pincode,
  user_id: supabase.auth.getUser().then(({ data }) => data.user?.id), // Set user_id from authenticated user
});

const mapFromDbFormat = (dbProperty: any): PropertyFormData => ({
  id: dbProperty.id,
  propertyName: dbProperty.property_name,
  propertyType: dbProperty.property_type,
  numberOfUnits: dbProperty.number_of_units,
  addressLine: dbProperty.address_line,
  district: dbProperty.district,
  state: dbProperty.state,
  country: dbProperty.country,
  pincode: dbProperty.pincode,
});

export const usePropertiesStore = create<PropertiesState>((set) => ({
  properties: [],
  isLoading: false,
  error: null,

  fetchProperties: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('user_id', session.session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ properties: data.map(mapFromDbFormat) || [] });
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
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('properties')
        .insert([{ ...mapToDbFormat(property), user_id: session.session.user.id }])
        .select()
        .single();

      if (error) throw error;
      set((state) => ({
        properties: [mapFromDbFormat(data), ...state.properties],
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
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('properties')
        .update({ ...mapToDbFormat(property), user_id: session.session.user.id })
        .eq('id', id)
        .eq('user_id', session.session.user.id)
        .select()
        .single();

      if (error) throw error;
      set((state) => ({
        properties: state.properties.map((p) =>
          p.id === id ? mapFromDbFormat(data) : p
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
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)
        .eq('user_id', session.session.user.id);

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