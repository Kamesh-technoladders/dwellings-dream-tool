import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PropertyFormData } from "./PropertyForm";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { PropertyForm } from "./PropertyForm";
import { usePropertiesStore } from "@/store/propertiesStore";

interface PropertiesTableProps {
  properties: PropertyFormData[];
}

export function PropertiesTable({ properties }: PropertiesTableProps) {
  const [editingProperty, setEditingProperty] = useState<PropertyFormData | null>(null);
  const { updateProperty, deleteProperty } = usePropertiesStore();

  const handleEdit = (property: PropertyFormData) => {
    setEditingProperty(property);
  };

  const handleUpdate = async (data: PropertyFormData) => {
    if (editingProperty?.id) {
      await updateProperty(editingProperty.id, data);
      setEditingProperty(null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteProperty(id);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.propertyName}</TableCell>
                <TableCell>{property.propertyType}</TableCell>
                <TableCell>{property.numberOfUnits}</TableCell>
                <TableCell>
                  {`${property.addressLine}, ${property.district}, ${property.state}, ${property.country} - ${property.pincode}`}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(property)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Property</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this property? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => property.id && handleDelete(property.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet open={!!editingProperty} onOpenChange={() => setEditingProperty(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Property</SheetTitle>
          </SheetHeader>
          {editingProperty && (
            <PropertyForm
              onClose={() => setEditingProperty(null)}
              onSave={handleUpdate}
              initialData={editingProperty}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}