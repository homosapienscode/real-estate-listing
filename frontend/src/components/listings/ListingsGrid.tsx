import type { ListingListItem } from "@/types/listings.types";
import { ListingCard } from "@/components/listings/ListingCard";

interface ListingsGridProps {
  items: ListingListItem[];
}

export function ListingsGrid({ items }: ListingsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}