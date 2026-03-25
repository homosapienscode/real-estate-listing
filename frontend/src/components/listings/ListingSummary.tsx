import {
  Bath,
  BedDouble,
  CalendarDays,
  Home,
  MapPin,
  MapPinned,
} from "lucide-react";
import type { ListingDetail } from "@/types/listings.types";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ListingSummaryProps {
  listing: ListingDetail;
}

function formatPropertyType(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getStatusBadgeVariant(status: string): "default" | "secondary" | "destructive" {
  switch (status) {
    case "ACTIVE":
      return "default";
    case "SOLD":
      return "secondary";
    case "OFF_MARKET":
    case "DRAFT":
      return "destructive";
    default:
      return "secondary";
  }
}

export function ListingSummary({ listing }: ListingSummaryProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{formatPropertyType(listing.propertyType)}</Badge>
          <Badge variant={getStatusBadgeVariant(listing.status)}>
            {formatPropertyType(listing.status)}
          </Badge>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
            {listing.title}
          </h1>

          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-sm sm:text-base">
              {listing.address}, {listing.suburb}, {listing.state}{" "}
              {listing.postcode}, {listing.country}
            </p>
          </div>
        </div>

        <p className="text-3xl font-bold tracking-tight text-primary">
          {formatCurrency(listing.price)}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BedDouble className="h-4 w-4" />
            <span className="text-sm">Bedrooms</span>
          </div>
          <p className="mt-2 text-2xl font-semibold">{listing.bedrooms}</p>
        </div>

        <div className="rounded-xl border p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Bath className="h-4 w-4" />
            <span className="text-sm">Bathrooms</span>
          </div>
          <p className="mt-2 text-2xl font-semibold">{listing.bathrooms}</p>
        </div>

        <div className="rounded-xl border p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Home className="h-4 w-4" />
            <span className="text-sm">Property Type</span>
          </div>
          <p className="mt-2 text-lg font-semibold">
            {formatPropertyType(listing.propertyType)}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span className="text-sm">Listed</span>
          </div>
          <p className="mt-2 text-lg font-semibold">
            {formatDate(listing.createdAt)}
          </p>
        </div>
      </div>

      <Separator />

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPinned className="h-4 w-4" />
          <h2 className="text-xl font-semibold tracking-tight">Property Overview</h2>
        </div>

        <p className="leading-7 text-muted-foreground">{listing.description}</p>
      </section>
    </div>
  );
}