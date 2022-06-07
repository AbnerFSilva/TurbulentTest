import { DotConfig } from "./Config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../../orm/entities/User";
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
    logging: false,
    entities: [User, Message],
    migrations: [],
    subscribers: [],
  });
