import type { ListingType } from "@/types/listings.types";

export const DEFAULT_LISTINGS_PAGE = 1;
export const DEFAULT_LISTINGS_LIMIT = 9;

export const PROPERTY_TYPE_OPTIONS: Array<{
  label: string;
  value: ListingType;
}> = [
  { label: "House", value: "HOUSE" },
  { label: "Apartment", value: "APARTMENT" },
  { label: "Villa", value: "VILLA" },
  { label: "Townhouse", value: "TOWNHOUSE" },
  { label: "Land", value: "LAND" },
];

export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5];
export const BATHROOM_OPTIONS = [1, 2, 3, 4, 5];