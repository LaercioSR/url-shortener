import { Request, Response } from "express";
import { CreateUser } from "../../../application/create-user";
import { AppError } from "../../../domain/errors/AppError";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    if (!username || !password) {
      throw new AppError(
        "Missing username or password",
        "MISSING_USERNAME_PASSWORD",
        400,
      );
    }

    const userService = new CreateUser();

    const user = await userService.execute(username, password);

    response.status(201).json({
      id: user.id,
      username: user.username,
      created_at: user.created_at,
    });
  }
}
