import { Express } from "express";
import { buildApp } from "./buildApp";
import { initializeDataSource } from "../../database/typeorm/data-source";

export class App {
  private app!: Express;

  private async initializeDatabase() {
    await initializeDataSource();
  }

  async startServer() {
    await this.initializeDatabase();

    const port = Number(process.env.PORT) || 3000;

    this.app = await buildApp();
    this.app.listen({ port });

    console.log(`Server is running on port ${port}`);
  }
}
