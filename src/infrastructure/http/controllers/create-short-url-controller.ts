import { Request, Response } from "express";
import { validateUrl } from "../../../shared/utils/validate-url";
import { CreateShortUrl } from "../../../application/create-short-url";
import { AppError } from "../../../domain/errors/AppError";

export class CreateShortUrlController {
  async handle(request: Request, response: Response) {
    const { url: original_url } = request.body;

    if (!original_url) {
      throw new AppError("Missing original_url", "MISSING_ORIGIN_URL", 400);
    }

    const isValidUrl = validateUrl(original_url);
    if (!isValidUrl) {
      throw new AppError("Invalid URL", "INVALID_URL", 400);
    }

    const shortUrlService = new CreateShortUrl();

    const shortUrl = await shortUrlService.execute(original_url);

    const appUrl = process.env.APP_API_URL || "http://localhost:3000";

    response.status(201).json({
      short_url: `${appUrl}/${shortUrl.id}`,
    });
  }
}
