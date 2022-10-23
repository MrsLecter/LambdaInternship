import axios, { AxiosResponse } from "axios";
import fs from "fs";
import { DAYS, MONTHS, MAX_HOUR_VALUE } from "../constants/constants.js";
const { RATE_URL_MONOBANK, STORAGE_MONOBANK, RATE_URL_PRIVAT, STORAGE_PRIVAT } =
  process.env;

import {
  FileContent,
  BankResponse,
  ApiWeatherData,
  MonoOrPrivatType,
  ResponsePrivatApi,
  ResponseMonoApi,
} from "../types/types";

export const getFormattedData = (
  data: ApiWeatherData[],
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

    if (i === 0) {
      tempHour = hours;
      formatted += `\n   ${hours}:${minutes}0, ${
        currentTemp > 0 ? "+" + currentTemp : "-" + currentTemp
      }${signDegree}C, ощущается: ${
        feelsTemp > 0 ? "+" + feelsTemp : "-" + feelsTemp
      }${signDegree}C, ${weatherDescription}`;
    }

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
  }
  return formatted;
};

export const readData = (bank: string): FileContent => {
  let fileRoute = "";

  if (bank === "privat") {
    fileRoute += STORAGE_PRIVAT;
  }
  if (bank === "monobank") {
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
  bank: MonoOrPrivatType,
): Promise<BankResponse> => {
  let fileRoute: string;
  let bankUrl: string = "";

  if (bank === "privat") {
    fileRoute = STORAGE_PRIVAT;
    bankUrl += RATE_URL_PRIVAT;
  }
  if (bank === "monobank") {
    fileRoute = STORAGE_MONOBANK;
    bankUrl += RATE_URL_MONOBANK;
  }

  return await axios
    .get(bankUrl)
    .then((response) => {
      const newDate = new Date();
      let obj = {} as BankResponse;

      if (bank === "privat") {
        const { buy, sale } = response.data[0] as ResponsePrivatApi;
        obj = {
          bank,
          buy,
          sale,
          recordTime: newDate.getTime(),
        };
      }
      if (bank === "monobank") {
        const { rateBuy, rateSell } = response.data[0] as ResponseMonoApi;
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
