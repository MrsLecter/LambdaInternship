import { admissibleMarkets, ONE_HOUR } from "../constants";
import { db } from "../databaseHandler/dbInit";
import * as path from "path";

export const getCurrentMarket = async (market: string) => {
  if (admissibleMarkets.includes(market)) {
    return await require(path.join(__dirname, "../handlersAPI/" + market));
  }
  return {
    message:
      "Market not find! Use only allowed markets: coinbase, coinmarket, coinpaprika, coinstats, kucoin",
  };
};

export const getCurrentCurrency = async (
  currency: string,
  period: number = 30,
) => {
  const periodAccepted = period === 30 ? 30 : period * ONE_HOUR;
  let date = new Date();
  date.setMinutes(date.getMinutes() - periodAccepted);
  return await db.getCurrentCurrency(currency, date);
};

export const getAllFromPeriod = async (period: number = 30) => {
  const periodAccepted = period == 30 ? 30 : period * 60;
  let date = new Date();
  date.setMinutes(date.getMinutes() - periodAccepted);
  return await db.getAllFromPeriod(date);
};
