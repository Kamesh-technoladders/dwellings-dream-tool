
export type OrganizationStatus = 'active' | 'inactive' | 'restricted';

export interface Organization {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  status: OrganizationStatus;
  last_status_change: string;
  status_changed_by: string | null;
  status_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrganizationAuditLog {
  id: string;
  organization_id: string;
  changed_by: string;
  old_status: string | null;
  new_status: string;
  reason: string | null;
  created_at: string;
}
