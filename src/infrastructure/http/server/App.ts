import { Express } from "express";
import { buildApp } from "./buildApp";

export class App {
  private app!: Express;

  async startServer() {
    const port = Number(process.env.PORT) || 3000;

    this.app = await buildApp();
    this.app.listen({ port });

    console.log(`Server is running on port ${port}`);
  }
}
