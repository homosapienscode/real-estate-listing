import bcrypt from "bcryptjs";
import { generateAccessToken } from "../auth/jwt";
import { env } from "../config/env";
import { BadRequestError, UnauthorizedError } from "../error";
import { UserRole } from "../generated/prisma/client";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../repositories/users.repository";
import { LoginInput, RegisterInput } from "../validators/auth.validator";

export async function registerUser(input: RegisterInput) {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new BadRequestError("A user with this email already exists");
  }

  const passwordHash = await bcrypt.hash(input.password, env.salt);

  const user = await createUser({
    name: input.name,
    email: input.email,
    password: passwordHash,
    role: UserRole.USER,
    isAdmin: false,
  });

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
    isAdmin: user.isAdmin,
  });

  return {
    user,
    accessToken,
  };
}

export async function loginUser(input: LoginInput) {
  const user = await findUserByEmail(input.email);

  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
    isAdmin: user.isAdmin
  });

  return {
    user,
    accessToken,
  };
}

export async function getCurrentUser(userId: string) {
  const user = await findUserById(userId);

  if (!user) {
    throw new UnauthorizedError("Authenticated user not found");
  }

  return user;
}
