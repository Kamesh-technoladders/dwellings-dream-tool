
import { Plus, UserPlus, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useState } from "react";
import { OrganizationForm } from "./OrganizationForm";

export const GlobalAdminActions = () => {
  const [showOrgModal, setShowOrgModal] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          <Button 
            className="w-full justify-start" 
            variant="outline"
            onClick={() => setShowOrgModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Organization
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Global Admin
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            System Settings
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={showOrgModal} onOpenChange={setShowOrgModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Organization</AlertDialogTitle>
          </AlertDialogHeader>
          <OrganizationForm onClose={() => setShowOrgModal(false)} />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
