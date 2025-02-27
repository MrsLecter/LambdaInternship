import { Request, Response, NextFunction } from "express";
import {
  getCurrentMarket,
  getCurrentCurrency,
  getAllFromPeriod,
} from "../functions/getData";
import { ObjectRate } from "../types/types";
import { getAverage } from "../utils/utils";

export const startPage = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.status(200).json({ message: "Home page" });
};

export const getDataForCertainPeriod = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dataFromPeriod = await getAllFromPeriod(+req.params.period);
    return res
      .status(200)
      .json(
        Object.keys(dataFromPeriod[0]).length === 0
          ? { message: "No data for current period" }
          : getAverage(dataFromPeriod[0] as ObjectRate[]),
      );
  } catch (err: any) {
    throw new Error((err as Error).message);
  }
};

export const getDataForCertainCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const [currentCurrency, _]: [ObjectRate[], any] = await getCurrentCurrency(
      req.params.currency,
      30,
    );
    return res
      .status(200)
      .json(
        Object.keys(currentCurrency[0]).length === 0
          ? { message: "No data for current period" }
          : getAverage(currentCurrency),
      );
  } catch (err: any) {
    throw new Error((err as Error).message);
  }
};

export const getDataForCertainMarket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const market = req.params.market;
    const currentMarket: ObjectRate = await getCurrentMarket(market);
    return res.status(200).json({ [market]: currentMarket });
  } catch (err: any) {
    throw new Error((err as Error).message);
  }
};
