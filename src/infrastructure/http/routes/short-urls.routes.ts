import { Router } from "express";

import { CreateShortUrlController } from "../controllers/create-short-url-controller";
import { ensureOptionalAuthenticated } from "../middlewares/ensure-optional-authenticated";
import { ListShortUrlsController } from "../controllers/list-short-urls-controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";

export const shortUrlsRoutes = Router();

const createShortUrlController = new CreateShortUrlController();
const listShortUrlsController = new ListShortUrlsController();

shortUrlsRoutes.get("/", ensureAuthenticated, listShortUrlsController.handle);
shortUrlsRoutes.post(
  "/",
  ensureOptionalAuthenticated,
  createShortUrlController.handle,
);
