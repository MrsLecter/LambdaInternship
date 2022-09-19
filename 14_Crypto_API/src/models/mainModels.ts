const db = require("../utils/dbInit");
const { getAverage } = require("../utils/utils");
import { admissibleMarkets, ONE_HOUR } from "../utils/constants";

export const getCurrentMarket = (market: string): string | object => {
  if (admissibleMarkets.includes(market)) {
    return require("../utils/handlersAPI/" + market);
  } else {
    return {
      message:
        "Market not find! Use only allowed markets: coinbase, coinmarket, coinpaprika, coinstats, kucoin",
    };
  }
};

export const getCurrentCurrency = (
  currency: string,
  period: number = 30,
): object => {
  const periodAccepted = period === 30 ? 30 : period * ONE_HOUR;
  let date = new Date();
  date.setMinutes(date.getMinutes() - periodAccepted);
  return db.execute(
    `SELECT ${currency} FROM currency WHERE timestamp > '${date
      .toJSON()
      .slice(0, 19)
      .replace("T", " ")}';`,
  );
};

export const getAllFromPeriod = (period: number = 30): object => {
  const periodAccepted = period == 30 ? 30 : period * 60;
  let date = new Date();
  date.setMinutes(date.getMinutes() - periodAccepted);
  return db.execute(
    `SELECT * FROM currency WHERE timestamp > '${date
      .toJSON()
      .slice(0, 19)
      .replace("T", " ")}';`,
  );
};
