import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import type { IShortUrl } from "../../../../domain/entities/ShortUrl";

@Entity()
export class ShortUrl implements IShortUrl {
  @PrimaryColumn()
  id: string;

  @Column({ name: "original_url" })
  originalUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  constructor(id: string, originalUrl: string) {
    this.id = id;
    this.originalUrl = originalUrl;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = undefined;
  }
}
