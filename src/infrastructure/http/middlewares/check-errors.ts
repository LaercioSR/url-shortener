import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../domain/errors/AppError";

export default function checkError(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log(err);
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      message: err.message,
      code: err.code,
    });
    return;
  }

  console.error(err);

  response.status(500).json({
    message: "Internal server error",
  });
  return;
}
