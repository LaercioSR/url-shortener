import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import type { IShortUrl } from "../../../../domain/entities/ShortUrl";
import { User } from "./User";

@Entity({
  name: "short_urls",
})
export class ShortUrl implements IShortUrl {
  @PrimaryColumn()
  id: string;

  @Column({ name: "original_url" })
  original_url: string;

  @Column()
  click_count: number;

  @Column({
    nullable: true,
  })
  user_id?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at?: Date;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
  })
  user?: User | null;

  constructor(id: string, originalUrl: string, userId?: string) {
    this.id = id;
    this.original_url = originalUrl;
    this.user_id = userId;
    this.click_count = 0;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.deleted_at = undefined;
  }
}
