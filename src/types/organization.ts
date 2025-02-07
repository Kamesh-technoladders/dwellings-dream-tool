
export const organizationTypes = [
  "Commercial Buildings",
  "Apartments",
  "Villas",
  "Plots",
  "Coworking Spaces",
] as const;

export type OrganizationType = typeof organizationTypes[number];

export interface OrganizationFormData {
  name: string;
  organization_type: OrganizationType;
  email: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
}
