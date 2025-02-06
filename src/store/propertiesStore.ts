import { create } from 'zustand';
import { PropertyFormData } from '@/components/PropertyForm';

interface PropertiesStore {
  properties: PropertyFormData[];
  addProperty: (property: PropertyFormData) => void;
}

export const usePropertiesStore = create<PropertiesStore>((set) => ({
  properties: [],
  addProperty: (property) => 
    set((state) => ({ 
      properties: [...state.properties, property] 
    })),
}));