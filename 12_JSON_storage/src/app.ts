import express, {Request, Response, NextFunction} from "express";
import todoRoutes from "./routes/todo";
import customRoutes from "./routes/custom"
import {get404} from "./controllers/error";
import {json} from 'body-parser';

const app = express();

//use json body parser
app.use(json());

app.use("/custom", customRoutes);

app.use(get404);

app.listen(3000)