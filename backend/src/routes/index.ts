import { Router } from "express";
import { listingsRouter } from "./listings.routes";
import { authRouter } from "./auth.routes";

export const router = Router();

router.use("/auth", authRouter);
router.use("/listings", listingsRouter);