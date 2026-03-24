import request from "supertest";
import { app } from "../../src/app";

export async function loginAsAdmin() {
  const response = await request(app).post("/api/auth/login").send({
    email: "admin@techkraft.com",
    password: "Password123!",
  });

  return response.body.data.accessToken as string;
}

export async function loginAsUser() {
  const response = await request(app).post("/api/auth/login").send({
    email: "user@techkraft.com",
    password: "Password123!",
  });

  return response.body.data.accessToken as string;
}