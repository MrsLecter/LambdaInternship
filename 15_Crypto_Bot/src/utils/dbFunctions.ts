import { db } from "./dbInit";
import { QueryError, OkPacket, RowDataPacket } from "mysql2";

export const addToFavourite = (currency: string, chatId: number) => {
  return db.execute<RowDataPacket[]>(
    `INSERT INTO favorite (currency, chatid) VALUES ('${currency}', '${chatId}');`,
    (err: QueryError, result: OkPacket) => {
      console.log(result.affectedRows);
    },
  );
};

export const deleteFromFavourites = (currency: string, chatId: number) => {
  return db.execute<RowDataPacket[]>(
    `DELETE FROM favorite WHERE currency='${currency}' AND chatid='${chatId}';`,
    (err: QueryError, result: OkPacket) => {
      console.log(result.affectedRows);
    },
  );
};

export const showAllFavourite = (chatId: number) => {
  return db.execute<RowDataPacket[]>(
    `SELECT * FROM favorite WHERE chatid='${chatId}';`,
    (err: QueryError, result: OkPacket) => {
      console.log(result.affectedRows);
    },
  );
};
