import { Building2, BedDouble, Bath, Square } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyCardProps {
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
}

export const PropertyCard = ({ address, price, beds, baths, sqft, image }: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={address} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-primary px-3 py-1 rounded-full text-white font-semibold">
          {price}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{address}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-muted-foreground">
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{sqft} sqft</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};