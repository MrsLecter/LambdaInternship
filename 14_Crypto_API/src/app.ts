require("dotenv").config();
import express from "express";
import helmet from "helmet";
import type { ErrorRequestHandler } from "express";
import { get404 } from "./controllers/error";
import { json } from "body-parser";
import morgan from "morgan";
import fs from "fs";
import path from "path";

import mainRouts from "./routes/mainRoutes";
// import { toRefreshDbData } from "./sheduled_jobs/cron_job";

const PORT = process.env.PORT;
const app = express();

app.use(json());
app.use(helmet());

const logStream = fs.createWriteStream(path.join(__dirname, "logs.log"), {
  flags: "a",
});
app.use(morgan("combined", { stream: logStream }));

// toRefreshDbData();

app.use(mainRouts);
app.use(get404);

const errHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ message: "Internal Server Error" });
};

app.use(errHandler);

try {
  app.listen(PORT || 3000, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (e) {
  console.log(e);
  throw new Error("An error occured");
}
