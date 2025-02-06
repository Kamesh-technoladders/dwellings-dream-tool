
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Organization } from "@/types/organization";
import { OrganizationStatusManager } from "@/components/OrganizationStatusManager";
import { OrganizationAuditLogs } from "@/components/OrganizationAuditLogs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrganizationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrganization = async () => {
    try {
      if (!id) return;

      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setOrganization(data);
    } catch (error) {
      console.error('Error fetching organization:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!organization) {
    return <div>Organization not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <h3 className="font-semibold">{organization.name}</h3>
                <p className="text-sm text-muted-foreground">{organization.email}</p>
              </div>

              <div className="grid gap-2">
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <OrganizationStatusManager
                    organization={organization}
                    onStatusChange={fetchOrganization}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-sm">{organization.phone}</p>
                </div>

                <div>
                  <label className="text-sm font-medium">Address</label>
                  <p className="text-sm">{organization.address}</p>
                </div>

                <div>
                  <label className="text-sm font-medium">Created</label>
                  <p className="text-sm">
                    {new Date(organization.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <OrganizationAuditLogs organizationId={organization.id} />
      </div>
    </div>
  );
}
