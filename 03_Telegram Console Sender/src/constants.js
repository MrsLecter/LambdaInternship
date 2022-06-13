const RATE_URL_PRIVAT =
  "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
const RATE_URL_MONOBANK = "https://api.monobank.ua/bank/currency";

const IMAGE_URL = 'https://picsum.photos/200/300';

const BOT_TOKEN = "5505471727:AAHiEeaI1IflGn36uT5FxQP9ANHHKIBqVk0";
const CHAT_ID = 585196398;
const ODESSA_LAT = 46.482952;
const ODESSA_LONG = 30.712481;
const WEATHER_API_KEY = "98b10ba40c67fd6c69039a875b126742";

const STICKER_URL =
  "https://cdn.tlgrm.app/stickers/9b3/6f4/9b36f4d8-203f-3e1e-b31f-78519f4f9ba4/192/11.webp";

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
MAX_HOUR_VALUE = 24;

STORAGE_PRIVAT = './data/storagePrivat.txt';
STORAGE_MONOBANK = './data/storageMono.txt';

TWENTYFIVE_MINUTES = 1000 * 60 * 25;

module.exports = {
  RATE_URL_PRIVAT,
  RATE_URL_MONOBANK,
  IMAGE_URL,
  STICKER_URL,
  API_WEATHER,
  DAYS,
  MONTHS,
  MAX_HOUR_VALUE,
  STORAGE_PRIVAT,
  STORAGE_MONOBANK,
  TWENTYFIVE_MINUTES
};
