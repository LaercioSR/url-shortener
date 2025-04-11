import { Router } from "express";

import { CreateUserController } from "../controllers/create-user-controller";
import { LoginUserController } from "../controllers/login-user-controller";

export const authRoutes = Router();

const createController = new CreateUserController();
const loginController = new LoginUserController();

authRoutes.post("/login", loginController.handle);
authRoutes.post("/", createController.handle);
