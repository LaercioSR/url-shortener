import request from "supertest";
import { Express } from "express";
import { buildApp } from "../../src/infrastructure/http/server/buildApp";
import {
  clearDatabase,
  destroyDataSource,
  initializeDataSource,
} from "../../src/infrastructure/database/typeorm/data-source";

let app: Express;

describe("Update Short URL", () => {
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

  it("should update a short URL", async () => {
    // Create a user and login to get the token
    const username = "testuser";
    const password = "testpassword";

    await request(app).post("/auth").send({ username, password });
    const loginResponse = await request(app)
      .post("/auth/login")
      .send({ username, password });

    const token = loginResponse.body.token;

    // Create a short URL using the token
    const originalUrl = "https://example.com";
    const shortUrlResponse = await request(app)
      .post("/short-urls")
      .set("Authorization", token)
      .send({ url: originalUrl });

    const shortUrlId = shortUrlResponse.body.short_url.split("/").pop();

    // Verify that the short URL was created
    const responseList = await request(app)
      .get("/short-urls")
      .set("Authorization", token);

    expect(responseList.body.shortUrls).toEqual([
      {
        id: expect.any(String),
        original_url: originalUrl,
        click_count: 0,
        user_id: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
    ]);

    // Update the short URL
    const updatedUrl = "https://updated-example.com";
    const updateResponse = await request(app)
      .patch(`/short-urls/${shortUrlId}`)
      .set("Authorization", token)
      .send({ url: updatedUrl });

    expect(updateResponse.status).toBe(204);

    // Verify that the short URL no longer exists
    const responseListUpdated = await request(app)
      .get("/short-urls")
      .set("Authorization", token);

    expect(responseListUpdated.body.shortUrls).toEqual([
      {
        id: expect.any(String),
        original_url: updatedUrl,
        click_count: 0,
        user_id: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
    ]);
  });

  it("should return 404 if the short URL does not exist", async () => {
    // Create a user and login to get the token
    const username = "testuser";
    const password = "testpassword";

    await request(app).post("/auth").send({ username, password });
    const loginResponse = await request(app)
      .post("/auth/login")
      .send({ username, password });

    const token = loginResponse.body.token;

    // Attempt to update a non-existent short URL
    const nonExistentShortUrlId = "nonexistentid";
    const updateResponse = await request(app)
      .patch(`/short-urls/${nonExistentShortUrlId}`)
      .set("Authorization", token)
      .send({ url: "https://updated-example.com" });
    expect(updateResponse.status).toBe(404);
  });

  it("should return 404 if the short URL is belonging to another user", async () => {
    // Create a user and login to get the token
    const username = "testuser";
    const password = "testpassword";

    await request(app).post("/auth").send({ username, password });
    const loginResponse = await request(app)
      .post("/auth/login")
      .send({ username, password });

    const token = loginResponse.body.token;

    // Create a short URL using the token
    const originalUrl = "https://example.com";
    const shortUrlResponse = await request(app)
      .post("/short-urls")
      .set("Authorization", token)
      .send({ url: originalUrl });

    const shortUrlId = shortUrlResponse.body.short_url.split("/").pop();

    // Create another user and login to get another token
    const anotherUsername = "anotheruser";
    const anotherPassword = "anotherpassword";

    await request(app).post("/auth").send({
      username: anotherUsername,
      password: anotherPassword,
    });
    const anotherLoginResponse = await request(app)
      .post("/auth/login")
      .send({ username: anotherUsername, password: anotherPassword });

    const anotherToken = anotherLoginResponse.body.token;

    // Attempt to update the short URL with the second user's token
    const updateResponse = await request(app)
      .patch(`/short-urls/${shortUrlId}`)
      .set("Authorization", anotherToken)
      .send({ url: "https://updated-example.com" });
    expect(updateResponse.status).toBe(404);
  });

  it("should return 401 if the user is not authorized", async () => {
    // Attempt to update a short URL without authorization
    const shortUrlId = "someShortUrlId";
    const updateResponse = await request(app)
      .patch(`/short-urls/${shortUrlId}`)
      .set("Authorization", "invalidtoken")
      .send({ url: "https://updated-example.com" });

    expect(updateResponse.status).toBe(401);
  });

  it("should return 401 if the user is not logged in", async () => {
    // Attempt to update a short URL without logging in
    const shortUrlId = "someShortUrlId";
    const updateResponse = await request(app)
      .patch(`/short-urls/${shortUrlId}`)
      .send({ url: "https://updated-example.com" });

    expect(updateResponse.status).toBe(401);
  });
});
