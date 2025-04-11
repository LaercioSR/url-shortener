import { Request, Response } from "express";
import { ListShortUrlsByUser } from "../../../application/list-short-urls-by-user";

export class ListShortUrlsController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user;

    const listShortUrlsService = new ListShortUrlsByUser();

    const shortUrls = await listShortUrlsService.execute(userId);

    response.status(200).json({ shortUrls });
  }
}
