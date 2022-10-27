import { createConnection } from "mysql2";
require("dotenv").config();

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

export const db = createConnection({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
}).promise();
