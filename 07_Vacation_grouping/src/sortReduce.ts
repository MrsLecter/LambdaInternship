const vacationShedule = require("../data/vacationShedule.json");
import { VacationType, SheduleType, ShortedSheduleObject } from "./types";

export const getShortedVacationSheduleReduce = (
  vacationShedule: VacationType[],
): SheduleType => {
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
  return vacationShedule.reduce((result: any, vacationPeriod: VacationType) => {
    if (!ids.includes(vacationPeriod.user._id)) {
      ids.push(vacationPeriod.user._id);
      obj = {
        name: vacationPeriod.user.name,
        userId: vacationPeriod.user._id,
        weekendDates: [
          {
            startDate: vacationPeriod.startDate,
            endDate: vacationPeriod.endDate,
          },
        ],
      };
      return [...result, obj];
    }
    if (ids.includes(vacationPeriod.user._id)) {
      result[
        result.findIndex(
          (elem: ShortedSheduleObject) =>
            elem.userId === vacationPeriod.user._id,
        )
      ].weekendDates.push({
        startDate: vacationPeriod.startDate,
        endDate: vacationPeriod.endDate,
      });
      return result;
    }
  }, [] as ShortedSheduleObject[]);
};
// const start = new Date().getTime();
// console.log(getShortedVacationSheduleReduce(vacationShedule));
// const end = new Date().getTime();

// console.log(`Time spend: ${end - start}ms`); //10ms-15ms
