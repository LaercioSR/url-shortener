import "reflect-metadata";

import cors from "cors";
import express from "express";
import swaggerFile from "../../../../swagger.json";
import swaggerOptions from "../../../config/swagger";
import swaggerUi from "swagger-ui-express";

export async function buildApp() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile, swaggerOptions),
  );

  return app;
}
