
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
}

export function OrganizationForm({ onClose }: OrganizationFormProps) {
  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
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

  const onSubmit = (formData: OrganizationFormData) => {
    createOrganization.mutate(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <OrganizationBasicFields form={form} />
          <AddressFields form={form} />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={createOrganization.isPending}>
            {createOrganization.isPending ? 'Creating...' : 'Create Organization'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
