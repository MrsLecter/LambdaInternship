export type FileContent = {
  recordTime: number;
};

export type DestructuringBankResponseType<T, U> = {
  buy: T;
  sale: T;
  rateBuy: U;
  rateSell: U;
};

export type BankResponse = {
  bank: string;
  buy: string;
  sale: string;
  recordTime: number;
};

export type ResponsePrivatApi = {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
};

export type ResponseMonoApi = {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy: number;
  rateSell: number;
};

export type ApiWeatherData = {
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
  weather: WeatherDescription[];
  clouds: { all: number };
  wind: { speed: number; deg: number; gust: number };
  visibility: number;
  pop: number;
  sys: { pod: string };
  dt_txt: string;
};

type WeatherDescription = {
  description: string;
};

export type MonoOrPrivatType = "privat" | "monobank";

export type CurrencyResponseType = {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
};
