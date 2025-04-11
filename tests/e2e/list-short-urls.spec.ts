import request from "supertest";
import { Express } from "express";
import { buildApp } from "../../src/infrastructure/http/server/buildApp";
import {
  clearDatabase,
  destroyDataSource,
  initializeDataSource,
} from "../../src/infrastructure/database/typeorm/data-source";

let app: Express;

describe("List Short URLs by Uber", () => {
  beforeAll(async () => {
    await initializeDataSource();
    app = await buildApp();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await destroyDataSource();
  });

  it("should list short URLs", async () => {
    const email = "testuser";
    const password = "testpassword";

    const createResponse = await request(app)
      .post("/auth")
      .send({ email, password });

    const userId = createResponse.body.id;

    const loginResponse = await request(app)
      .post("/auth/login")
      .send({ email, password });

    const token = loginResponse.body.token;

    await request(app)
      .post("/short-urls")
      .set("Authorization", token)
      .send({ url: "https://example.com" });

    const response = await request(app)
      .get("/short-urls")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body.shortUrls).toEqual([
      {
        id: expect.any(String),
        original_url: "https://example.com",
        click_count: 0,
        user_id: userId,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
    ]);
  });

  it("should return 401 if not authenticated", async () => {
    const response = await request(app).get("/short-urls");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Missing authentication token!",
      code: "MISSING_AUTH_TOKEN",
    });
  });

  it("should return 401 if invalid token", async () => {
    const response = await request(app)
      .get("/short-urls")
      .set("Authorization", "Bearer invalidtoken");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid authentication token!",
      code: "INVALID_AUTH_TOKEN",
    });
  });
});
