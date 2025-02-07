
export interface OrganizationFormData {
  name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  subscription_status?: 'active' | 'inactive' | 'trial' | 'expired';
  subscription_type?: 'basic' | 'premium' | 'enterprise';
  subscription_start_date?: string;
  subscription_end_date?: string;
}

export type OrganizationStatus = 'active' | 'inactive' | 'restricted';

export interface StatusChangeData {
  status: OrganizationStatus;
  reason: string;
}
