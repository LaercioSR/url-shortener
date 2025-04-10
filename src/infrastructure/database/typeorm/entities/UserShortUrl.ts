import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import type { IUserShortUrl } from "../../../../domain/entities/UserShortUrl";

@Entity({
  name: "users_short_urls",
})
export class UserShortUrl implements IUserShortUrl {
  @PrimaryColumn({ name: "user_id" })
  userId: string;

  @PrimaryColumn({ name: "short_url_id" })
  shortUrlId: string;

  @Column()
  click_count: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  constructor(userId: string, shortUrlId: string) {
    this.userId = userId;
    this.shortUrlId = shortUrlId;
    this.click_count = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = undefined;
  }
}
