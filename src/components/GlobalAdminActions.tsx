import { Plus, UserPlus, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const GlobalAdminActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        <Button className="w-full justify-start" variant="outline">
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
  );
};