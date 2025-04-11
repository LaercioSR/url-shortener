import type { IShortUrl } from "../entities/ShortUrl";
import type { ICreateShortUrlDTO } from "./ICreateShortUrlDTO";

export interface IShortUrlsRepository {
  create(data: ICreateShortUrlDTO): Promise<IShortUrl>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<IShortUrl | null>;
  listByUserId(userId: string): Promise<IShortUrl[]>;
  updateClickCount(id: string): Promise<void>;
  updateOriginalUrl(id: string, originalUrl: string): Promise<void>;
}
