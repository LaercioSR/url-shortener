export interface IUserShortUrl {
  userId: string;
  shortUrlId: string;
  click_count: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
