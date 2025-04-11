import { Router } from "express";

import { CreateShortUrlController } from "../controllers/create-short-url-controller";
import { ensureOptionalAuthenticated } from "../middlewares/ensure-optional-authenticated";
import { ListShortUrlsController } from "../controllers/list-short-urls-controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";
import { DeleteShortUrlController } from "../controllers/delete-short-url-controller";
import { UpdateShortUrlController } from "../controllers/update-short-url-controller";

export const shortUrlsRoutes = Router();

const createShortUrlController = new CreateShortUrlController();
const deleteShortUrlController = new DeleteShortUrlController();
const listShortUrlsController = new ListShortUrlsController();
const updateShortUrlController = new UpdateShortUrlController();

shortUrlsRoutes.get("/", ensureAuthenticated, listShortUrlsController.handle);
shortUrlsRoutes.post(
  "/",
  ensureOptionalAuthenticated,
  createShortUrlController.handle,
);
shortUrlsRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteShortUrlController.handle,
);
shortUrlsRoutes.patch(
  "/:id",
  ensureAuthenticated,
  updateShortUrlController.handle,
);
