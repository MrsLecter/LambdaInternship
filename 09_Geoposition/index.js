const express = require("express");
const {
  toReturnLocationByIp,
  toConvertIPtoNumber,
  getDataTable,
} = require("./src/utils");
const { TABLE_PATH } = require("./src/constants");

const app = express();

app.get("/", function (_, response) {
  response.send(
    "<h2>to find out your location by ip go to [<a href='/whereiam'>/whereiam </a>]</h2>",
  );
});

app.get("/whereiam", function (request, response) {
  let userIp = request.headers["x-forwarded-for"];
  let dataTable = getDataTable(TABLE_PATH);
  let decimalFormIp = toConvertIPtoNumber(userIp);
  let location = toReturnLocationByIp(decimalFormIp, dataTable);
  response.json({
    yourIp: userIp,
    yourIpInNumber: decimalFormIp,
    userCountry: location[2],
    countryIpRange: { from: location[0], to: location[1] },
  });
});

app.listen(3000);

console.log(
  "Server running on http://127.0.0.1:3000/. Run ngrok: ngrok http 3000 ",
);
