import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const propertyTypes = [
  "Commercial Building",
  "Apartment",
  "Villa",
  "Plots",
  "Co-Working",
] as const;

const formSchema = z.object({
  id: z.string().optional(),
  propertyName: z.string().min(1, "Property name is required"),
  propertyType: z.enum(propertyTypes, {
    required_error: "Please select a property type",
  }),
  numberOfUnits: z.number().min(1, "Number of units must be at least 1"),
  addressLine: z.string().min(1, "Address is required"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z.string().min(1, "Pincode is required"),
});

export type PropertyFormData = z.infer<typeof formSchema>;

interface PropertyFormProps {
  onClose: () => void;
  onSave: (data: PropertyFormData) => void;
  initialData?: PropertyFormData;
}

export function PropertyForm({ onClose, onSave, initialData }: PropertyFormProps) {
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      propertyName: "",
      propertyType: "Commercial Building",
      numberOfUnits: 1,
      addressLine: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  function onSubmit(values: PropertyFormData) {
    onSave(values);
    toast.success(`Property ${initialData ? 'updated' : 'saved'} successfully!`);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        <FormField
          control={form.control}
          name="propertyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter property name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border shadow-lg z-50">
                  {propertyTypes.map((type) => (
                    <SelectItem 
                      key={type} 
                      value={type}
                      className="hover:bg-primary hover:text-white transition-colors"
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfUnits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Units</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  placeholder="Enter number of units"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line</FormLabel>
              <FormControl>
                <Input placeholder="Enter address" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Input placeholder="Enter district" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="Enter state" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input placeholder="Enter pincode" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Property</Button>
        </div>
      </form>
    </Form>
  );
}