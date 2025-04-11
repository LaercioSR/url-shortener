import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../domain/errors/AppError";
import { UsersRepository } from "../../../infrastructure/database/typeorm/repositories/UsersRepository";
import auth from "../../../config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(
      "Missing authentication token!",
      "MISSING_AUTH_TOKEN",
      401,
    );
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError(
      "Missing authentication token!",
      "MISSING_AUTH_TOKEN",
      401,
    );
  }

  try {
    const { sub: usersId } = verify(token, auth.secretToken) as IPayload;

    const userRepository = new UsersRepository();
    const users = userRepository.findById(usersId);

    if (!users) {
      throw new AppError(
        "Invalid authentication token!",
        "INVALID_AUTH_TOKEN",
        401,
      );
    }

    request.user = {
      id: usersId,
    };

    next();
  } catch {
    throw new AppError(
      "Invalid authentication token!",
      "INVALID_AUTH_TOKEN",
      401,
    );
  }
}
