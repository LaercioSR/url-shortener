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
    const email = "testuser";
    const password = "testpassword";

    const response = await request(app).post("/auth").send({ email, password });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe(email);
    expect(response.body.created_at).toBeDefined();
    expect(response.body.password).toBeUndefined();
  });

  it("should return 400 if email is missing", async () => {
    const response = await request(app)
      .post("/auth")
      .send({ password: "testpassword" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Missing email or password",
      code: "MISSING_EMAIL_PASSWORD",
    });
  });

  it("should return 400 if password is missing", async () => {
    const response = await request(app)
      .post("/auth")
      .send({ email: "testuser" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Missing email or password",
      code: "MISSING_EMAIL_PASSWORD",
    });
  });

  it("should return 400 if email is empty", async () => {
    const response = await request(app)
      .post("/auth")
      .send({ email: "", password: "testpassword" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Missing email or password",
      code: "MISSING_EMAIL_PASSWORD",
    });
  });

  it("should return 400 if password is empty", async () => {
    const response = await request(app)
      .post("/auth")
      .send({ email: "testuser", password: "" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Missing email or password",
      code: "MISSING_EMAIL_PASSWORD",
    });
  });

  it("should return 409 if email is already in use", async () => {
    const email = "testuser";
    const password = "testpassword";

    await request(app).post("/auth").send({ email, password });

    const response = await request(app)
      .post("/auth")
      .send({ email, password: "anotherpassword" });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      message: `The email '${email}' is already taken.`,
      code: "EMAIL_IN_USE",
    });
  });
});
