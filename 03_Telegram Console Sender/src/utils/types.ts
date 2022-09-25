export type fileContent = {
  recordTime: number;
};

export type destructuringBankResponseType<T, U> = {
  buy: T;
  sale: T;
  rateBuy: U;
  rateSell: U;
};

export type bankResponse = {
  bank: string;
  buy: string;
  sale: string;
  recordTime: number;
};

export type responsePrivatApi = {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
};

export type responseMonoApi = {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy: number;
  rateSell: number;
};

export type apiWeatherData = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: weatherDescription[];
  clouds: { all: number };
  wind: { speed: number; deg: number; gust: number };
  visibility: number;
  pop: number;
  sys: { pod: string };
  dt_txt: string;
};

type weatherDescription = {
  description: string;
};

export type monoOrPrivatType = "privat" | "monobank";

export type currencyResponseType = {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
};
