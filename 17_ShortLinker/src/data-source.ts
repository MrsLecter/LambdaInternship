require("dotenv").config();
import { DataSource, DataSourceOptions } from "typeorm";
import { TokensDb } from "./entity/Tokens";
import { UrlsDb } from "./entity/Urls";
import { AuthDb } from "./entity/User";

const options: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [UrlsDb, AuthDb, TokensDb],
};

export const AppDataSource = new DataSource(options);
