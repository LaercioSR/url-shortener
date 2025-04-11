import { Request, Response } from "express";
import { CreateUser } from "../../../application/create-user";
import { AppError } from "../../../domain/errors/AppError";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      throw new AppError(
        "Missing email or password",
        "MISSING_EMAIL_PASSWORD",
        400,
      );
    }

    const userService = new CreateUser();

    const user = await userService.execute(email, password);

    response.status(201).json({
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    });
  }
}
