const vacationShedule = require("./vacationShedule.json");

const getShortedVacationShedule = (vacationShedule) => {
  let shortedVacationShedule = {};
  for (let vacationPeriod of vacationShedule) {
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
    } else if (shortedVacationShedule[vacationPeriod.user._id]) {
      shortedVacationShedule[vacationPeriod.user._id].weekendDates.push({
        startDate: vacationPeriod.startDate,
        endDate: vacationPeriod.endDate,
      });
    }
  }
  return Object.values(shortedVacationShedule);
};
const start = new Date().getTime();
console.log(getShortedVacationShedule(vacationShedule));
const end = new Date().getTime();

console.log(`Time spend: ${end - start} ms`); //10ms-16ms
