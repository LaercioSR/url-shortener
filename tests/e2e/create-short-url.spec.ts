import request from "supertest";
import { Express } from "express";
import { buildApp } from "../../src/infrastructure/http/server/buildApp";
import {
  clearDatabase,
  destroyDataSource,
  initializeDataSource,
} from "../../src/infrastructure/database/typeorm/data-source";

let app: Express;

describe("Create Short URL", () => {
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

  it("should create a short URL", async () => {
    const originalUrl = "https://example.com";

    const response = await request(app)
      .post("/short-urls")
      .send({ url: originalUrl });

    expect(response.status).toBe(201);
    expect(response.body.short_url).toMatch(/http:\/\/localhost:\d+\/\w+/);
  });
});
