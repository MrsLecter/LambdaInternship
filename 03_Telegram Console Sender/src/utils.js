const axios = require("axios");
const fs = require("fs");
const { DAYS, MONTHS, MAX_HOUR_VALUE } = require("./constants.js");
const { RATE_URL_MONOBANK, STORAGE_MONOBANK, RATE_URL_PRIVAT, STORAGE_PRIVAT } =
  process.env;

const getFormattedData = (data, hourInterval = 3) => {
  let formatted = "";
  let tempDay = 0;
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
    if (tempDay !== dateInWeek) {
      formatted += `\n${dateInWeek}, ${dayInMonth} ${month}:`;
      tempDay = dateInWeek;
    }

    if (i !== 0) {
      let diff = Math.abs(hours - tempHour);
      let interv = diff > hourInterval ? MAX_HOUR_VALUE - diff : diff;
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

const readData = (bank) => {
  let fileRoute;

  if (bank.localeCompare("privat") === 0) {
    fileRoute = STORAGE_PRIVAT;
  } else if (bank.localeCompare("monobank") === 0) {
    fileRoute = STORAGE_MONOBANK;
  }

  let fileData = fs.readFileSync(fileRoute, "utf8", function (error) {
    if (error) console.log(error);
  });
  let parsedData = JSON.parse(fileData);
  return parsedData;
};

const checkOldData = (bank) => {
  let parsedData = readData(bank);
  let timeGap = (new Date().getTime() - parsedData.recordTime) / 60000;
  if (timeGap <= 2) {
    return false;
  }
  return true;
};

const rewriteData = async (bank) => {
  let fileRoute;
  let bankUrl;

  if (bank.localeCompare("privat") === 0) {
    fileRoute = STORAGE_PRIVAT;
    bankUrl = RATE_URL_PRIVAT;
  } else if (bank.localeCompare("monobank") === 0) {
    fileRoute = STORAGE_MONOBANK;
    bankUrl = RATE_URL_MONOBANK;
  }

  return await axios
    .get(bankUrl)
    .then(function (response) {
      let { buy, sale, rateBuy, rateSell } = response.data[0];
      let newDate = new Date();
      let obj;

      if (bank.localeCompare("privat") === 0) {
        obj = {
          bank,
          buy,
          sale,
          recordTime: newDate.getTime(),
        };
      } else if (bank.localeCompare("monobank") === 0) {
        obj = {
          bank,
          buy: rateBuy,
          sale: rateSell,
          recordTime: newDate.getTime(),
        };
      }

      fs.writeFile(fileRoute, JSON.stringify(obj), function (error) {
        if (error) console.log(error);
      });
      return obj;
    })
    .catch(function (error) {
      console.log(error);
    });
};

module.exports = { rewriteData, checkOldData, readData, getFormattedData };
