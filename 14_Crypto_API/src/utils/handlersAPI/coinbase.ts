const axios = require("axios").default;
import { POPULAR_CURRENCY } from "../constants";

const promise_list = POPULAR_CURRENCY.map((currency) => {
  return new Promise<object>(async (resolve, reject) => {
    let response;
    try {
      response = await axios.get(
        `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
      );
      let filtered = { [currency]: (+response.data.data.rates.USD).toFixed(5) };
      resolve(filtered);
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
  });
});

module.exports = Promise.all(promise_list)
  .then((response) => Object.assign({}, ...response))
  .catch((err) => console.log(err));
