import { User, UserRole } from "../generated/prisma/client";
import { prisma } from "../db/prisma";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function createUser(input: CreateUserInput): Promise<User> {
  return prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: input.password,
      role: input.role ?? UserRole.USER,
    },
  });
}