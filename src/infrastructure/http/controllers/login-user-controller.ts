import { Request, Response } from "express";
import { LoginUser } from "../../../application/login-user";
import { AppError } from "../../../domain/errors/AppError";

export class LoginUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    if (!username || !password) {
      throw new AppError(
        "Missing username or password",
        "MISSING_USERNAME_PASSWORD",
        400,
      );
    }

    const loginService = new LoginUser();

    const token = await loginService.execute(username, password);

    response.status(200).json({ token: `Bearer ${token}` });
  }
}
