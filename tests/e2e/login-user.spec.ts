import request from "supertest";
import { Express } from "express";
import { buildApp } from "../../src/infrastructure/http/server/buildApp";
import {
  clearDatabase,
  destroyDataSource,
  initializeDataSource,
} from "../../src/infrastructure/database/typeorm/data-source";

let app: Express;

describe("Login User", () => {
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

  it("should login a user", async () => {
    const username = "testuser";
    const password = "testpassword";

    await request(app).post("/auth").send({ username, password });

    const response = await request(app)
      .post("/auth/login")
      .send({ username, password });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.token).toMatch(/^Bearer /);
  });

  it("should return 400 if username is missing", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ password: "testpassword" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Missing username or password",
      code: "MISSING_USERNAME_PASSWORD",
    });
  });

  it("should return 400 if password is missing", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username: "testuser" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Missing username or password",
      code: "MISSING_USERNAME_PASSWORD",
    });
  });

  it("should return 401 if username non-existent", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username: "wronguser", password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Username or password incorrect!",
      code: "INVALID_USERNAME_PASSWORD",
    });
  });

  it("should return 401 if password is incorrect", async () => {
    const username = "testuser";
    const password = "testpassword";

    await request(app).post("/auth").send({ username, password });

    const response = await request(app)
      .post("/auth/login")
      .send({ username, password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Username or password incorrect!",
      code: "INVALID_USERNAME_PASSWORD",
    });
  });
});
