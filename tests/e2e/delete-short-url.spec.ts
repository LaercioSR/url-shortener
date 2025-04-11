import request from "supertest";
import { Express } from "express";
import { buildApp } from "../../src/infrastructure/http/server/buildApp";
import {
  clearDatabase,
  destroyDataSource,
  initializeDataSource,
} from "../../src/infrastructure/database/typeorm/data-source";

let app: Express;

describe("Delete Short URL", () => {
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

  it("should delete a short URL", async () => {
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

    expect(responseList.body.shortUrls.length).toBe(1);

    // Delete the short URL
    const deleteResponse = await request(app)
      .delete(`/short-urls/${shortUrlId}`)
      .set("Authorization", token);

    expect(deleteResponse.status).toBe(204);

    // Verify that the short URL no longer exists
    const responseListUpdated = await request(app)
      .get("/short-urls")
      .set("Authorization", token);

    expect(responseListUpdated.body.shortUrls.length).toBe(0);
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

    // Attempt to delete a non-existent short URL
    const nonExistentShortUrlId = "nonexistentid";
    const deleteResponse = await request(app)
      .delete(`/short-urls/${nonExistentShortUrlId}`)
      .set("Authorization", token);

    expect(deleteResponse.status).toBe(404);
    expect(deleteResponse.body).toEqual({
      message: "Short URL not found",
      code: "SHORT_URL_NOT_FOUND",
    });
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

    // Attempt to delete the short URL with the second user's token
    const deleteResponse = await request(app)
      .delete(`/short-urls/${shortUrlId}`)
      .set("Authorization", anotherToken);

    expect(deleteResponse.status).toBe(404);
    expect(deleteResponse.body).toEqual({
      message: "Short URL not found",
      code: "SHORT_URL_NOT_FOUND",
    });
  });

  it("should return 401 if the user is not authorized", async () => {
    // Attempt to delete a short URL without authorization
    const shortUrlId = "someShortUrlId";
    const deleteResponse = await request(app)
      .delete(`/short-urls/${shortUrlId}`)
      .set("Authorization", "invalidtoken");

    expect(deleteResponse.status).toBe(401);
  });

  it("should return 401 if the user is not logged in", async () => {
    // Attempt to delete a short URL without logging in
    const shortUrlId = "someShortUrlId";
    const deleteResponse = await request(app).delete(
      `/short-urls/${shortUrlId}`,
    );

    expect(deleteResponse.status).toBe(401);
  });
});
