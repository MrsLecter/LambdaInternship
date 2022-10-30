import { admissibleMarkets } from "../constants";
import { getAcceptedPeriodInMin } from "../utils/utils";
import { getPromise } from "../handlersAPI/mainPromiseTemplate";
import { marketsUrlResourcesEnum } from "../constants";
import {
  getFilteredDataCoinmarket,
  getFilteredDataCoinpaprika,
  getFilteredDataCoinstats,
  getFilteredDataKucoin,
} from "../handlersAPI/filtres";
import { db } from "../databaseHandler/dbInit";
import * as path from "path";

//NOTE: everything works. if there are failures at the request to repeat the request after 2 seconds
export const getCurrentMarket = async (market: string) => {
  if (admissibleMarkets.includes(market)) {
    switch (market) {
      case "coinbase":
        return await require(path.join(__dirname, "../handlersAPI/coinbase"));
        break;
      case "coinmarket":
        return await getPromise(
          marketsUrlResourcesEnum.coinmarket,
          {
            "X-CMC_PRO_API_KEY": process.env.COINMARKET_TOKEN,
          },
          getFilteredDataCoinmarket,
        );
        break;
      case "coinpaprika":
        return await getPromise(
          marketsUrlResourcesEnum.coinpaprika,
          {},
          getFilteredDataCoinpaprika,
        );
        break;
      case "coinstats":
        return await getPromise(
          marketsUrlResourcesEnum.coinstats,
          {},
          getFilteredDataCoinstats,
        );
        break;
      case "kucoin":
        return await getPromise(
          marketsUrlResourcesEnum.kucoin,
          {},
          getFilteredDataKucoin,
        );
        break;
    }
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
  const periodAccepted = getAcceptedPeriodInMin(period);
  let date = new Date();
  date.setMinutes(date.getMinutes() - periodAccepted);
  return await db.getCurrentCurrency(currency, date);
};

export const getAllFromPeriod = async (period: number = 15) => {
  const periodAccepted = getAcceptedPeriodInMin(period);
  let date = new Date();
  date.setMinutes(date.getMinutes() - periodAccepted);
  return await db.getAllFromPeriod(date);
};
