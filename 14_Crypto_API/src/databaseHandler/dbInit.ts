import * as mysql from "mysql2";
import {
  getCurrentCurrencyQuery,
  getAllFromPeriodQuery,
  insertIntoTableQuery,
  deleteFromTableQuery,
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
    return await this.client.execute(getAllFromPeriodQuery(date));
  }

  public async insertIntoTable(
    currencyData: { [index: string]: any },
    date: Date,
  ) {
    return await this.client.execute(insertIntoTableQuery(currencyData, date));
  }

  public async deleteFromTable(date: Date) {
    return await this.client.execute(deleteFromTableQuery(date));
  }
}

export const db = new MysqlHandler();
