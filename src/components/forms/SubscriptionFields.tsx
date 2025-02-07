
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { OrganizationFormData } from "@/types/organization";

interface SubscriptionFieldsProps {
  form: UseFormReturn<OrganizationFormData>;
}

export const SubscriptionFields = ({ form }: SubscriptionFieldsProps) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="subscription_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Subscription Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  <SelectItem value="active" className="hover:bg-primary hover:text-white">Active</SelectItem>
                  <SelectItem value="inactive" className="hover:bg-primary hover:text-white">Inactive</SelectItem>
                  <SelectItem value="trial" className="hover:bg-primary hover:text-white">Trial</SelectItem>
                  <SelectItem value="expired" className="hover:bg-primary hover:text-white">Expired</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subscription_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Subscription Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  <SelectItem value="basic" className="hover:bg-primary hover:text-white">Basic</SelectItem>
                  <SelectItem value="premium" className="hover:bg-primary hover:text-white">Premium</SelectItem>
                  <SelectItem value="enterprise" className="hover:bg-primary hover:text-white">Enterprise</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="subscription_start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Start Date</FormLabel>
              <FormControl>
                <Input type="date" className="h-8" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subscription_end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">End Date</FormLabel>
              <FormControl>
                <Input type="date" className="h-8" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
