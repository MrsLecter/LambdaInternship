const axios = require("axios").default;
import { POPULAR_CURRENCY } from "../constants";
require("dotenv").config();

const getFilteredData = (
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

let response = null;
module.exports = new Promise<object>(async (resolve, reject) => {
  try {
    response = await axios.get("https://api.kucoin.com/api/v1/prices?base=USD");
  } catch (error) {
    response = null;
    if (error instanceof Error) {
      if (axios.isAxiosError(error)) {
        console.error("error message: ", error.message);
        throw new Error(error.message);
      } else {
        console.error("unexpected error: ", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }
  if (response) {
    const filtered = getFilteredData(response.data.data, POPULAR_CURRENCY);
    resolve(filtered);
  }
});
