import { NORMAL_POWER } from "../constants";
const fs = require("fs");

export const toReturnLocationByIp = (
  userIp: number,
  ipTable: number[][],
): number[] => {
  let start = 0;
  let end = ipTable.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (ipTable[mid][0] <= userIp && ipTable[mid][1] >= userIp)
      return ipTable[mid];
    else if (ipTable[mid][0] < userIp) start = mid + 1;
    else end = mid - 1;
  }
  return [];
};

export const toConvertIPtoNumber = (ip: string): number => {
  let arr = ip.split(".");
  let number =
    parseInt(arr[0]) * NORMAL_POWER ** 3 +
    parseInt(arr[1]) * NORMAL_POWER ** 2 +
    parseInt(arr[2]) * NORMAL_POWER +
    parseInt(arr[3]) * 1;
  return number;
};

export const getDataTable = (tablePath: string): number[][] => {
  const data = fs.readFileSync(tablePath, { encoding: "utf8", flag: "r" });
  const arrData = data
    .replaceAll('"', "")
    .split("\r\n")
    .map((item: string) => {
      let row = item.split(",");
      return [parseInt(row[0]), parseInt(row[1]), row[3]];
    });
  return arrData;
};
