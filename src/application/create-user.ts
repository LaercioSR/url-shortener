import { hash } from "bcryptjs";
import type { IUsersRepository } from "../domain/ports/IUsersRepository";
import { UsersRepository } from "../infrastructure/database/typeorm/repositories/UsersRepository";
import { AppError } from "../domain/errors/AppError";

export class CreateUser {
  private usersRepository: IUsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(email: string, password: string) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError(
        `The email '${email}' is already taken.`,
        "EMAIL_IN_USE",
        409,
      );
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create(email, passwordHash);

    return user;
  }
}
