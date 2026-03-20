import { Router } from "express";
import { optionalAuthMiddleware } from "../middleware/auth.middleware";

export const listingsRouter = Router();

listingsRouter.get("/", optionalAuthMiddleware, (_req, res) => {
  res.status(200).json({
    success: true,
    message: "GET /api/listings",
  });
});

listingsRouter.get("/:id", optionalAuthMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: `GET /api/listings/${req.params.id}`,
  });
});
