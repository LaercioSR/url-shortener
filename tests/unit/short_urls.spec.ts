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
    expect(shortUrl.original_url).toBe(originalUrl);
    expect(shortUrl.click_count).toBe(0);
  });

  it("should find a short URL by ID", async () => {
    const id = "abc123";
    const originalUrl = "https://example.com";

    await shortUrlsRepository.create(id, originalUrl);

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

    await shortUrlsRepository.create(id, originalUrl);

    await shortUrlsRepository.updateClickCount(id);

    const updatedShortUrl = await shortUrlsRepository.findById(id);
    expect(updatedShortUrl).toBeDefined();
    expect(updatedShortUrl!.click_count).toBe(1);
  });

  it("should not update click count for non-existent short URL", async () => {
    const id = "nonexistent";

    await shortUrlsRepository.updateClickCount(id);

    const foundShortUrl = await shortUrlsRepository.findById(id);
    expect(foundShortUrl).toBeNull();
  });
});
