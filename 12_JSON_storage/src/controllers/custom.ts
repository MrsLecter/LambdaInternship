import express, { Request, Response, NextFunction } from "express";
import { save, findByRout, deleteByRout } from "../models/routs";
import { isValidParam } from "../utils/uriValidator";
import { routObjType } from "../types/types";

export const getHome = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Welcome to json starage!" });
};

export const getСustom = (req: Request, res: Response, next: NextFunction) => {
  findByRout(req.params.rout)
    .then((routObject) => {
      if (routObject) {
        res.status(200).json(routObject.obj);
      } else {
        res.status(400).json({ message: "Page not foud" });
      }
    })
    .catch((error: any) => {
      throw new Error(error);
    });
};

export const createCustom = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body) throw Error("Empty body object");
  let obj = req.body as routObjType;
  if (isValidParam(req.params.rout)) {
    obj.rout = req.params.rout;
    save(obj);
    res.status(201).json({ message: "created new rout" });
  } else {
    res.status(400).json({ message: "Bad request. Change routs name" });
  }
};

export const deleteCustom = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  deleteByRout(req.params.rout)
    .then((routObject) => {
      if (!routObject) {
        res.status(400).json({ message: "Object not found!" });
      }
      res.status(200).json({ message: "Successfully deleted" });
    })
    .catch((error: any) => {
      throw new Error((error as Error).message);
    });
};
