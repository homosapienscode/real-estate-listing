import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ForbiddenError, UnauthorizedError } from "../error";
import { AuthTokenPayload } from "../types/auth.types";
import { UserRole } from "../generated/prisma/client";


export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new UnauthorizedError("Authorization header is required"));
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(
      new UnauthorizedError("Authorization header must be in Bearer format"),
    );
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret) as AuthTokenPayload;

    req.user = {
      id: payload.sub,
      name: "",
      email: payload.email,
      role: payload.role,
    };

    return next();
  } catch {
    return next(new UnauthorizedError("Invalid or expired token"));
  }
}

export function optionalAuthMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next();
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret) as AuthTokenPayload;

    req.user = {
      id: payload.sub,
      name: "",
      email: payload.email,
      role: payload.role,
    };
  } catch {
    // Continues as anonymous
  }

  return next();
}