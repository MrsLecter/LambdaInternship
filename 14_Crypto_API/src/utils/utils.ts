import { ObjectRate } from "../types/types";
import { ONE_HOUR } from "../constants";

export const getAverage = (
  arr: ObjectRate[],
): {
  [index: string]: any;
} => {
  let avg: { [index: string]: any } = arr[0];
  for (let i = 1; i < arr.length; i++) {
    for (const [key, value] of Object.entries(arr[i])) {
      if (key !== "timestamp") {
        avg[key] = +avg[key] + +value;
        if (i === arr.length - 1) {
          avg[key] = (+avg[key] / arr.length).toFixed(5);
        }
      }
    }
  }
  return avg;
};

export const getTimestamp = (date: Date): string =>
  date.toJSON().slice(0, 19).replace("T", " ");

export const getAcceptedPeriodInMin = (period: number) => {
  let periodAccepted = period;
  if (period !== 15) {
    if (period !== 30) {
      periodAccepted = period * ONE_HOUR;
    }
  }
  return periodAccepted;
};
