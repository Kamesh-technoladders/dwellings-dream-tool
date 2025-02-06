import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PropertyFormData } from "./PropertyForm";

interface PropertiesTableProps {
  properties: PropertyFormData[];
}

export function PropertiesTable({ properties }: PropertiesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Units</TableHead>
            <TableHead>Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{property.propertyName}</TableCell>
              <TableCell>{property.propertyType}</TableCell>
              <TableCell>{property.numberOfUnits}</TableCell>
              <TableCell>
                {`${property.addressLine}, ${property.district}, ${property.state}, ${property.country} - ${property.pincode}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}