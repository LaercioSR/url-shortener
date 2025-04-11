import { hash } from "bcryptjs";
import type { IUsersRepository } from "../domain/ports/IUsersRepository";
import { UsersRepository } from "../infrastructure/database/typeorm/repositories/UsersRepository";
import { AppError } from "../domain/errors/AppError";

export class CreateUser {
  private usersRepository: IUsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(username: string, password: string) {
    const userAlreadyExists =
      await this.usersRepository.findByUsername(username);
    if (userAlreadyExists) {
      throw new AppError(
        `The username '${username}' is already taken.`,
        "USERNAME_IN_USE",
        409,
      );
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create(username, passwordHash);

    return user;
  }
}
