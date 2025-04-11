import {
  clearDatabase,
  destroyDataSource,
  initializeDataSource,
} from "../../src/infrastructure/database/typeorm/data-source";
import type { IUsersRepository } from "../../src/domain/ports/IUsersRepository";
import { UsersRepository } from "../../src/infrastructure/database/typeorm/repositories/UsersRepository";

let usersRepository: IUsersRepository;

describe("Users", () => {
  beforeAll(async () => {
    await initializeDataSource();
    usersRepository = new UsersRepository();
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

    const user = await usersRepository.create(email, password);
    expect(user).toBeDefined();
    expect(user.email).toBe(email);
    expect(user.created_at).toBeInstanceOf(Date);
  });

  it("should find an user by email", async () => {
    const email = "testuser";
    const password = "testpassword";

    const user = await usersRepository.create(email, password);

    const foundUser = await usersRepository.findByEmail(email);
    expect(foundUser).toBeDefined();
    expect(foundUser!.id).toBe(user.id);
    expect(foundUser!.email).toBe(email);
  });

  it("should return null when user non-existent", async () => {
    const email = "nonexistent";

    const foundUser = await usersRepository.findByEmail(email);
    expect(foundUser).toBeNull();
  });
});
