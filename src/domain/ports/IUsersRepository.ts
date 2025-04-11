import type { IUser } from "../entities/User";

export interface IUsersRepository {
  create(username: string, password: string): Promise<IUser>;
  findByUsername(username: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
}
