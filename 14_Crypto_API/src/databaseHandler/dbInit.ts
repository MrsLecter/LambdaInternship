import * as mysql from "mysql2";
import {
  getCurrentCurrencyQuery,
  getAllFromPeriodQuery,
} from "./dbQueryString";
require("dotenv").config();

class MysqlHandler {
  client: any;
  constructor() {
    this.client = mysql
      .createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
      })
      .promise();
  }
  public async getCurrentCurrency(currency: string, date: Date) {
    return await this.client.execute(getCurrentCurrencyQuery(currency, date));
  }

  public async getAllFromPeriod(date: Date) {
    const data = await this.client.execute(getAllFromPeriodQuery(date));
    return data;
  }
}

export const db = new MysqlHandler();
