require("dotenv").config();
const { DAYS, MONTHS, MAX_HOUR_VALUE } = require("./constants");

function getFormattedData(data, hourInterval = 3) {
  let formatted = "";
  let tempDay = 0;
  let tempHour = 0;
  //date
  let dateCommon;
  let dateInWeek;
  let dayInMonth;
  let month;
  let hours;
  let minutes;
  //temp
  let signDegree = String.fromCharCode(176);
  let currentTemp;
  let feelsTemp;
  let weatherDescription;

  for (let i = 0; i < data.length; i++) {
    //convert to human readable format
    dateCommon = new Date(data[i].dt * 1000);
    //get number of day and find relevant day's name in array
    dateInWeek = DAYS[dateCommon.getUTCDay()];

    hours = dateCommon.getHours();
    dayInMonth = dateCommon.getDate();
    //get number of month and find relevant month's name in array
    month = MONTHS[dateCommon.getMonth()].slice(0,-1)+'я';
    minutes = dateCommon.getMinutes();
    currentTemp = Math.round(data[i].main.temp);
    feelsTemp = Math.round(data[i].main.feels_like);
    weatherDescription = data[i].weather[0].description;
    //if current day number have already recorded - skip this
    if (tempDay !== dateInWeek) {
      formatted += `\n${dateInWeek}, ${dayInMonth} ${month}:`;
      tempDay = dateInWeek;
    }

    if (i !== 0) {
      //find difference between last recorded hour and current note
      let diff = Math.abs(hours - tempHour);
      //if difference too large - recount 
      let interv = diff > hourInterval ? MAX_HOUR_VALUE - diff : diff;
      //if calculated difference is equal to requested - make a note
      if (interv === hourInterval) {
        tempHour = hours;
        formatted += `\n   ${hours}:${minutes}0, ${
          currentTemp > 0 ? "+" + currentTemp : "-" + currentTemp
        }${signDegree}C, ощущается: ${
          feelsTemp > 0 ? "+" + feelsTemp : "-" + feelsTemp
        }${signDegree}C, ${weatherDescription}`;
      }
    } else if (i == 0) {
      tempHour = hours;
      formatted += `\n   ${hours}:${minutes}0, ${
        currentTemp > 0 ? "+" + currentTemp : "-" + currentTemp
      }${signDegree}C, ощущается: ${
        feelsTemp > 0 ? "+" + feelsTemp : "-" + feelsTemp
      }${signDegree}C, ${weatherDescription}`;
    }
  }
  //return the resulting line
  return formatted;
}

module.exports = { getFormattedData };
