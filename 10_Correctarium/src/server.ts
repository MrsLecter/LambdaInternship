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
  app.listen(PORT, () => {
    console.info(
      `Express server started on port ${PORT}. Use rout: ".../correctarium/"`,
    );
  });
} catch (e) {
  console.error(e);
  throw new Error("An Error occured");
}
