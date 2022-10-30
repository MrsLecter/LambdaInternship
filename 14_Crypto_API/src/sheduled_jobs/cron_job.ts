import cron from "node-cron";
import { db } from "../databaseHandler/dbInit";
import { getAverage } from "../utils/utils";
import { TWENTY_FOUR_HOURS } from "../constants";

const coinMarketArr = ["coinbase", "coinstats", "kucoin", "coinpaprika"].map(
  (item) => require("../utils/handlersAPI/" + item),
);

export const toRefreshDbData = (): void => {
  const toRefreshDB = cron.schedule("* * * * *", () => {
    let date = new Date();
    date.setMinutes(date.getMinutes() - TWENTY_FOUR_HOURS);
    db.deleteFromTable(date);

    Promise.all(coinMarketArr)
      .then((dataArr) => {
        let date = new Date();
        const currencyData = getAverage(dataArr);
        db.insertIntoTable(currencyData, date);
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => console.log("database updated"));
  });

  toRefreshDB.start();
};
