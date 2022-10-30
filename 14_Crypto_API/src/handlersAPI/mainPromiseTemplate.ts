const axios = require("axios").default;
import { POPULAR_CURRENCY } from "../constants";
require("dotenv").config();

let response = null;
export const getPromise = async (
  url: string,
  headers: { [header: string]: string },
  filterCallback: Function,
) =>
  new Promise<object>(async (resolve, reject) => {
    try {
      response = await axios.get(url, {
        headers,
      });
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
      let filtered;
      if (
        filterCallback.name !== "getFilteredDataCoinstats" &&
        filterCallback.name !== "getFilteredDataCoinpaprika"
      ) {
        filtered = filterCallback(response.data.data, POPULAR_CURRENCY);
      }
      if (filterCallback.name === "getFilteredDataCoinstats") {
        filtered = filterCallback(response.data.coins, POPULAR_CURRENCY);
      }
      if (filterCallback.name === "getFilteredDataCoinpaprika") {
        filtered = filterCallback(response.data, POPULAR_CURRENCY);
      }

      resolve(filtered);
    }
  });
