import bcrypt from "bcryptjs";
import { afterAll, beforeAll, beforeEach } from "vitest";
import { prisma } from "../src/db/prisma";
import {
  ListingStatus,
  ListingType,
  UserRole,
} from "../src/generated/prisma/client";

const TEST_PASSWORD = "Password123!";
const SALT_ROUNDS = 10;

async function resetDatabase() {
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();
}

async function seedTestData() {
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, SALT_ROUNDS);

  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@techkraft.com",
      password: passwordHash,
      role: UserRole.ADMIN,
      isAdmin: true,
    },
  });

  await prisma.user.create({
    data: {
      name: "Normal User",
      email: "user@techkraft.com",
      password: passwordHash,
      role: UserRole.USER,
      isAdmin: false,
    },
  });

  await prisma.listing.createMany({
    data: [
      {
        title: "Active Family Home",
        description: "A spacious family home in a quiet neighborhood.",
        price: 750000,
        bedrooms: 4,
        bathrooms: 2,
        propertyType: ListingType.HOUSE,
        status: ListingStatus.ACTIVE,
        address: "12 Willow Street",
        suburb: "Northside",
        state: "NSW",
        postcode: "2150",
        country: "Australia",
        heroImageUrl:
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
        internalStatusNotes: "Owner open to strong offers.",
      },
      {
        title: "Active City Apartment",
        description: "Modern apartment close to the CBD.",
        price: 620000,
        bedrooms: 2,
        bathrooms: 2,
        propertyType: ListingType.APARTMENT,
        status: ListingStatus.ACTIVE,
        address: "45 King Avenue, Unit 8",
        suburb: "Central City",
        state: "NSW",
        postcode: "2000",
        country: "Australia",
        heroImageUrl:
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        internalStatusNotes: "Building remediation completed in 2025.",
      },
      {
        title: "Sold Luxury Villa",
        description: "Premium villa that has already been sold.",
        price: 1450000,
        bedrooms: 5,
        bathrooms: 3,
        propertyType: ListingType.VILLA,
        status: ListingStatus.SOLD,
        address: "7 Seabreeze Court",
        suburb: "Harbour Point",
        state: "QLD",
        postcode: "4217",
        country: "Australia",
        heroImageUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        internalStatusNotes: "Sold above reserve after competitive auction.",
      },
    ],
  });
}

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await resetDatabase();
  await seedTestData();
});

beforeEach(async () => {
  // Keep tests isolated and predictable
  await resetDatabase();
  await seedTestData();
});

afterAll(async () => {
  await prisma.$disconnect();
});
