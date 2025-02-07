
import * as z from "zod";

export const organizationFormSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(
    /^\+[1-9]\d{1,3}[0-9]{10,14}$/,
    "Invalid phone number format. Include country code (+) and 10-15 digits"
  ),
  address_line1: z.string().min(1, "Address line 1 is required"),
  address_line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(1, "Pincode is required"),
  subscription_status: z.enum(['active', 'inactive', 'trial', 'expired']).optional(),
  subscription_type: z.enum(['basic', 'premium', 'enterprise']).optional(),
  subscription_start_date: z.string().optional(),
  subscription_end_date: z.string().optional(),
});

