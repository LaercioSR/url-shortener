import { generateRandomCode } from "../shared/utils/generate-random-code";
import type { IShortUrlsRepository } from "../domain/ports/IShortUrlsRepository";
import { ShortUrlsRepository } from "../infrastructure/database/typeorm/repositories/ShortUrlsRepository";

export class CreateShortUrl {
  private shortUrlsRepository: IShortUrlsRepository;

  constructor() {
    this.shortUrlsRepository = new ShortUrlsRepository();
  }

  async execute(original_url: string, user_id?: string) {
    let id: string;
    let idAlreadyUsed;
    do {
      id = generateRandomCode();
      idAlreadyUsed = await this.shortUrlsRepository.findById(id);
    } while (idAlreadyUsed);

    const shortUrl = await this.shortUrlsRepository.create({
      id,
      original_url,
      user_id,
    });

    return shortUrl;
  }
}
