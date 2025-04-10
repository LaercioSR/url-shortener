import { Router } from "express";

import { RedirectUrlController } from "../controllers/redirect-url-controller";

export const redirectRoutes = Router();

const redirectUrlController = new RedirectUrlController();

redirectRoutes.get("/:id", redirectUrlController.handle);
