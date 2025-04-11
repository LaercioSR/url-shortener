import { Router } from "express";

import { CreateUserController } from "../controllers/create-user-controller";

export const authRoutes = Router();

const createController = new CreateUserController();

authRoutes.post("/", createController.handle);
