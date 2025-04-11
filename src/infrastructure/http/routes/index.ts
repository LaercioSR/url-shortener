import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { redirectRoutes } from "./redirect.routes";
import { shortUrlsRoutes } from "./short-urls.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/short-urls", shortUrlsRoutes);
router.use("/", redirectRoutes);

export { router };
