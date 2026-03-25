export type ListingStatus = "ACTIVE" | "SOLD" | "OFF_MARKET" | "DRAFT";
export type ListingType =
  | "HOUSE"
  | "APARTMENT"
  | "VILLA"
  | "TOWNHOUSE"
  | "LAND";

export interface ListingListItem {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: ListingType;
  status: ListingStatus;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  heroImageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListingDetail extends ListingListItem {
  internalStatusNotes?: string | null;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ListingsQueryParams {
  page?: number;
  limit?: number;
  keyword?: string;
  suburb?: string;
  property_type?: ListingType;
  price_min?: number;
  price_max?: number;
  bedrooms_min?: number;
  bathrooms_min?: number;
}

export interface ListingsResponse {
  success: boolean;
  message: string;
  data: {
    items: ListingListItem[];
    pagination: PaginationMeta;
  };
}

export interface ListingDetailResponse {
  success: boolean;
  message: string;
  data: {
    listing: ListingDetail;
  };
}