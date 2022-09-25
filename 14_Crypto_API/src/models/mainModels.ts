import { db } from "../utils/dbInit";
import { admissibleMarkets, ONE_HOUR } from "../utils/constants";

export const getCurrentMarket = async (market: string) => {
  if (admissibleMarkets.includes(market)) {
    return await require("../utils/handlersAPI/" + market);
  } else {
    return {
      message:
        "Market not find! Use only allowed markets: coinbase, coinmarket, coinpaprika, coinstats, kucoin",
    };
  }
};

export const getCurrentCurrency = async (
  currency: string,
  period: number = 30,
) => {
  const periodAccepted = period === 30 ? 30 : period * ONE_HOUR;
  let date = new Date();
  date.setMinutes(date.getMinutes() - periodAccepted);

  return await db.execute(
    `SELECT ${currency} FROM currency WHERE timestamp > '${date
      .toJSON()
      .slice(0, 19)
      .replace("T", " ")}';`,
  );
};

export const getAllFromPeriod = async (period: number = 30) => {
  const periodAccepted = period == 30 ? 30 : period * 60;
  let date = new Date();
  date.setMinutes(date.getMinutes() - periodAccepted);
  return await db.execute(
    `SELECT * FROM currency WHERE timestamp > '${date
      .toJSON()
      .slice(0, 19)
      .replace("T", " ")}';`,
  );
};
