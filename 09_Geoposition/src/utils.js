function toReturnLocationByIp(user_ip, ip_table) {
  let start = 0;
  let end = ip_table.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (ip_table[mid][0] <= user_ip && ip_table[mid][1] >= user_ip)
      return ip_table[mid];
    else if (ip_table[mid][0] < user_ip) start = mid + 1;
    else end = mid - 1;
  }
  return false;
}


function toConvertIPtoNumber(ip) {
  const { NORMAL_POWER } = require("./constants");
  let arr = ip.split(".");
  let number =
    arr[0] * NORMAL_POWER ** 3 +
    arr[1] * NORMAL_POWER ** 2 +
    arr[2] * NORMAL_POWER +
    arr[3] * 1;
  return number;
}


function getDataTable(tablePath) {
  const fs = require("fs");
  const data = fs.readFileSync(tablePath, { encoding: "utf8", flag: "r" });
  const arrData = data
    //remove nesting like '"word"'
    .replaceAll('"', "")
    .split("\r\n")
    .map((item) => {
      let row = item.split(",");
      return [parseInt(row[0]), parseInt(row[1]), row[3]];
    });
  return arrData;
}


module.exports = { toReturnLocationByIp, toConvertIPtoNumber, getDataTable };
