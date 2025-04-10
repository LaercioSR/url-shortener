import type { IShortUrl } from "../entities/ShortUrl";

export interface IShortUrlsRepository {
  create(id: string, originalUrl: string): Promise<IShortUrl>;
  findById(id: string): Promise<IShortUrl | null>;
}
