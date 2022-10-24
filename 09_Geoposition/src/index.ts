import express, { Request, Response } from "express";

import {
  toReturnLocationByIp,
  toConvertIPtoNumber,
  getDataTable,
} from "./utils/handlers";

import { TABLE_PATH } from "./constants";

const PORT = 3001;

const app = express();

app.get("/", function (_, response) {
  response.send(
    "<h2>to find out your location by ip go to [<a href='/whereiam'>/whereiam </a>]</h2>",
  );
});

app.get("/whereiam", (request: Request, response: Response) => {
  const userIp = "" + request.headers["x-forwarded-for"];
  const dataTable = getDataTable(TABLE_PATH);
  const decimalFormIp = toConvertIPtoNumber(userIp);
  const [ipFrom, ipTo, country] = toReturnLocationByIp(
    decimalFormIp,
    dataTable,
  );
  response.json({
    yourIp: userIp,
    yourIpInNumber: decimalFormIp,
    userCountry: country,
    countryIpRange: { from: ipFrom, to: ipTo },
  });
});

app.listen(PORT, () => {
  console.info(
    `Server running on http://127.0.0.1:${PORT}/. Run ngrok: ngrok http ${PORT}`,
  );
});
