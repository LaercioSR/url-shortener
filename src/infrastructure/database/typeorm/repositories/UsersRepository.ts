import type { IUser } from "src/domain/entities/User";
import type { IUsersRepository } from "../../../../domain/ports/IUsersRepository";
import type { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(username: string, password: string): Promise<IUser> {
    const user = new User(username, password);
    await this.repository.save(user);
    return user;
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return this.repository.findOne({
      where: { username },
    });
  }

  async findById(id: string): Promise<IUser | null> {
    return this.repository.findOne({
      where: { id },
    });
  }
}
