"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vacationShedule = require("../vacationShedule.json");
var getShortedVacationShedule = function (vacationShedule) {
    var shortedVacationShedule = {};
    for (var _i = 0, vacationShedule_1 = vacationShedule; _i < vacationShedule_1.length; _i++) {
        var vacationPeriod = vacationShedule_1[_i];
        if (!shortedVacationShedule[vacationPeriod.user._id]) {
            shortedVacationShedule[vacationPeriod.user._id] = {
                userId: vacationPeriod.user._id,
                name: vacationPeriod.user.name,
                weekendDates: [
                    {
                        startDate: vacationPeriod.startDate,
                        endDate: vacationPeriod.endDate,
                    },
                ],
            };
        }
        else if (shortedVacationShedule[vacationPeriod.user._id]) {
            shortedVacationShedule[vacationPeriod.user._id].weekendDates.push({
                startDate: vacationPeriod.startDate,
                endDate: vacationPeriod.endDate,
            });
        }
    }
    return Object.values(shortedVacationShedule);
};
var start = new Date().getTime();
console.log(getShortedVacationShedule(vacationShedule));
var end = new Date().getTime();
console.log("Time spend: " + (end - start) + " ms"); //10ms-16ms
