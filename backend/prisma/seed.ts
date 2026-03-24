import bcrypt from "bcryptjs";
import { prisma } from "../src/db/prisma";
import {
    ListingStatus,
    ListingType,
    UserRole
} from "../src/generated/prisma/client";

const DEMO_PASSWORD = "Password123!";
const SALT_ROUNDS = 10;

async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function main() {
  console.log("🌱 Starting seed...");

  // Delete in safe order
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hashPassword(DEMO_PASSWORD);

  // -------------------------------------
  // Users
  // -------------------------------------
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@techkraft.com",
      password: passwordHash,
      role: UserRole.ADMIN,
      isAdmin: true,
    },
  });

  const normalUser = await prisma.user.create({
    data: {
      name: "Susan User",
      email: "user@techkraft.com",
      password: passwordHash,
      role: UserRole.USER,
      isAdmin: false,
    },
  });

  // -------------------------------------
  // Listings
  // -------------------------------------
  const listings = [
    {
      title: "Modern Family Home with Spacious Backyard",
      description:
        "Beautifully maintained family home featuring open-plan living, updated kitchen, and a large private backyard ideal for entertaining.",
      price: 780000,
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
      internalStatusNotes: "Owner open to offers above asking after 30 days.",
    },
    {
      title: "Stylish Apartment in the Heart of the City",
      description:
        "Contemporary apartment with city views, secure parking, and easy access to cafes, public transport, and shopping.",
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
      title: "Coastal Villa with Ocean Breezes",
      description:
        "Luxury villa offering premium finishes, generous outdoor deck, and partial ocean views in a highly sought-after coastal enclave.",
      price: 1450000,
      bedrooms: 5,
      bathrooms: 3,
      propertyType: ListingType.VILLA,
      status: ListingStatus.ACTIVE,
      address: "7 Seabreeze Court",
      suburb: "Harbour Point",
      state: "QLD",
      postcode: "4217",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: "Vendor motivated due to interstate relocation.",
    },
    {
      title: "Low-Maintenance Townhouse Near Schools",
      description:
        "Well-positioned townhouse with modern interiors, secure garage, and close proximity to schools, parks, and local shops.",
      price: 690000,
      bedrooms: 3,
      bathrooms: 2,
      propertyType: ListingType.TOWNHOUSE,
      status: ListingStatus.ACTIVE,
      address: "3 Maple Lane",
      suburb: "Greenfield",
      state: "VIC",
      postcode: "3008",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: "Higher strata fees than nearby comparable properties.",
    },
    {
      title: "Affordable Entry-Level Apartment",
      description:
        "Ideal first-home or investment opportunity with great rental potential and low-maintenance living.",
      price: 410000,
      bedrooms: 1,
      bathrooms: 1,
      propertyType: ListingType.APARTMENT,
      status: ListingStatus.ACTIVE,
      address: "18 River Road, Unit 12",
      suburb: "Riverside",
      state: "VIC",
      postcode: "3121",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: null,
    },
    {
      title: "Premium Corner Block Development Opportunity",
      description:
        "Rare land offering in a fast-growing corridor, suitable for future development subject to council approval.",
      price: 980000,
      bedrooms: 0,
      bathrooms: 0,
      propertyType: ListingType.LAND,
      status: ListingStatus.ACTIVE,
      address: "101 Pioneer Road",
      suburb: "Westbrook",
      state: "QLD",
      postcode: "4350",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: "High developer interest; multiple informal enquiries.",
    },
    {
      title: "Renovated Character Home with Period Charm",
      description:
        "Beautifully updated character home blending heritage details with modern conveniences and landscaped gardens.",
      price: 920000,
      bedrooms: 4,
      bathrooms: 2,
      propertyType: ListingType.HOUSE,
      status: ListingStatus.ACTIVE,
      address: "29 Heritage Crescent",
      suburb: "Northside",
      state: "NSW",
      postcode: "2150",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: "Seller prefers 60-day settlement.",
    },
    {
      title: "Compact City Apartment with Strong Yield",
      description:
        "Excellent investment-grade apartment close to business district, public transport, and university precinct.",
      price: 530000,
      bedrooms: 1,
      bathrooms: 1,
      propertyType: ListingType.APARTMENT,
      status: ListingStatus.ACTIVE,
      address: "9 Market Street, Unit 20",
      suburb: "Central City",
      state: "NSW",
      postcode: "2000",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: "Current tenant lease expires in 4 months.",
    },
    {
      title: "Spacious Suburban Home on Quiet Street",
      description:
        "Generous floorplan with multiple living areas, double garage, and a peaceful setting ideal for growing families.",
      price: 860000,
      bedrooms: 5,
      bathrooms: 3,
      propertyType: ListingType.HOUSE,
      status: ListingStatus.ACTIVE,
      address: "14 Cedar Grove",
      suburb: "Greenfield",
      state: "VIC",
      postcode: "3008",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: null,
    },
    {
      title: "Boutique Townhouse with Rooftop Terrace",
      description:
        "Architecturally designed townhouse featuring premium appliances, natural light, and private rooftop entertaining.",
      price: 810000,
      bedrooms: 3,
      bathrooms: 2,
      propertyType: ListingType.TOWNHOUSE,
      status: ListingStatus.ACTIVE,
      address: "5 Skyline Mews",
      suburb: "Harbour Point",
      state: "QLD",
      postcode: "4217",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: "High interest from interstate buyers.",
    },
    {
      title: "Large Family Residence with Pool",
      description:
        "Expansive home with resort-style pool, outdoor entertaining, and multiple living zones in a premium school catchment.",
      price: 1280000,
      bedrooms: 5,
      bathrooms: 3,
      propertyType: ListingType.HOUSE,
      status: ListingStatus.SOLD,
      address: "88 Jacaranda Drive",
      suburb: "Northside",
      state: "NSW",
      postcode: "2150",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: "Sold above reserve after competitive auction.",
    },
    {
      title: "Modern Apartment with River Views",
      description:
        "Light-filled apartment with scenic river outlook, balcony, and excellent transport connectivity.",
      price: 670000,
      bedrooms: 2,
      bathrooms: 2,
      propertyType: ListingType.APARTMENT,
      status: ListingStatus.ACTIVE,
      address: "22 Quay Street, Unit 15",
      suburb: "Riverside",
      state: "VIC",
      postcode: "3121",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: "Potential price adjustment next week if unsold.",
    },
    {
      title: "Off-Market Luxury Villa with Private Courtyard",
      description:
        "Exclusive villa with designer interiors, secure access, and private outdoor living in a tightly held enclave.",
      price: 1650000,
      bedrooms: 4,
      bathrooms: 3,
      propertyType: ListingType.VILLA,
      status: ListingStatus.OFF_MARKET,
      address: "11 Palm Retreat",
      suburb: "Harbour Point",
      state: "QLD",
      postcode: "4217",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: "Vendor requested quiet sale to qualified buyers only.",
    },
    {
      title: "Ready-to-Build Residential Land Parcel",
      description:
        "Level land parcel in an emerging residential precinct with services nearby and strong long-term growth potential.",
      price: 520000,
      bedrooms: 0,
      bathrooms: 0,
      propertyType: ListingType.LAND,
      status: ListingStatus.ACTIVE,
      address: "60 Horizon Estate",
      suburb: "Westbrook",
      state: "QLD",
      postcode: "4350",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: null,
    },
    {
      title: "Charming Starter Home Close to Parks",
      description:
        "Comfortable and affordable home with updated flooring, functional kitchen, and great access to local green spaces.",
      price: 560000,
      bedrooms: 3,
      bathrooms: 1,
      propertyType: ListingType.HOUSE,
      status: ListingStatus.ACTIVE,
      address: "16 Parkside Avenue",
      suburb: "Greenfield",
      state: "VIC",
      postcode: "3008",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: "Strong first-home buyer interest.",
    },
    {
      title: "Executive Apartment with Premium Amenities",
      description:
        "High-end apartment with concierge access, gym, pool, and premium city-fringe location.",
      price: 890000,
      bedrooms: 2,
      bathrooms: 2,
      propertyType: ListingType.APARTMENT,
      status: ListingStatus.ACTIVE,
      address: "101 Collins Lane, Unit 31",
      suburb: "Central City",
      state: "NSW",
      postcode: "2000",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: "Vendor prefers pre-approved buyers.",
    },
    {
      title: "Draft Listing - Suburban Renovator",
      description:
        "Unlisted renovation opportunity awaiting photography and final copy approval before public launch.",
      price: 640000,
      bedrooms: 3,
      bathrooms: 1,
      propertyType: ListingType.HOUSE,
      status: ListingStatus.DRAFT,
      address: "2 Elm Street",
      suburb: "Northside",
      state: "NSW",
      postcode: "2150",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: "Hold until marketing assets are approved.",
    },
    {
      title: "Family-Friendly Townhouse in Quiet Complex",
      description:
        "Well-kept townhouse with practical layout, courtyard, and excellent access to schools and shopping.",
      price: 720000,
      bedrooms: 3,
      bathrooms: 2,
      propertyType: ListingType.TOWNHOUSE,
      status: ListingStatus.ACTIVE,
      address: "27 Oak Terrace",
      suburb: "Riverside",
      state: "VIC",
      postcode: "3121",
      country: "Australia",
      heroImageUrl:
        "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",
      internalStatusNotes: null,
    },
  ];

  await prisma.listing.createMany({
    data: listings,
  });

  console.log("✅ Seed completed successfully!");
  console.log("");
  console.log("Demo credentials:");
  console.log("Admin -> admin@techkraft.com / Password123!");
  console.log("User  -> user@techkraft.com / Password123!");
  console.log("");
  console.log("Created users:");
  console.log(`- Admin: ${adminUser.email}`);
  console.log(`- User: ${normalUser.email}`);
  console.log(`- Listings: ${listings.length}`);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });