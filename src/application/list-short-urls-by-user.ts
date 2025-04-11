import type { IShortUrl } from "../domain/entities/ShortUrl";
import type { IShortUrlsRepository } from "../domain/ports/IShortUrlsRepository";
import { ShortUrlsRepository } from "../infrastructure/database/typeorm/repositories/ShortUrlsRepository";

export class ListShortUrlsByUser {
  private shortUrlsRepository: IShortUrlsRepository;

  constructor() {
    this.shortUrlsRepository = new ShortUrlsRepository();
  }

  async execute(userId: string): Promise<IShortUrl[]> {
    const shortUrls = await this.shortUrlsRepository.listByUserId(userId);
    return shortUrls;
  }
}
