const axios = require("axios").default;
import { POPULAR_CURRENCY } from "../constants";

type objectCurrency = {
  symbol: string;
  quotes: {
    USD: {
      price: number;
    };
  };
};

//NOTE: everything works. if there are failures at the request to repeat the request after 2 seconds

const getFilteredData = (
  data: objectCurrency[],
  required_currency: string[],
): {
  [index: string]: any;
} => {
  let filtered: { [index: string]: any } = {};
  for (let i = 0; i < data.length; i++) {
    if (required_currency.includes(data[i].symbol)) {
      filtered[data[i].symbol] = data[i].quotes.USD.price.toFixed(5);
    }
  }
  return filtered;
};

let response = null;
module.exports = new Promise<object>(async (resolve, reject) => {
  try {
    response = await axios.get("https://api.coinpaprika.com/v1/tickers");
  } catch (error) {
    response = null;
    if (error instanceof Error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        throw new Error(error.message);
      } else {
        console.log("unexpected error: ", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }
  if (response) {
    const filtered = getFilteredData(response.data, POPULAR_CURRENCY);
    resolve(filtered);
  }
});
