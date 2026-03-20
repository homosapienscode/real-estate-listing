import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { env } from "../config/env";
import { PrismaClient } from "../generated/prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

const pool = new pg.Pool({ connectionString: env.databaseUrl });
const adapter = new PrismaPg(pool as any);

export const prisma =
  global.__prisma ||
  new PrismaClient({
    adapter,
    log: ["query", "warn", "error"],
  });
