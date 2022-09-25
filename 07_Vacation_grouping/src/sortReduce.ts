const vacationShedule = require("../vacationShedule.json");
import { vacationType, sheduleType, shortedSheduleObject } from "./types";

const getShortedvacationShedule = (
  vacationShedule: vacationType[],
): sheduleType => {
  let obj: {
    userId: number;
    name: string;
    weekendDates: [
      {
        startDate: string;
        endDate: string;
      },
    ];
  };
  let ids: number[] = [];
  return vacationShedule.reduce((result: any, vacationPeriod: vacationType) => {
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
        result.findIndex(
          (elem: shortedSheduleObject) =>
            elem.userId === vacationPeriod.user._id,
        )
      ].weekendDates.push({
        startDate: vacationPeriod.startDate,
        endDate: vacationPeriod.endDate,
      });
      return result;
    }
  }, [] as shortedSheduleObject[]);
};
const start = new Date().getTime();
console.log(getShortedvacationShedule(vacationShedule));
const end = new Date().getTime();

console.log(`Time spend: ${end - start}ms`); //10ms-15ms
