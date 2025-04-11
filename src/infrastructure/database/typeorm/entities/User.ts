import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import type { IUser } from "../../../../domain/entities/User";
import { ShortUrl } from "./ShortUrl";

@Entity({
  name: "users",
})
export class User implements IUser {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at?: Date;

  @OneToMany(() => ShortUrl, (ShortUrl) => ShortUrl.user)
  shortUrls!: ShortUrl[];

  constructor(email: string, password: string) {
    this.id = uuidV4();
    this.email = email;
    this.password = password;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.deleted_at = undefined;
  }
}
