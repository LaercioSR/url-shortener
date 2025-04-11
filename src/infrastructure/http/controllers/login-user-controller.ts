import { Request, Response } from "express";
import { LoginUser } from "../../../application/login-user";
import { AppError } from "../../../domain/errors/AppError";

export class LoginUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      throw new AppError(
        "Missing email or password",
        "MISSING_EMAIL_PASSWORD",
        400,
      );
    }

    const loginService = new LoginUser();

    const token = await loginService.execute(email, password);

    response.status(200).json({ token: `Bearer ${token}` });
  }
}
