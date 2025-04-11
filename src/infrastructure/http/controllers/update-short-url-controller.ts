import { Request, Response } from "express";
import { UpdateShortUrl } from "../../../application/update-short-url";
import { GetShortUrlById } from "../../../application/get-short-url-by-id";
import { AppError } from "../../../domain/errors/AppError";

export class UpdateShortUrlController {
  async handle(request: Request, response: Response) {
    const { id: shortUrlId } = request.params;
    const { id: userId } = request.user;
    const { url } = request.body;

    const getShortUrlService = new GetShortUrlById();
    const shortUrl = await getShortUrlService.execute(shortUrlId);

    if (!shortUrl || shortUrl.user_id !== userId) {
      throw new AppError("Short URL not found", "SHORT_URL_NOT_FOUND", 404);
    }

    if (!url) {
      throw new AppError("URL is required", "URL_REQUIRED", 400);
    }

    const updateShortUrlService = new UpdateShortUrl();
    await updateShortUrlService.execute(shortUrlId, url);

    response.status(204).send();
  }
}
