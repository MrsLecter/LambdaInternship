"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TWENTYFIVE_MINUTES = exports.MAX_HOUR_VALUE = exports.MONTHS = exports.DAYS = exports.API_WEATHER = void 0;
require("dotenv").config();
const { ODESSA_LAT, ODESSA_LONG, WEATHER_API_KEY } = process.env;
exports.API_WEATHER = `https://api.openweathermap.org/data/2.5/forecast?lat=${parseInt(ODESSA_LAT)}&lon=${parseInt(ODESSA_LONG)}&exclude=daily&units=metric&lang=ru&appid=${WEATHER_API_KEY}`;
exports.DAYS = [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
];
exports.MONTHS = [
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
exports.MAX_HOUR_VALUE = 24;
exports.TWENTYFIVE_MINUTES = 1000 * 60 * 25;
