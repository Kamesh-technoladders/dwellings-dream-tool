
import { AppSidebar } from "@/components/AppSidebar";
import { useOrganizations } from "@/hooks/useOrganizations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { GlobalAdminActions } from "@/components/GlobalAdminActions";

const Organizations = () => {
  const { organizations, isLoading } = useOrganizations();

  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Organizations</h1>
          <GlobalAdminActions />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>City</TableHead>
                <TableHead>District</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 7 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : organizations?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No organizations found
                  </TableCell>
                </TableRow>
              ) : (
                organizations?.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell>{org.name}</TableCell>
                    <TableCell>{org.organization_type}</TableCell>
                    <TableCell>{org.email}</TableCell>
                    <TableCell>{org.phone}</TableCell>
                    <TableCell>{org.address_line1}</TableCell>
                    <TableCell>{org.city}</TableCell>
                    <TableCell>{org.district}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default Organizations;
