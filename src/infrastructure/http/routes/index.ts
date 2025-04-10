import { Router } from "express";
import { shortUrlsRoutes } from "./short-urls.routes";
import { redirectRoutes } from "./redirect.routes";

const router = Router();

router.use("/short-urls", shortUrlsRoutes);
router.use("/", redirectRoutes);

export { router };
