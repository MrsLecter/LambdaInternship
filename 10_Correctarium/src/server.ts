import express from "express";
import { Request, Response, NextFunction } from "express";
import path from "path";
import bodyParser from "body-parser";
import mainRoute from "./routes/main";

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use("/correctarium", mainRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "404 Not found" });
});

try {
  app.listen(PORT);
  console.log(
    `Server is listening in port ${PORT}. Use rout: ".../correctarium/"`,
  );
} catch (e) {
  console.log(e);
  throw new Error("An Error occured");
}
