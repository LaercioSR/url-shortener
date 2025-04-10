import request from "supertest";
import { Express } from "express";
import { buildApp } from "../../src/infrastructure/http/server/buildApp";
import {
  clearDatabase,
  destroyDataSource,
  initializeDataSource,
} from "../../src/infrastructure/database/typeorm/data-source";

let app: Express;

describe("Redirect URL", () => {
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

  it("should redirect to the original URL", async () => {
    const originalUrl = "https://example.com";
    const shortUrlResponse = await request(app)
      .post("/short-urls")
      .send({ url: originalUrl });

    const shortUrl = shortUrlResponse.body.short_url;
    const shortUrlId = shortUrl.split("/").pop();

    const response = await request(app).get(`/${shortUrlId}`);

    expect(response.status).toBe(302);
    expect(response.header.location).toBe(originalUrl);
  });

  it("should return 400 if URL ID is invalid", async () => {
    const response = await request(app).get("/invalid-id");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid URL",
      code: "INVALID_SHORT_URL",
    });
  });

  it("should return 404 if URL not found", async () => {
    const response = await request(app).get("/123456");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "URL not found",
      code: "SHORT_URL_NOT_FOUND",
    });
  });
});
