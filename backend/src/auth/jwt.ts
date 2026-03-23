import { UserRole } from "../generated/prisma/client";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AuthTokenPayload } from "../types/auth.types";

interface GenerateTokenInput {
  id: string;
  email: string;
  role: UserRole;
  isAdmin: boolean;
}

export function generateAccessToken(input: GenerateTokenInput): string {
  const payload: AuthTokenPayload = {
    sub: input.id,
    email: input.email,
    role: input.role,
    isAdmin: input.isAdmin,
  };

  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"],
  });
}