
import { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Organization, OrganizationStatus } from "@/types/organization";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OrganizationStatusManagerProps {
  organization: Organization;
  onStatusChange: () => void;
}

export function OrganizationStatusManager({ organization, onStatusChange }: OrganizationStatusManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrganizationStatus | null>(null);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getStatusColor = (status: OrganizationStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-gray-500';
      case 'restricted':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleStatusChange = async () => {
    if (!selectedStatus || !reason) return;

    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("You must be logged in to perform this action");
        return;
      }

      // Update organization status
      const { error: updateError } = await supabase
        .from('organizations')
        .update({
          status: selectedStatus,
          last_status_change: new Date().toISOString(),
          status_changed_by: session.user.id,
          status_reason: reason
        })
        .eq('id', organization.id);

      if (updateError) throw updateError;

      // Create audit log
      const { error: auditError } = await supabase
        .from('organization_audit_logs')
        .insert({
          organization_id: organization.id,
          changed_by: session.user.id,
          old_status: organization.status,
          new_status: selectedStatus,
          reason
        });

      if (auditError) throw auditError;

      toast.success(`Organization status updated to ${selectedStatus}`);
      onStatusChange();
      setIsOpen(false);
    } catch (error: any) {
      console.error('Error updating organization status:', error);
      toast.error(error.message || "Failed to update organization status");
    } finally {
      setIsLoading(false);
      setReason("");
      setSelectedStatus(null);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Badge className={getStatusColor(organization.status)}>
          {organization.status}
        </Badge>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          Change Status
        </Button>
      </div>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Organization Status</AlertDialogTitle>
            <AlertDialogDescription>
              Select a new status for {organization.name}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex gap-2">
              {(['active', 'inactive', 'restricted'] as OrganizationStatus[]).map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  onClick={() => setSelectedStatus(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>

            <div className="grid gap-2">
              <label htmlFor="reason" className="text-sm font-medium">
                Reason for change
              </label>
              <textarea
                id="reason"
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter reason for status change..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>

          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStatusChange}
              disabled={!selectedStatus || !reason || isLoading}
            >
              {isLoading ? "Updating..." : "Update Status"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
