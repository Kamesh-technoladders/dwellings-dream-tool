
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

const Organizations = () => {
  const { organizations, isLoading } = useOrganizations();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Organizations</h1>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>City</TableHead>
                <TableHead>State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations?.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>{org.name}</TableCell>
                  <TableCell>{org.email}</TableCell>
                  <TableCell>{org.phone}</TableCell>
                  <TableCell>{org.address_line1}</TableCell>
                  <TableCell>{org.city}</TableCell>
                  <TableCell>{org.state}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default Organizations;
