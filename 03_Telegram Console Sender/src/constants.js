require("dotenv").config();

const { ODESSA_LAT, ODESSA_LONG, WEATHER_API_KEY } = process.env;

const API_WEATHER = `https://api.openweathermap.org/data/2.5/forecast?lat=${ODESSA_LAT}&lon=${ODESSA_LONG}&exclude=daily&units=metric&lang=ru&appid=${WEATHER_API_KEY}`;

const DAYS = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

const MONTHS = [
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

const MAX_HOUR_VALUE = 24;

const TWENTYFIVE_MINUTES = 1000 * 60 * 25;

module.exports = {
  TWENTYFIVE_MINUTES,
  MAX_HOUR_VALUE,
  MONTHS,
  DAYS,
  API_WEATHER,
};
