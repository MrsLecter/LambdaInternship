require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import type { ErrorRequestHandler } from "express";
import customRoutes from "./routes/custom";
import { get404 } from "./controllers/error";
import { json } from "body-parser";

const app = express();
const PORT = process.env.PORT | 3000;

app.use(json());

app.use("/custom", customRoutes);

app.use(get404);

app.use(<ErrorRequestHandler>((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ message: "Internal Server Error" });
}));

try {
  app.listen(PORT);
  console.log(`Server is listening in port ${PORT}`);
} catch (e) {
  console.log(e);
  throw new Error("An Error occured");
}
