import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

function getEntities() {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    return ["src/infrastructure/database/typeorm/entities/*.ts"];
  }
  return ["dist/src/infrastructure/database/typeorm/entities/*.js"];
}

function getMigrations() {
  if (process.env.NODE_ENV === "development") {
    return ["src/infrastructure/database/typeorm/migrations/*.ts"];
  }
  return [];
}

function getDatabaseConfig(): DataSourceOptions {
  if (process.env.NODE_ENV === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      synchronize: true,
      logging: false,
      entities: getEntities(),
      namingStrategy: new SnakeNamingStrategy(),
      entitySkipConstructor: true,
    };
  }

  return {
    type: "postgres",
    host: process.env.DB_HOST || "database",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: process.env.DB_LOGGING === "true",
    entities: getEntities(),
    migrations: getMigrations(),
    namingStrategy: new SnakeNamingStrategy(),
  };
}

export const AppDataSource = new DataSource(getDatabaseConfig());

export async function initializeDataSource() {
  await AppDataSource.initialize();
  console.log("Data source initialized");
}

export async function destroyDataSource() {
  await AppDataSource.destroy();
}

export async function runMigrations() {
  await AppDataSource.runMigrations();
}

export async function clearDatabase() {
  await AppDataSource.transaction(async (transactionalEntityManager) => {
    const tables = ["short_urls", "users"];
    for (const table of tables) {
      await transactionalEntityManager.query(`DELETE FROM ${table}`);
    }
  });
}
