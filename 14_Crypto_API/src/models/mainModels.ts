import { db } from "../databaseHandler/dbInit";
import { admissibleMarkets, ONE_HOUR } from "../constants";
import {
  getCurrentCurrencyQuery,
  getAllFromPeriodQuery,
} from "../dbQueryString";
import * as path from "path";

export const getCurrentMarket = async (market: string) => {
  if (admissibleMarkets.includes(market)) {
    return await require(path.join(
      __dirname,
      "../utils/handlersAPI/" + market,
    ));
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
  return await db.execute(getCurrentCurrencyQuery(currency, date));
};

export const getAllFromPeriod = async (period: number = 30) => {
  const periodAccepted = period == 30 ? 30 : period * 60;
  let date = new Date();
  date.setMinutes(date.getMinutes() - periodAccepted);
  return await db.execute(getAllFromPeriodQuery(date));
};
