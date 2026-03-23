import { UserRole } from "../generated/prisma/client";

export interface AuthTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  isAdmin: boolean;
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAdmin: boolean;
}
