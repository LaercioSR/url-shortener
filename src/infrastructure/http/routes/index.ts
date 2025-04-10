import { Router } from "express";
import { shortUrlsRoutes } from "./short-urls.routes";

const router = Router();

router.use("/short-urls", shortUrlsRoutes);

export { router };
