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

  async create(email: string, password: string): Promise<IUser> {
    const user = new User(email, password);
    await this.repository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.repository.findOne({
      where: { email },
    });
  }

  async findById(id: string): Promise<IUser | null> {
    return this.repository.findOne({
      where: { id },
    });
  }
}
