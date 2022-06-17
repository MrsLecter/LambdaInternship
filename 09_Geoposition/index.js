const express = require("express");
const {
  toReturnLocationByIp,
  toConvertIPtoNumber,
  getDataTable,
} = require("./src/utils");

const TABLE_PATH = "./data/location.csv";

const app = express();

app.get("/", function (request, response) {
  response.send(
    "<h2>to find out your location by ip go to [<a href='/whereiam'>/whereiam </a>]</h2>"
  );
});

app.get("/whereiam", function (request, response) {
  //extract user ip
  let user_ip = request.headers["x-forwarded-for"];
  //download data
  let dataTable = getDataTable(TABLE_PATH);
  //formatted ip
  let decimalFormIp = toConvertIPtoNumber(user_ip);
  let location = toReturnLocationByIp(decimalFormIp, dataTable);
  response.json({
    your_ip: user_ip,
    your_ip_in_number: decimalFormIp,
    user_country: location[2],
    country_ip_range: {"from": location[0], "to": location[1]},
  });
});

app.listen(3000);
