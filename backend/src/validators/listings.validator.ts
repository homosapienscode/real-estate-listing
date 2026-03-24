
import { Request } from "express";
import { z } from "zod";
import {
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
    MAX_PAGE_SIZE,
} from "../constants";
import { BadRequestError } from "../error";
import { ListingType } from "../generated/prisma/client";
import { ListingSearchParams } from "../types/listings.types";

const searchQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(DEFAULT_PAGE),
  page_size: z.coerce
    .number()
    .int()
    .min(1)
    .max(MAX_PAGE_SIZE)
    .default(DEFAULT_PAGE_SIZE),

  price_min: z.coerce.number().int().min(0).optional(),
  price_max: z.coerce.number().int().min(0).optional(),

  bedrooms_min: z.coerce.number().int().min(0).optional(),
  bathrooms_min: z.coerce.number().int().min(0).optional(),

  property_type: z.nativeEnum(ListingType).optional(),

  suburb: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .optional()
    .transform((value) => (value ? value : undefined)),

  keyword: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .optional()
    .transform((value) => (value ? value : undefined)),
});

export function parseListingSearchParams(req: Request): ListingSearchParams {
  const parsed = searchQuerySchema.parse(req.query);

  if (
    parsed.price_min !== undefined &&
    parsed.price_max !== undefined &&
    parsed.price_min > parsed.price_max
  ) {
    throw new BadRequestError("price_min cannot be greater than price_max");
  }

  return {
    page: parsed.page,
    pageSize: parsed.page_size,
    priceMin: parsed.price_min,
    priceMax: parsed.price_max,
    bedroomsMin: parsed.bedrooms_min,
    bathroomsMin: parsed.bathrooms_min,
    propertyType: parsed.property_type,
    suburb: parsed.suburb,
    keyword: parsed.keyword,
  };
}