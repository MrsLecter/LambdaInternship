const axios = require("axios").default;
import { POPULAR_CURRENCY } from "../constants";
import { ObjectCurrencyCoinstats } from "../interfaces/interfaces";
require("dotenv").config();

const getFilteredData = (
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

let response = null;
module.exports = new Promise<object>(async (resolve, reject) => {
  try {
    response = await axios.get(
      "https://api.coinstats.app/public/v1/coins?skip=0&limit=25&currency=USD",
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
    const filtered = getFilteredData(response.data.coins, POPULAR_CURRENCY);
    resolve(filtered);
  }
});
