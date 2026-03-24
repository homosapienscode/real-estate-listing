import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../src/app";
import { prisma } from "../src/db/prisma";
import { loginAsAdmin, loginAsUser } from "./helpers/auth.helper";

describe("Listings API", () => {
  it("should return only ACTIVE listings in the public list endpoint", async () => {
    const response = await request(app).get("/api/listings");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    const items = response.body.data.items;

    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBe(2);
    expect(items.every((item: any) => item.status === "ACTIVE")).toBe(true);
  });

  it("should filter listings by property_type", async () => {
    const response = await request(app).get(
      "/api/listings?property_type=HOUSE"
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    const items = response.body.data.items;

    expect(items.length).toBe(1);
    expect(items[0].propertyType).toBe("HOUSE");
  });

  it("should hide internalStatusNotes for a normal user on listing detail", async () => {
    const userToken = await loginAsUser();

    const activeListing = await prisma.listing.findFirst({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
    });

    expect(activeListing).toBeTruthy();

    const response = await request(app)
      .get(`/api/listings/${activeListing!.id}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.listing.internalStatusNotes).toBeUndefined();
  });

  it("should show internalStatusNotes for an admin on listing detail", async () => {
    const adminToken = await loginAsAdmin();

    const activeListing = await prisma.listing.findFirst({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
    });

    expect(activeListing).toBeTruthy();

    const response = await request(app)
      .get(`/api/listings/${activeListing!.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.listing.internalStatusNotes).toBeDefined();
  });

  it("should return 404 for a normal user when accessing a non-ACTIVE listing", async () => {
    const userToken = await loginAsUser();

    const soldListing = await prisma.listing.findFirst({
      where: { status: "SOLD" },
    });

    expect(soldListing).toBeTruthy();

    const response = await request(app)
      .get(`/api/listings/${soldListing!.id}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it("should allow an admin to access a non-ACTIVE listing", async () => {
    const adminToken = await loginAsAdmin();

    const soldListing = await prisma.listing.findFirst({
      where: { status: "SOLD" },
    });

    expect(soldListing).toBeTruthy();

    const response = await request(app)
      .get(`/api/listings/${soldListing!.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.listing.status).toBe("SOLD");
    expect(response.body.data.listing.internalStatusNotes).toBeDefined();
  });
});