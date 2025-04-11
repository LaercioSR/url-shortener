import request from "supertest";
import { Express } from "express";
import { buildApp } from "../../src/infrastructure/http/server/buildApp";
import {
  clearDatabase,
  destroyDataSource,
  initializeDataSource,
} from "../../src/infrastructure/database/typeorm/data-source";

let app: Express;

describe("Create User", () => {
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

  it("should create a user", async () => {
    const username = "testuser";
    const password = "testpassword";

    const response = await request(app)
      .post("/auth")
      .send({ username, password });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe(username);
    expect(response.body.created_at).toBeDefined();
    expect(response.body.password).toBeUndefined();
  });

  it("should return 400 if username is missing", async () => {
    const response = await request(app)
      .post("/auth")
      .send({ password: "testpassword" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Missing username or password",
      code: "MISSING_USERNAME_PASSWORD",
    });
  });

  it("should return 400 if password is missing", async () => {
    const response = await request(app)
      .post("/auth")
      .send({ username: "testuser" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Missing username or password",
      code: "MISSING_USERNAME_PASSWORD",
    });
  });

  it("should return 400 if username is empty", async () => {
    const response = await request(app)
      .post("/auth")
      .send({ username: "", password: "testpassword" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Missing username or password",
      code: "MISSING_USERNAME_PASSWORD",
    });
  });

  it("should return 400 if password is empty", async () => {
    const response = await request(app)
      .post("/auth")
      .send({ username: "testuser", password: "" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Missing username or password",
      code: "MISSING_USERNAME_PASSWORD",
    });
  });

  it("should return 409 if username is already in use", async () => {
    const username = "testuser";
    const password = "testpassword";

    await request(app).post("/auth").send({ username, password });

    const response = await request(app)
      .post("/auth")
      .send({ username, password: "anotherpassword" });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      message: `The username '${username}' is already taken.`,
      code: "USERNAME_IN_USE",
    });
  });
});
