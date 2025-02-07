
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { organizationFormSchema } from "@/schemas/organizationSchema";
import { OrganizationFormData } from "@/types/organization";
import { useCreateOrganization } from "@/hooks/useCreateOrganization";
import { OrganizationBasicFields } from "./forms/OrganizationBasicFields";
import { AddressFields } from "./forms/AddressFields";

interface OrganizationFormProps {
  onClose: () => void;
  initialData?: OrganizationFormData;
  onSubmit?: (data: OrganizationFormData) => void;
  mode?: 'create' | 'edit';
}

export function OrganizationForm({ onClose, initialData, onSubmit, mode = 'create' }: OrganizationFormProps) {
  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
    },
  });

  const createOrganization = useCreateOrganization(onClose);

  const handleSubmit = (formData: OrganizationFormData) => {
    if (mode === 'edit' && onSubmit) {
      onSubmit(formData);
    } else {
      createOrganization.mutate(formData);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto px-1">
        <div className="space-y-3">
          <OrganizationBasicFields form={form} />
          <AddressFields form={form} />
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={mode === 'create' ? createOrganization.isPending : false}
          >
            {mode === 'create' 
              ? (createOrganization.isPending ? 'Creating...' : 'Create Organization')
              : 'Update Organization'
            }
          </Button>
        </div>
      </form>
    </Form>
  );
}
