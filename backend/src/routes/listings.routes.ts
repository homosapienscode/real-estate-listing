import { Router } from "express";
import { optionalAuthMiddleware } from "../middleware/auth.middleware";
import { getListingById, getListings } from "../controllers/listings.controller";

export const listingsRouter = Router();

listingsRouter.get("/", optionalAuthMiddleware, getListings);

listingsRouter.get("/:id", optionalAuthMiddleware, getListingById);
