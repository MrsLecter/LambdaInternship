import express, { Request, Response, NextFunction } from "express";


const {
  getCurrentMarket,
  getCurrentCurrency,
  getAllFromPeriod,
} = require("../models/mainModels");
const { getAverage } = require("../utils/utils");

export const startPage = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(200).json({ message: "Home page" });
};

export const getDataForCertainPeriod = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  getAllFromPeriod(req.params["period"])
    //notify the user that there are no entries (no entries in the last 30 minutes)
    .then((data: object[]) =>
      res
        .status(200)
        .json(
          Object.keys(data[0]).length === 0
            ? { message: "No data for current period" }
            : getAverage(data[0])
        )
    )
    .catch((err: string) => {
      throw new Error(err);
    });
};

export const getDataForCertainCurrency = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  getCurrentCurrency(req.params["currency"], req.params["period"])
    //notify the user that there are no entries (no entries in the last 30 minutes)
    .then((data: object[]) =>
      res
        .status(200)
        .json(
          Object.keys(data[0]).length === 0
            ? { message: "No data for current period" }
            : getAverage(data[0])
        )
    )
    .catch((err:string) => {
      throw new Error(err);
    });
};

export const getDataForCertainMarket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json(await getCurrentMarket(req.params["market"]));
};
