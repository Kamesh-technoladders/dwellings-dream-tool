import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, UserPlus, Calendar, Mail } from "lucide-react";

export const QuickActions = () => {
  return (
    <Card className="border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button 
          className="flex items-center gap-2 bg-[#9b87f5] hover:bg-[#8b77e5] text-white h-10"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 text-gray-600 hover:text-[#9b87f5] hover:border-[#9b87f5] h-10"
        >
          <UserPlus className="h-4 w-4" />
          New Lead
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 text-gray-600 hover:text-[#9b87f5] hover:border-[#9b87f5] h-10"
        >
          <Calendar className="h-4 w-4" />
          Schedule Viewing
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 text-gray-600 hover:text-[#9b87f5] hover:border-[#9b87f5] h-10"
        >
          <Mail className="h-4 w-4" />
          Send Email
        </Button>
      </CardContent>
    </Card>
  );
};