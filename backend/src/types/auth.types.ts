import { UserRole } from "../generated/prisma/client";

export interface AuthTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
