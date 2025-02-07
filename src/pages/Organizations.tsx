
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Organization } from "@/types/organization";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { OrganizationForm } from "@/components/OrganizationForm";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Organizations() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false);

  // Check if user is authenticated and get their role
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      // Check if user is global admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_global_admin")
        .eq("id", user.id)
        .single();

      setIsGlobalAdmin(profile?.is_global_admin || false);
    };

    checkAuth();
  }, [navigate]);

  const { data: organizations, isLoading, error, refetch } = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      const { data: organizations, error } = await supabase
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching organizations:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch organizations. Please try again.",
        });
        throw error;
      }

      return organizations as Organization[];
    },
  });

  const getStatusColor = (status: string) => {
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

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Organizations</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 animate-pulse bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
          <p className="text-red-600">Error loading organizations. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Organizations</h1>
        {isGlobalAdmin && (
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Organization
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {organizations?.map((org) => (
          <Card
            key={org.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/organizations/${org.id}`)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{org.name}</CardTitle>
                <Badge className={getStatusColor(org.status)}>
                  {org.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                {org.email && <p>{org.email}</p>}
                {org.phone && <p>{org.phone}</p>}
                {org.address && <p>{org.address}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Organization</AlertDialogTitle>
          </AlertDialogHeader>
          <OrganizationForm onClose={() => {
            setShowCreateDialog(false);
            refetch();
          }} />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
