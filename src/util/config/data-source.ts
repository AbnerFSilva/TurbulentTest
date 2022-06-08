import { DotConfig } from "./Config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Message } from "../../orm/entities/Message";

export const AppDataSource = (env: DotConfig) =>
  new DataSource({
    type: "postgres",
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.TYPEORM_DATABASE,
    synchronize: true,
    logging: true,
    entities: [Message],
    migrations: [],
    subscribers: [],
    cache: {
      duration: 60000,
      tableName: "messages-cache",
    },
  });
