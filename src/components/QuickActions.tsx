import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, UserPlus, Calendar } from "lucide-react";

export const QuickActions = () => {
  return (
    <Card className="border-0 bg-[#9b87f5] text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            className="flex items-center justify-center w-full bg-[#64748b] hover:bg-[#64748b]/90 text-white h-9 px-3 text-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center justify-center w-full bg-[#64748b] hover:bg-[#64748b]/90 text-white border-0 h-9 px-3 text-sm"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            New Lead
          </Button>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center justify-center w-full max-w-[50%] mx-auto bg-[#64748b] hover:bg-[#64748b]/90 text-white border-0 h-9 px-3 text-sm"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Viewing
        </Button>
      </CardContent>
    </Card>
  );
};