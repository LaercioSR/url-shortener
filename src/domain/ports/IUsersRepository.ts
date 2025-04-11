import type { IUser } from "../entities/User";

export interface IUsersRepository {
  create(email: string, password: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
}
