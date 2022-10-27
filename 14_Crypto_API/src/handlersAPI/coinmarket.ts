const axios = require("axios").default;
import { POPULAR_CURRENCY } from "../constants";
import { ObjectCurrencyCoinmarket } from "../interfaces/interfaces";
require("dotenv").config();

const getFilteredData = (
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

let response = null;
module.exports = new Promise<object>(async (resolve, reject) => {
  try {
    response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COINMARKET_TOKEN,
        },
      },
    );
  } catch (error) {
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
    const filtered = getFilteredData(response.data.data, POPULAR_CURRENCY);
    resolve(filtered);
  }
});
