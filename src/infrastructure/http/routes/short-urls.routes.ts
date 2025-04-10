import { Router } from "express";

import { CreateShortUrlController } from "../controllers/create-short-url-controller";

export const shortUrlsRoutes = Router();

const createShortUrlController = new CreateShortUrlController();

shortUrlsRoutes.post("/", createShortUrlController.handle);
