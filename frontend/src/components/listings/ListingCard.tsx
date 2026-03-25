import { Link } from "react-router-dom";
import { Bath, BedDouble, MapPin, Home } from "lucide-react";
import type { ListingListItem } from "@/types/listings.types";
import { ROUTES } from "@/constants/routes";
import { formatCurrency } from "@/utils/currency";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ListingCardProps {
  listing: ListingListItem;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Card className="overflow-hidden py-0">
      <div className="aspect-16/10 overflow-hidden bg-muted">
        {listing.heroImageUrl ? (
          <img
            src={listing.heroImageUrl}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image available
          </div>
        )}
      </div>

      <CardHeader className="space-y-3 px-5 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-lg font-semibold tracking-tight">
            {listing.title}
          </h3>

          <Badge variant="secondary" className="shrink-0">
            {listing.propertyType.replace("_", " ")}
          </Badge>
        </div>

        <p className="text-2xl font-bold tracking-tight">
          {formatCurrency(listing.price)}
        </p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>
            {listing.suburb}, {listing.state}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-5">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {listing.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4" />
            <span>{listing.bedrooms}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" />
            <span>{listing.bathrooms}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Home className="h-4 w-4" />
            <span>{listing.propertyType}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-5 pb-5">
        <Button asChild className="w-full">
          <Link to={ROUTES.LISTING_DETAIL(listing.id)}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}