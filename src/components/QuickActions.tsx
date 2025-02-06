import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, UserPlus, Calendar, Mail } from "lucide-react";

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Property
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          New Lead
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Schedule Viewing
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Send Email
        </Button>
      </CardContent>
    </Card>
  );
};