"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vacationShedule = require("../vacationShedule.json");
var getShortedvacationShedule = function (vacationShedule) {
    var obj;
    var ids = [];
    return vacationShedule.reduce(function (result, vacationPeriod) {
        if (!ids.includes(vacationPeriod.user._id)) {
            ids.push(vacationPeriod.user._id);
            obj = {
                userId: vacationPeriod.user._id,
                name: vacationPeriod.user.name,
                weekendDates: [
                    {
                        startDate: vacationPeriod.startDate,
                        endDate: vacationPeriod.endDate,
                    },
                ],
            };
            return __spreadArrays(result, [obj]);
        }
        else if (ids.includes(vacationPeriod.user._id)) {
            result[result.findIndex(function (elem) {
                return elem.userId === vacationPeriod.user._id;
            })].weekendDates.push({
                startDate: vacationPeriod.startDate,
                endDate: vacationPeriod.endDate,
            });
            return result;
        }
    }, []);
};
var start = new Date().getTime();
console.log(getShortedvacationShedule(vacationShedule));
var end = new Date().getTime();
console.log("Time spend: " + (end - start) + "ms"); //10ms-15ms
