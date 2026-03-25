import { NotFoundError } from "../error";
import { Listing, ListingStatus } from "../generated/prisma/client";
import {
  findListingById,
  findListings,
} from "../repositories/listings.repository";
import { AuthenticatedUser } from "../types/auth.types";
import { ListingSearchParams } from "../types/listings.types";

export function serializeListingListItem(listing: Listing) {
  return {
    id: listing.id,
    title: listing.title,
    price: listing.price,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    propertyType: listing.propertyType,
    status: listing.status,
    address: listing.address,
    suburb: listing.suburb,
    state: listing.state,
    postcode: listing.postcode,
    country: listing.country,
    heroImageUrl: listing.heroImageUrl,
    createdAt: listing.createdAt,
    updatedAt: listing.updatedAt,
  };
}

export function serializeListingDetail(listing: Listing, isAdmin: boolean) {
  const base = {
    id: listing.id,
    title: listing.title,
    description: listing.description,
    price: listing.price,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    propertyType: listing.propertyType,
    status: listing.status,
    address: listing.address,
    suburb: listing.suburb,
    state: listing.state,
    postcode: listing.postcode,
    country: listing.country,
    heroImageUrl: listing.heroImageUrl,
    createdAt: listing.createdAt,
    updatedAt: listing.updatedAt,
  };

  if (isAdmin) {
    return {
      ...base,
      internalStatusNotes: listing.internalStatusNotes,
    };
  }

  return base;
}

export async function searchListings(filters: ListingSearchParams) {
  const { items, total } = await findListings(filters);

  const totalPages = Math.max(1, Math.ceil(total / filters.limit));

  return {
    items: items.map(serializeListingListItem),
    pagination: {
      page: filters.page,
      limit: filters.limit,
      total,
      totalPages,
    },
    filters: {
      ...(filters.priceMin !== undefined ? { priceMin: filters.priceMin } : {}),
      ...(filters.priceMax !== undefined ? { priceMax: filters.priceMax } : {}),
      ...(filters.bedroomsMin !== undefined
        ? { bedroomsMin: filters.bedroomsMin }
        : {}),
      ...(filters.bathroomsMin !== undefined
        ? { bathroomsMin: filters.bathroomsMin }
        : {}),
      ...(filters.propertyType !== undefined
        ? { propertyType: filters.propertyType }
        : {}),
      ...(filters.suburb ? { suburb: filters.suburb } : {}),
      ...(filters.keyword ? { keyword: filters.keyword } : {}),
    },
  };
}

export async function getListingDetail(id: string, user?: AuthenticatedUser) {
  const listing = await findListingById(id);

  if (!listing) {
    throw new NotFoundError("Listing not found");
  }

  const isAdmin = Boolean(user?.isAdmin);

  // Public users can only view ACTIVE listings
  if (!isAdmin && listing.status !== ListingStatus.ACTIVE) {
    throw new NotFoundError("Listing not found");
  }

  return serializeListingDetail(listing, isAdmin);
}