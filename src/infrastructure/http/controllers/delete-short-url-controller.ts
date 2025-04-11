import { Request, Response } from "express";
import { DeleteShortUrl } from "../../../application/delete-short-url";
import { GetShortUrlById } from "../../../application/get-short-url-by-id";
import { AppError } from "../../../domain/errors/AppError";

export class DeleteShortUrlController {
  async handle(request: Request, response: Response) {
    const { id: shortUrlId } = request.params;
    const { id: userId } = request.user;

    const getShortUrlService = new GetShortUrlById();
    const shortUrl = await getShortUrlService.execute(shortUrlId);

    if (!shortUrl || shortUrl.user_id !== userId) {
      throw new AppError("Short URL not found", "SHORT_URL_NOT_FOUND", 404);
    }

    const deleteShortUrlService = new DeleteShortUrl();
    await deleteShortUrlService.execute(shortUrlId);

    response.status(204).send();
  }
}
