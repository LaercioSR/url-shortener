import type { IUsersRepository } from "../domain/ports/IUsersRepository";
import { UsersRepository } from "../infrastructure/database/typeorm/repositories/UsersRepository";
import { AppError } from "../domain/errors/AppError";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import auth from "../config/auth";

export class LoginUser {
  private usersRepository: IUsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        "Email or password incorrect!",
        "INVALID_EMAIL_PASSWORD",
        401,
      );
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError(
        "Email or password incorrect!",
        "INVALID_EMAIL_PASSWORD",
        401,
      );
    }

    const token = sign({}, auth.secretToken, {
      subject: user.id,
      expiresIn: auth.expiresInToken,
    });

    return token;
  }
}
