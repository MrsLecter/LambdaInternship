const vacationShedule = require("./vacationShedule.json");

const getShortedvacationShedule = (vacationShedule) => {
  let obj;
  let ids = [];
  return vacationShedule.reduce((result, vacationPeriod) => {
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
      return [...result, obj];
    } else if (ids.includes(vacationPeriod.user._id)) {
      result[
        result.findIndex((elem) => elem.userId === vacationPeriod.user._id)
      ].weekendDates.push({
        startDate: vacationPeriod.startDate,
        endDate: vacationPeriod.endDate,
      });
      return result;
    }
  }, []);
};
const start = new Date().getTime();
console.log(getShortedvacationShedule(vacationShedule));
const end = new Date().getTime();

console.log(`Time spend: ${end - start}ms`); //10ms-15ms
