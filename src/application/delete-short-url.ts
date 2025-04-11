import type { IShortUrlsRepository } from "../domain/ports/IShortUrlsRepository";
import { ShortUrlsRepository } from "../infrastructure/database/typeorm/repositories/ShortUrlsRepository";

export class DeleteShortUrl {
  private shortUrlsRepository: IShortUrlsRepository;

  constructor() {
    this.shortUrlsRepository = new ShortUrlsRepository();
  }

  async execute(id: string): Promise<void> {
    await this.shortUrlsRepository.delete(id);
  }
}
