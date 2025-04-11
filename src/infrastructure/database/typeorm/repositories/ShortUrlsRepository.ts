import type { IShortUrl } from "src/domain/entities/ShortUrl";
import type { IShortUrlsRepository } from "../../../../domain/ports/IShortUrlsRepository";
import type { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ShortUrl } from "../entities/ShortUrl";
import type { ICreateShortUrlDTO } from "src/domain/ports/ICreateShortUrlDTO";

export class ShortUrlsRepository implements IShortUrlsRepository {
  private repository: Repository<ShortUrl>;

  constructor() {
    this.repository = AppDataSource.getRepository(ShortUrl);
  }

  async create({
    id,
    original_url,
    user_id,
  }: ICreateShortUrlDTO): Promise<IShortUrl> {
    const shortUrl = new ShortUrl(id, original_url, user_id);
    await this.repository.save(shortUrl);
    return shortUrl;
  }

  async findById(id: string): Promise<IShortUrl | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async listByUserId(userId: string): Promise<IShortUrl[]> {
    return this.repository.find({
      where: { user_id: userId },
    });
  }

  async updateClickCount(id: string): Promise<void> {
    await this.repository.increment({ id }, "click_count", 1);
  }
}
