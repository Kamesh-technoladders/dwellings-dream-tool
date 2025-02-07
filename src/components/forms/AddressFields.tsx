
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { OrganizationFormData } from "@/types/organization";

interface AddressFieldsProps {
  form: UseFormReturn<OrganizationFormData>;
}

export const AddressFields = ({ form }: AddressFieldsProps) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3">
        <FormField
          control={form.control}
          name="address_line1"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Address Line 1</FormLabel>
              <FormControl>
                <Input className="h-8" placeholder="Enter address line 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address_line2"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Address Line 2 (Optional)</FormLabel>
              <FormControl>
                <Input className="h-8" placeholder="Enter address line 2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">City</FormLabel>
              <FormControl>
                <Input className="h-8" placeholder="Enter city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">District</FormLabel>
              <FormControl>
                <Input className="h-8" placeholder="Enter district" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">State</FormLabel>
              <FormControl>
                <Input className="h-8" placeholder="Enter state" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Pincode</FormLabel>
              <FormControl>
                <Input className="h-8" placeholder="Enter pincode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
