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
    const username = "testuser";
    const password = "testpassword";

    const user = await usersRepository.create(username, password);
    expect(user).toBeDefined();
    expect(user.username).toBe(username);
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it("should find an user by username", async () => {
    const username = "testuser";
    const password = "testpassword";

    const user = await usersRepository.create(username, password);

    const foundUser = await usersRepository.findByUsername(username);
    expect(foundUser).toBeDefined();
    expect(foundUser!.id).toBe(user.id);
    expect(foundUser!.username).toBe(username);
  });

  it("should return null when user non-existent", async () => {
    const username = "nonexistent";

    const foundUser = await usersRepository.findByUsername(username);
    expect(foundUser).toBeNull();
  });
});
