export type fileContent = {
  recordTime: number;
};

export type bankResponse = {
  bank: string;
  buy: string;
  sale: string;
  recordTime: number;
};

type weatherDescription = {
  description: string;
};

export type apiWeatherData = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: weatherDescription[];
};
