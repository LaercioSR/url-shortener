export interface IShortUrl {
  id: string;
  originalUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
