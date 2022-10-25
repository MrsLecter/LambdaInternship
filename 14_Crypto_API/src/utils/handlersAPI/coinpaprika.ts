const axios = require("axios").default;
import { POPULAR_CURRENCY } from "../constants";
import { ObjectCurrencyCoinpaprika } from "../../interfaces/interfaces";

//NOTE: everything works. if there are failures at the request to repeat the request after 2 seconds

const getFilteredData = (
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

let response = null;
module.exports = new Promise<object>(async (resolve, reject) => {
  try {
    response = await axios.get("https://api.coinpaprika.com/v1/tickers");
  } catch (error: any) {
    response = null;
    if (error instanceof Error) {
      if (axios.isAxiosError(error)) {
        console.error("error message: ", error.message);
        throw new Error(error.message);
      }

      console.error("unexpected error: ", error);
      throw new Error("An unexpected error occurred");
    }
  }
  if (response) {
    const filtered = getFilteredData(response.data, POPULAR_CURRENCY);
    resolve(filtered);
  }
});
