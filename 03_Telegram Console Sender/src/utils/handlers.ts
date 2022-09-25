import axios, { AxiosResponse } from "axios";
import fs from "fs";
import { DAYS, MONTHS, MAX_HOUR_VALUE } from "./constants.js";
const { RATE_URL_MONOBANK, STORAGE_MONOBANK, RATE_URL_PRIVAT, STORAGE_PRIVAT } =
  process.env;

import {
  fileContent,
  bankResponse,
  apiWeatherData,
  monoOrPrivatType,
  responsePrivatApi,
  responseMonoApi,
} from "./types";

export const getFormattedData = (
  data: apiWeatherData[],
  hourInterval = 3,
): string => {
  let formatted = "";
  let tempHour = 0;

  let dateCommon;
  let dateInWeek;
  let dayInMonth;
  let month;
  let hours;
  let minutes;

  let signDegree = String.fromCharCode(176);
  let currentTemp;
  let feelsTemp;
  let weatherDescription;

  for (let i = 0; i < data.length; i++) {
    dateCommon = new Date(data[i].dt * 1000);
    dateInWeek = DAYS[dateCommon.getUTCDay()];

    hours = dateCommon.getHours();
    dayInMonth = dateCommon.getDate();
    month = MONTHS[dateCommon.getMonth()].slice(0, -1) + "я";
    minutes = dateCommon.getMinutes();
    currentTemp = Math.round(data[i].main.temp);
    feelsTemp = Math.round(data[i].main.feels_like);
    weatherDescription = data[i].weather[0].description;

    if (i !== 0) {
      const diff = Math.abs(hours - tempHour);
      const interv = diff > hourInterval ? MAX_HOUR_VALUE - diff : diff;
      if (interv === hourInterval) {
        tempHour = hours;
        formatted += `\n   ${hours}:${minutes}0, ${
          currentTemp > 0 ? "+" + currentTemp : "-" + currentTemp
        }${signDegree}C, ощущается: ${
          feelsTemp > 0 ? "+" + feelsTemp : "-" + feelsTemp
        }${signDegree}C, ${weatherDescription}`;
      }
    } else if (i === 0) {
      tempHour = hours;
      formatted += `\n   ${hours}:${minutes}0, ${
        currentTemp > 0 ? "+" + currentTemp : "-" + currentTemp
      }${signDegree}C, ощущается: ${
        feelsTemp > 0 ? "+" + feelsTemp : "-" + feelsTemp
      }${signDegree}C, ${weatherDescription}`;
    }
  }
  return formatted;
};

export const readData = (bank: string): fileContent => {
  let fileRoute = "";

  if (bank.localeCompare("privat") === 0) {
    fileRoute += STORAGE_PRIVAT;
  } else if (bank.localeCompare("monobank") === 0) {
    fileRoute += STORAGE_MONOBANK;
  }

  const fileData = fs.readFileSync(fileRoute, "utf8");
  const parsedData = JSON.parse(fileData);
  return parsedData;
};

export const checkOldData = (bank: string): Boolean => {
  const { recordTime } = readData(bank);
  const timeGap = (new Date().getTime() - recordTime) / 60000;
  if (timeGap <= 2) {
    return false;
  }
  return true;
};

export const rewriteData = async (
  bank: monoOrPrivatType,
): Promise<bankResponse> => {
  let fileRoute: string;
  let bankUrl: string = "";

  if (bank.localeCompare("privat") === 0) {
    fileRoute = STORAGE_PRIVAT;
    bankUrl += RATE_URL_PRIVAT;
  } else if (bank.localeCompare("monobank") === 0) {
    fileRoute = STORAGE_MONOBANK;
    bankUrl += RATE_URL_MONOBANK;
  }

  return await axios
    .get(bankUrl)
    .then((response) => {
      const newDate = new Date();
      let obj = {} as bankResponse;

      if (bank.localeCompare("privat") === 0) {
        const { buy, sale } = response.data[0] as responsePrivatApi;
        obj = {
          bank,
          buy,
          sale,
          recordTime: newDate.getTime(),
        };
      } else if (bank.localeCompare("monobank") === 0) {
        const { rateBuy, rateSell } = response.data[0] as responseMonoApi;
        obj = {
          bank,
          buy: String(rateBuy),
          sale: String(rateSell),
          recordTime: newDate.getTime(),
        };
      }

      fs.writeFile(fileRoute, JSON.stringify(obj), (err) => {
        if (err) throw Error((err as Error).message);
      });
      return obj;
    })
    .catch((err) => {
      throw Error((err as Error).message);
    });
};
