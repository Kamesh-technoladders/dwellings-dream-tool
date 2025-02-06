import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Mail, Phone, UserPlus } from "lucide-react";

const activities = [
  {
    icon: Phone,
    title: "Call with John Doe",
    time: "10:30 AM",
    description: "Discussed property at 123 Main St",
  },
  {
    icon: Mail,
    title: "Email sent to Sarah Smith",
    time: "9:15 AM",
    description: "Property viewing confirmation",
  },
  {
    icon: Calendar,
    title: "Viewing scheduled",
    time: "Yesterday",
    description: "456 Oak Avenue",
  },
  {
    icon: UserPlus,
    title: "New lead acquired",
    time: "Yesterday",
    description: "Michael Johnson - Looking for 3 bed house",
  },
];

export const ActivityFeed = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-muted p-2 rounded-full">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{activity.title}</p>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};