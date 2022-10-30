import { getTimestamp } from "../utils/utils";

export const getCurrentCurrencyQuery = (
  currency: string,
  date: Date,
): string => {
  return `SELECT ${currency} FROM currency WHERE timestamp >= '${getTimestamp(
    date,
  )}';`;
};

export const getAllFromPeriodQuery = (date: Date): string => {
  return `SELECT BTC, ETH, USDT, USDC, BNB, BUSD, XRP, ADA, SOL, DOT, SHIB, TRX, AVAX, MATIC, WBTC, LTC, FTT, CRO, LINK, XLM, NEAR, timestamp FROM currency WHERE timestamp >= '${getTimestamp(
    date,
  )}';`;
};

export const insertIntoTableQuery = (
  currencyData: { [index: string]: any },
  date: Date,
): string => {
  return `INSERT INTO currency(BTC, ETH, USDT, USDC, BNB, BUSD, XRP, ADA, SOL, DOT, SHIB, TRX, AVAX, MATIC, WBTC, LTC, FTT, CRO, LINK, XLM, NEAR, timestamp) VALUES(${
    currencyData["BTC"]
  }, ${currencyData["ETH"]}, ${currencyData["USDT"]}, ${
    currencyData["USDC"]
  }, ${currencyData["BNB"]}, ${currencyData["BUSD"]}, ${currencyData["XRP"]}, ${
    currencyData["ADA"]
  }, ${currencyData["SOL"]}, ${currencyData["DOT"]}, ${currencyData["SHIB"]}, ${
    currencyData["TRX"]
  }, ${currencyData["AVAX"]}, ${currencyData["MATIC"]}, ${
    currencyData["WBTC"]
  }, ${currencyData["LTC"]}, ${currencyData["FTT"]}, ${currencyData["CRO"]}, ${
    currencyData["LINK"]
  }, ${currencyData["XLM"]}, ${currencyData["NEAR"]}, '${getTimestamp(
    date,
  )}');`;
};

export const deleteFromTableQuery = (date: Date) => {
  return `DELETE FROM currency WHERE timestamp < '${getTimestamp(date)}';`;
};
