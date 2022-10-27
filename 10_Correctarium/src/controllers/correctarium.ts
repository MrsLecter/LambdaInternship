import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { getDeadline, getCalculatedTimeMs } from "../utils/deadline";
import { getCost } from "../utils/cost";
import { InputType } from "../types/types";

let inputObj: InputType;

export const postInfo: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { language, mimetype, count } = req.body;
  inputObj = {
    language,
    mimetype,
    count,
  };

  res.redirect("/correctarium");
};

export const getInfo: RequestHandler = (req, res, next) => {
  const { language, mimetype, count } = inputObj;
  const calculatedCost = getCost(language, count, mimetype);
  const timeForWork = getCalculatedTimeMs(language, count, mimetype);

  const calculatedDeadline = getDeadline(language, count, mimetype, new Date());
  const unixTimeStamp = Math.floor(calculatedDeadline.getTime() / 1000);
  res.json({
    price: calculatedCost,
    time: timeForWork,
    deadline: unixTimeStamp,
    deadline_date: calculatedDeadline.toLocaleString(),
  });
};
