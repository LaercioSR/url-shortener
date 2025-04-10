import {
  clearDatabase,
  destroyDataSource,
  initializeDataSource,
} from "../../src/infrastructure/database/typeorm/data-source";
import type { IShortUrlsRepository } from "../../src/domain/ports/IShortUrlsRepository";
import { ShortUrlsRepository } from "../../src/infrastructure/database/typeorm/repositories/ShortUrlsRepository";

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

    const shortUrl = await shortUrlsRepository.create(id, originalUrl);
    expect(shortUrl).toBeDefined();
    expect(shortUrl.id).toBe(id);
    expect(shortUrl.originalUrl).toBe(originalUrl);
  });

  it("should find a short URL by ID", async () => {
    const id = "abc123";
    const originalUrl = "https://example.com";

    await shortUrlsRepository.create(id, originalUrl);

    const foundShortUrl = await shortUrlsRepository.findById(id);
    expect(foundShortUrl).toBeDefined();
    expect(foundShortUrl!.id).toBe(id);
    expect(foundShortUrl!.originalUrl).toBe(originalUrl);
  });

  it("should return null when short URL non-existent", async () => {
    const id = "nonexistent";

    const foundShortUrl = await shortUrlsRepository.findById(id);
    expect(foundShortUrl).toBeNull();
  });
});
