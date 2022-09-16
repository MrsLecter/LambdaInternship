const toReturnLocationByIp = (userIp, ipTable) => {
  let start = 0;
  let end = ipTable.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (ipTable[mid][0] <= userIp && ipTable[mid][1] >= userIp)
      return ipTable[mid];
    else if (ipTable[mid][0] < userIp) start = mid + 1;
    else end = mid - 1;
  }
  return false;
};

const toConvertIPtoNumber = (ip) => {
  const { NORMAL_POWER } = require("./constants");
  let arr = ip.split(".");
  let number =
    arr[0] * NORMAL_POWER ** 3 +
    arr[1] * NORMAL_POWER ** 2 +
    arr[2] * NORMAL_POWER +
    arr[3] * 1;
  return number;
};

const getDataTable = (tablePath) => {
  const fs = require("fs");
  const data = fs.readFileSync(tablePath, { encoding: "utf8", flag: "r" });
  const arrData = data
    .replaceAll('"', "")
    .split("\r\n")
    .map((item) => {
      let row = item.split(",");
      return [parseInt(row[0]), parseInt(row[1]), row[3]];
    });
  return arrData;
};

module.exports = { toReturnLocationByIp, toConvertIPtoNumber, getDataTable };
