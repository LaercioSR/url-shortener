import "reflect-metadata";

import cors from "cors";
import express from "express";

export async function buildApp() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  return app;
}
