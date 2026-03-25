import { Listing, ListingStatus, Prisma } from "../generated/prisma/client";
import { prisma } from "../db/prisma";
import { ListingSearchParams } from "../types/listings.types";

function buildListingsWhereClause(
  filters: ListingSearchParams
): Prisma.ListingWhereInput {
  const where: Prisma.ListingWhereInput = {
    status: ListingStatus.ACTIVE,
  };

  if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
    where.price = {
      ...(filters.priceMin !== undefined ? { gte: filters.priceMin } : {}),
      ...(filters.priceMax !== undefined ? { lte: filters.priceMax } : {}),
    };
  }

  if (filters.bedroomsMin !== undefined) {
    where.bedrooms = {
      gte: filters.bedroomsMin,
    };
  }

  if (filters.bathroomsMin !== undefined) {
    where.bathrooms = {
      gte: filters.bathroomsMin,
    };
  }

  if (filters.propertyType !== undefined) {
    where.propertyType = filters.propertyType;
  }

  if (filters.suburb) {
    where.suburb = {
      contains: filters.suburb,
      mode: "insensitive",
    };
  }

  if (filters.keyword) {
    where.OR = [
      {
        title: {
          contains: filters.keyword,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: filters.keyword,
          mode: "insensitive",
        },
      },
      {
        suburb: {
          contains: filters.keyword,
          mode: "insensitive",
        },
      },
      {
        address: {
          contains: filters.keyword,
          mode: "insensitive",
        },
      },
    ];
  }

  return where;
}

export async function findListings(filters: ListingSearchParams) {
  const where = buildListingsWhereClause(filters);
  const skip = (filters.page - 1) * filters.limit;
  const take = filters.limit;

  const [items, total] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take,
    }),
    prisma.listing.count({ where }),
  ]);

  return {
    items,
    total,
  };
}

export async function findListingById(id: string): Promise<Listing | null> {
  return prisma.listing.findUnique({
    where: { id },
  });
}