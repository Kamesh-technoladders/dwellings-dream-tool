
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { OrganizationStatus, StatusChangeData } from "@/types/organization";
import { toast } from "sonner";

interface StatusManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (data: StatusChangeData) => Promise<void>;
  currentStatus: OrganizationStatus;
  organizationName: string;
}

export function StatusManagementDialog({
  isOpen,
  onClose,
  onStatusChange,
  currentStatus,
  organizationName,
}: StatusManagementDialogProps) {
  const [status, setStatus] = useState<OrganizationStatus>(currentStatus);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason) {
      toast.error("Please provide a reason for the status change");
      return;
    }

    setIsSubmitting(true);
    try {
      await onStatusChange({ status, reason });
      onClose();
    } catch (error) {
      console.error("Status change error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Organization Status</DialogTitle>
          <DialogDescription>
            Update the status for {organizationName}. This action will be logged.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(value: OrganizationStatus) => setStatus(value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="active" className="hover:bg-primary hover:text-white">Active</SelectItem>
                <SelectItem value="restricted" className="hover:bg-primary hover:text-white">Restricted</SelectItem>
                <SelectItem value="inactive" className="hover:bg-primary hover:text-white">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide a reason for this status change"
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !reason}
          >
            {isSubmitting ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
