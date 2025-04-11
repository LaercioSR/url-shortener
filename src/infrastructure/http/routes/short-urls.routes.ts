import { Router } from "express";

import { CreateShortUrlController } from "../controllers/create-short-url-controller";
import { ensureOptionalAuthenticated } from "../middlewares/ensure-optional-authenticated";

export const shortUrlsRoutes = Router();

const createShortUrlController = new CreateShortUrlController();

shortUrlsRoutes.post(
  "/",
  ensureOptionalAuthenticated,
  createShortUrlController.handle,
);
