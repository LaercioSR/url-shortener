import type { IShortUrl } from "src/domain/entities/ShortUrl";
import type { IShortUrlsRepository } from "../../../../domain/ports/IShortUrlsRepository";
import type { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ShortUrl } from "../entities/ShortUrl";

export class ShortUrlsRepository implements IShortUrlsRepository {
  private repository: Repository<ShortUrl>;

  constructor() {
    this.repository = AppDataSource.getRepository(ShortUrl);
  }

  async create(id: string, originalUrl: string): Promise<IShortUrl> {
    const shortUrl = new ShortUrl(id, originalUrl);
    await this.repository.save(shortUrl);
    return shortUrl;
  }

  async findById(id: string): Promise<IShortUrl | null> {
    return this.repository.findOne({
      where: { id },
    });
  }
}
