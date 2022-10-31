import express from "express";
import "reflect-metadata";
import type { ErrorRequestHandler } from "express";
import mainRoutes from "./routes/mainRouter";
import { json } from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { get404 } from "./controllers/error";

const PORT = process.env.port || 3000;

const app = express();

app.use(json());
app.use(helmet());

const logStream = fs.createWriteStream(path.join(__dirname, "logs.log"), {
  flags: "a",
});
app.use(morgan("combined", { stream: logStream }));

app.use(mainRoutes);

app.use(get404);

app.use(<ErrorRequestHandler>((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ message: "Internal Server Error" });
}));

try {
  app.listen(PORT, () => {
    console.info(`Server is listening in port ${PORT}`);
  });
} catch (e) {
  console.error(e);
  throw new Error("An Error occured in app.listen");
}
