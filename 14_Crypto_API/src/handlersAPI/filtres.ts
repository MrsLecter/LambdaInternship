import {
  ObjectCurrencyCoinstats,
  ObjectCurrencyCoinpaprika,
  ObjectCurrencyCoinmarket,
} from "../interfaces/interfaces";

export const getFilteredDataCoinmarket = (
  data: ObjectCurrencyCoinmarket[],
  required_currency: string[],
): {
  [index: string]: any;
} => {
  let filtered: { [index: string]: any } = {};
  for (let currencyData of data) {
    if (required_currency.includes(currencyData.symbol)) {
      filtered[currencyData.symbol] = currencyData.quote.USD.price.toFixed(5);
    }
  }
  return filtered;
};

export const getFilteredDataCoinpaprika = (
  data: ObjectCurrencyCoinpaprika[],
  required_currency: string[],
): {
  [index: string]: any;
} => {
  let filtered: { [index: string]: any } = {};
  for (let currencyData of data) {
    if (required_currency.includes(currencyData.symbol)) {
      filtered[currencyData.symbol] = currencyData.quotes.USD.price.toFixed(5);
    }
  }
  return filtered;
};

export const getFilteredDataCoinstats = (
  data: ObjectCurrencyCoinstats[],
  required_currency: string[],
): {
  [index: string]: any;
} => {
  let filtered: { [index: string]: any } = {};
  for (let currencyData of data) {
    if (required_currency.includes(currencyData.symbol)) {
      filtered[currencyData.symbol] = currencyData.price.toFixed(5);
    }
  }
  return filtered;
};

export const getFilteredDataKucoin = (
  data: { [index: string]: any },
  required_currency: string[],
): {
  [index: string]: any;
} => {
  let filtered: { [index: string]: any } = {};
  for (let item in data) {
    if (required_currency.includes(item)) {
      filtered[item] = Number(data[item]).toFixed(5);
    }
  }
  return filtered;
};
