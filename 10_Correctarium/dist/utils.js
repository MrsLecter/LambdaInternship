"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addWorkingHours(demanded_working_hours, date) {
    if (!ifCurrentDayInRange(date)) {
        fitInRange(date);
    }
    else {
        let completeFlag = false;
        while (completeFlag === false) {
            if (ifCurrentDayInRange(date) && !ifCurrentHourInRange(date)) {
                if (date.getHours() < 5) {
                    setRightHours(date);
                }
                else if (date.getHours() >= 19) {
                    getNextDay(date);
                }
            }
            if (!ifCurrentDayInRange(date)) {
                fitInRange(date);
            }
            if (!ifCurrentHourInRange(date)) {
                setRightHours(date);
            }
            const curentMinutes = date.getMinutes();
            const currentHours = date.getHours();
            const max_hours = 19;
            let date2 = new Date(date);
            date2.setHours(19);
            date2.setMinutes(0);
            date2.setSeconds(0);
            date2.setMilliseconds(0);
            const working_time_range = +date2 - +date;
            if (working_time_range < demanded_working_hours) {
                demanded_working_hours -= working_time_range;
                getNextDay(date);
                setRightHours(date);
            }
            else if (working_time_range >= demanded_working_hours) {
                date.setMilliseconds(demanded_working_hours);
                completeFlag = true;
            }
        }
    }
    return date;
}
exports.addWorkingHours = addWorkingHours;
function setRightHours(date) {
    date.setHours(10);
    date.setMinutes(0);
    return date;
}
exports.setRightHours = setRightHours;
function ifCurrentHourInRange(data) {
    if (data.getHours() > 19 ||
        data.getHours() < 10 ||
        (data.getHours() === 19 && data.getMinutes() > 0)) {
        return false;
    }
    return true;
}
exports.ifCurrentHourInRange = ifCurrentHourInRange;
function getNextDay(date) {
    date.setMilliseconds(24 * 60 * 60 * 1000);
    return date;
}
exports.getNextDay = getNextDay;
function ifCurrentDayInRange(date) {
    if (date.getDay() !== 0 && date.getDay() !== 6) {
        return true;
    }
    return false;
}
exports.ifCurrentDayInRange = ifCurrentDayInRange;
function fitInRange(date) {
    let counterDay = 0;
    let inRange = ifCurrentDayInRange(date);
    while (inRange !== true) {
        counterDay += 1;
        getNextDay(date);
        inRange = ifCurrentDayInRange(date);
    }
    setRightHours(date);
    return date;
}
exports.fitInRange = fitInRange;
function toCalculateDeadline(working_time, date) {
    if (!ifCurrentDayInRange(date)) {
        fitInRange(date);
    }
    addWorkingHours(working_time, date);
    return date;
}
exports.toCalculateDeadline = toCalculateDeadline;
