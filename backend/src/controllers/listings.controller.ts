import { NextFunction, Request, Response } from "express";
import { getListingDetail, searchListings } from "../services/listings.service";
import { parseListingSearchParams } from "../validators/listings.validator";
import { BadRequestError } from "../error";

export async function getListings(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const filters = parseListingSearchParams(req);
    const result = await searchListings(filters);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getListingById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {

    if (!req.params.id) {
      throw new BadRequestError("Listing id is required");
    }

    const result = await getListingDetail(req.params.id, req.user);

    return res.status(200).json({
      success: true,
      data: {
        listing: result,
      },
    });
  } catch (error) {
    return next(error);
  }
}
