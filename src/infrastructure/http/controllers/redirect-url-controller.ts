import { Request, Response } from "express";
import { AppError } from "../../../domain/errors/AppError";
import { GetShortUrlById } from "../../../application/get-short-url-by-id";

export class RedirectUrlController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const isValidId = /^[a-zA-Z0-9]{6}$/.test(id);
    if (id.length !== 6 || !isValidId) {
      throw new AppError("Invalid URL", "INVALID_SHORT_URL", 400);
    }

    const shortUrlService = new GetShortUrlById();
    const shortUrl = await shortUrlService.execute(id);
    if (!shortUrl) {
      throw new AppError("URL not found", "SHORT_URL_NOT_FOUND", 404);
    }

    response.status(302).redirect(shortUrl.original_url);
  }
}
