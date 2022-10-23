"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteData = exports.checkOldData = exports.readData = exports.getFormattedData = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const constants_js_1 = require("../constants/constants.js");
const { RATE_URL_MONOBANK, STORAGE_MONOBANK, RATE_URL_PRIVAT, STORAGE_PRIVAT } = process.env;
const getFormattedData = (data, hourInterval = 3) => {
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
        dateInWeek = constants_js_1.DAYS[dateCommon.getUTCDay()];
        hours = dateCommon.getHours();
        dayInMonth = dateCommon.getDate();
        month = constants_js_1.MONTHS[dateCommon.getMonth()].slice(0, -1) + "я";
        minutes = dateCommon.getMinutes();
        currentTemp = Math.round(data[i].main.temp);
        feelsTemp = Math.round(data[i].main.feels_like);
        weatherDescription = data[i].weather[0].description;
        if (i !== 0) {
            const diff = Math.abs(hours - tempHour);
            const interv = diff > hourInterval ? constants_js_1.MAX_HOUR_VALUE - diff : diff;
            if (interv === hourInterval) {
                tempHour = hours;
                formatted += `\n   ${hours}:${minutes}0, ${currentTemp > 0 ? "+" + currentTemp : "-" + currentTemp}${signDegree}C, ощущается: ${feelsTemp > 0 ? "+" + feelsTemp : "-" + feelsTemp}${signDegree}C, ${weatherDescription}`;
            }
        }
        else if (i === 0) {
            tempHour = hours;
            formatted += `\n   ${hours}:${minutes}0, ${currentTemp > 0 ? "+" + currentTemp : "-" + currentTemp}${signDegree}C, ощущается: ${feelsTemp > 0 ? "+" + feelsTemp : "-" + feelsTemp}${signDegree}C, ${weatherDescription}`;
        }
    }
    return formatted;
};
exports.getFormattedData = getFormattedData;
const readData = (bank) => {
    let fileRoute = "";
    if (bank.localeCompare("privat") === 0) {
        fileRoute += STORAGE_PRIVAT;
    }
    else if (bank.localeCompare("monobank") === 0) {
        fileRoute += STORAGE_MONOBANK;
    }
    const fileData = fs_1.default.readFileSync(fileRoute, "utf8");
    const parsedData = JSON.parse(fileData);
    return parsedData;
};
exports.readData = readData;
const checkOldData = (bank) => {
    const { recordTime } = (0, exports.readData)(bank);
    const timeGap = (new Date().getTime() - recordTime) / 60000;
    if (timeGap <= 2) {
        return false;
    }
    return true;
};
exports.checkOldData = checkOldData;
const rewriteData = (bank) => __awaiter(void 0, void 0, void 0, function* () {
    let fileRoute;
    let bankUrl = "";
    if (bank.localeCompare("privat") === 0) {
        fileRoute = STORAGE_PRIVAT;
        bankUrl += RATE_URL_PRIVAT;
    }
    else if (bank.localeCompare("monobank") === 0) {
        fileRoute = STORAGE_MONOBANK;
        bankUrl += RATE_URL_MONOBANK;
    }
    return yield axios_1.default
        .get(bankUrl)
        .then((response) => {
        const newDate = new Date();
        let obj = {};
        if (bank.localeCompare("privat") === 0) {
            const { buy, sale } = response.data[0];
            obj = {
                bank,
                buy,
                sale,
                recordTime: newDate.getTime(),
            };
        }
        else if (bank.localeCompare("monobank") === 0) {
            const { rateBuy, rateSell } = response.data[0];
            obj = {
                bank,
                buy: String(rateBuy),
                sale: String(rateSell),
                recordTime: newDate.getTime(),
            };
        }
        fs_1.default.writeFile(fileRoute, JSON.stringify(obj), (err) => {
            if (err)
                throw Error(err.message);
        });
        return obj;
    })
        .catch((err) => {
        throw Error(err.message);
    });
});
exports.rewriteData = rewriteData;
