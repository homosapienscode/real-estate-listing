import { ListingType } from "../generated/prisma/client";

export interface ListingSearchParams {
  page: number;
  limit: number;
  priceMin?: number;
  priceMax?: number;
  bedroomsMin?: number;
  bathroomsMin?: number;
  propertyType?: ListingType;
  suburb?: string;
  keyword?: string;
}

export interface ListingSearchParams {
  page: number;
  limit: number;
  priceMin?: number;
  priceMax?: number;
  bedroomsMin?: number;
  bathroomsMin?: number;
  propertyType?: ListingType;
  suburb?: string;
  keyword?: string;
}