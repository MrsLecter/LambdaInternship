import { Request, Response, NextFunction } from "express";
import {
  getCurrentMarket,
  getCurrentCurrency,
  getAllFromPeriod,
} from "../models/mainModels";
import { objectRate } from "../utils/types";
import { getAverage } from "../utils/utils";

export const startPage = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.status(200).json({ message: "Home page" });
};

export const getDataForCertainPeriod = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  getAllFromPeriod(+req.params["period"])
    .then((data) =>
      res
        .status(200)
        .json(
          Object.keys(data[0]).length === 0
            ? { message: "No data for current period" }
            : getAverage(data[0] as objectRate[]),
        ),
    )
    .catch((err: string) => {
      throw new Error(err);
    });
};

export const getDataForCertainCurrency = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  getCurrentCurrency(req.params["currency"], 30)
    .then((data: object[]) =>
      res
        .status(200)
        .json(
          Object.keys(data[0]).length === 0
            ? { message: "No data for current period" }
            : getAverage(data[0] as objectRate[]),
        ),
    )
    .catch((err: string) => {
      throw new Error(err);
    });
};

export const getDataForCertainMarket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const market = req.params["market"];
  getCurrentMarket(market).then((data) =>
    res.status(200).json({ [market]: data }),
  );
};
