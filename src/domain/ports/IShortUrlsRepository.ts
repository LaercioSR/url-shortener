import type { IShortUrl } from "../entities/ShortUrl";
import type { ICreateShortUrlDTO } from "./ICreateShortUrlDTO";

export interface IShortUrlsRepository {
  create(data: ICreateShortUrlDTO): Promise<IShortUrl>;
  findById(id: string): Promise<IShortUrl | null>;
  updateClickCount(id: string): Promise<null>;
}
