import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../src/app";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "New Test User",
      email: "newuser@techkraft.com",
      password: "Password123!",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.email).toBe("newuser@techkraft.com");
    expect(response.body.data.user.isAdmin).toBe(false);
    expect(response.body.data.user.role).toBe("USER");
    expect(response.body.data.accessToken).toBeDefined();
  });

  it("should login an existing user", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "user@techkraft.com",
      password: "Password123!",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.email).toBe("user@techkraft.com");
    expect(response.body.data.accessToken).toBeDefined();
  });

  it("should return current authenticated user", async () => {
    const loginResponse = await request(app).post("/api/auth/login").send({
      email: "user@techkraft.com",
      password: "Password123!",
    });

    const token = loginResponse.body.data.accessToken;

    const meResponse = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(meResponse.status).toBe(200);
    expect(meResponse.body.success).toBe(true);
    expect(meResponse.body.data.user.email).toBe("user@techkraft.com");
    expect(meResponse.body.data.user.isAdmin).toBe(false);
  });
});