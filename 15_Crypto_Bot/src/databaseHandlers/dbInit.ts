import * as mysql from "mysql2";
require("dotenv").config();

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

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
  public async addToFavourite(currency: string, chatId: number) {
    return await this.client.execute(
      `INSERT INTO favorite (currency, chatid) VALUES ('${currency.toUpperCase()}', '${chatId}');`,
    );
  }

  public async deleteFromFavourites(currency: string, chatId: number) {
    return await this.client.execute(
      `DELETE FROM favorite WHERE currency='${currency}' AND chatid='${chatId}';`,
    );
  }
  public async showAllFavourite(chatId: number) {
    return await this.client.execute(
      `SELECT * FROM favorite WHERE chatid='${chatId}';`,
    );
  }
}

export const db = new MysqlHandler();
