import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../../../infrastructure/database/typeorm/repositories/UsersRepository";
import auth from "../../../config/auth";

interface IPayload {
  sub: string;
}

export async function ensureOptionalAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    // Se não houver token, prossiga sem autenticação
    return next();
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return next(); // Prossiga sem autenticação
  }

  try {
    const { sub: usersId } = verify(token, auth.secretToken) as IPayload;

    const userRepository = new UsersRepository();
    const users = await userRepository.findById(usersId);

    if (users) {
      request.user = {
        id: usersId,
      };
    }

    next();
  } catch {
    // Se o token for inválido, prossiga sem autenticação
    next();
  }
}
