import type { IShortUrl } from "../domain/entities/ShortUrl";
import type { IShortUrlsRepository } from "../domain/ports/IShortUrlsRepository";
import { ShortUrlsRepository } from "../infrastructure/database/typeorm/repositories/ShortUrlsRepository";

export class GetShortUrlById {
  private shortUrlsRepository: IShortUrlsRepository;

  constructor() {
    this.shortUrlsRepository = new ShortUrlsRepository();
  }

  async execute(id: string): Promise<IShortUrl | null> {
    const shortUrl = await this.shortUrlsRepository.findById(id);
    return shortUrl;
  }
}
