import {
  clearDatabase,
  destroyDataSource,
  initializeDataSource,
} from "../../src/infrastructure/database/typeorm/data-source";
import type { IShortUrlsRepository } from "../../src/domain/ports/IShortUrlsRepository";
import { ShortUrlsRepository } from "../../src/infrastructure/database/typeorm/repositories/ShortUrlsRepository";
import { UsersRepository } from "../../src/infrastructure/database/typeorm/repositories/UsersRepository";
import type { ICreateShortUrlDTO } from "../../src/domain/ports/ICreateShortUrlDTO";

let shortUrlsRepository: IShortUrlsRepository;

describe("Short URLs", () => {
  beforeAll(async () => {
    await initializeDataSource();
    shortUrlsRepository = new ShortUrlsRepository();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await destroyDataSource();
  });

  it("should create a short URL", async () => {
    const id = "abc123";
    const originalUrl = "https://example.com";

    const shortUrl = await shortUrlsRepository.create({
      id,
      original_url: originalUrl,
    });
    expect(shortUrl).toBeDefined();
    expect(shortUrl.id).toBe(id);
    expect(shortUrl.original_url).toBe(originalUrl);
    expect(shortUrl.click_count).toBe(0);
  });

  it("should throw error when creating without original_url", async () => {
    await expect(
      shortUrlsRepository.create({ id: "no-url" } as ICreateShortUrlDTO),
    ).rejects.toThrow();
  });

  it("should create a short URL with user_id", async () => {
    const usersRepository = new UsersRepository();
    const user = await usersRepository.create("testuser", "testpassword");

    const shortUrl = await shortUrlsRepository.create({
      id: "user123",
      original_url: "https://user.example.com",
      user_id: user.id,
    });

    expect(shortUrl.user_id).toBe(user.id);
  });

  it("should find a short URL by ID", async () => {
    const id = "abc123";
    const originalUrl = "https://example.com";

    await shortUrlsRepository.create({ id, original_url: originalUrl });

    const foundShortUrl = await shortUrlsRepository.findById(id);
    expect(foundShortUrl).toBeDefined();
    expect(foundShortUrl!.id).toBe(id);
    expect(foundShortUrl!.original_url).toBe(originalUrl);
  });

  it("should return null when short URL non-existent", async () => {
    const id = "nonexistent";

    const foundShortUrl = await shortUrlsRepository.findById(id);
    expect(foundShortUrl).toBeNull();
  });

  it("should update click count", async () => {
    const id = "abc123";
    const originalUrl = "https://example.com";

    await shortUrlsRepository.create({ id, original_url: originalUrl });

    await shortUrlsRepository.updateClickCount(id);

    const updatedShortUrl = await shortUrlsRepository.findById(id);
    expect(updatedShortUrl).toBeDefined();
    expect(updatedShortUrl!.click_count).toBe(1);
  });

  it("should increment click count multiple times", async () => {
    const id = "multi-click";
    await shortUrlsRepository.create({
      id,
      original_url: "https://multi.example.com",
    });

    await shortUrlsRepository.updateClickCount(id);
    await shortUrlsRepository.updateClickCount(id);

    const updated = await shortUrlsRepository.findById(id);
    expect(updated?.click_count).toBe(2);
  });

  it("should not update click count for non-existent short URL", async () => {
    const id = "nonexistent";

    await shortUrlsRepository.updateClickCount(id);

    const foundShortUrl = await shortUrlsRepository.findById(id);
    expect(foundShortUrl).toBeNull();
  });

  it("should list short URLs by user ID", async () => {
    const usersRepository = new UsersRepository();
    const user = await usersRepository.create("testuser", "testpassword");

    const shortUrl1 = await shortUrlsRepository.create({
      id: "abc123",
      original_url: "https://example.com",
      user_id: user.id,
    });
    const shortUrl2 = await shortUrlsRepository.create({
      id: "def456",
      original_url: "https://example.org",
      user_id: user.id,
    });

    const shortUrls = await shortUrlsRepository.listByUserId(user.id);
    expect(shortUrls).toHaveLength(2);
    expect(shortUrls[0].id).toBe(shortUrl1.id);
    expect(shortUrls[1].id).toBe(shortUrl2.id);
  });

  it("should return an empty list when no short URLs for user", async () => {
    const usersRepository = new UsersRepository();
    const user = await usersRepository.create("testuser", "testpassword");

    const shortUrls = await shortUrlsRepository.listByUserId(user.id);
    expect(shortUrls).toHaveLength(0);
  });
});
