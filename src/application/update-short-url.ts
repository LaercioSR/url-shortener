import type { IShortUrlsRepository } from "../domain/ports/IShortUrlsRepository";
import { ShortUrlsRepository } from "../infrastructure/database/typeorm/repositories/ShortUrlsRepository";

export class UpdateShortUrl {
  private shortUrlsRepository: IShortUrlsRepository;

  constructor() {
    this.shortUrlsRepository = new ShortUrlsRepository();
  }

  async execute(id: string, originalUrl: string): Promise<void> {
    await this.shortUrlsRepository.updateOriginalUrl(id, originalUrl);
  }
}
