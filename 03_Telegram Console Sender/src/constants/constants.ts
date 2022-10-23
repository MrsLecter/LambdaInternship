require("dotenv").config();

const { ODESSA_LAT, ODESSA_LONG, WEATHER_API_KEY } = process.env;

export const API_WEATHER = `https://api.openweathermap.org/data/2.5/forecast?lat=${parseInt(
  ODESSA_LAT,
)}&lon=${parseInt(
  ODESSA_LONG,
)}&exclude=daily&units=metric&lang=ru&appid=${WEATHER_API_KEY}`;

export const DAYS = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

export const MONTHS = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

export const MAX_HOUR_VALUE = 24;

export const TWENTYFIVE_MINUTES = 1000 * 60 * 25;
