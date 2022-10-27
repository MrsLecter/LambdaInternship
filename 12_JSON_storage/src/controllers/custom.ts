import express, { Request, Response, NextFunction } from "express";
import { save, findByRout, deleteByRout } from "../models/routs";
import { isValidParam } from "../utils/uriValidator";
import { RoutObjType } from "../types/types";

export const getHome = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Welcome to json starage!" });
};

export const getСustom = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const routObject = await findByRout(req.params.rout);
    if (routObject) {
      res.status(200).json(routObject.obj);
    }
    res.status(400).json({ message: "Page not foud" });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createCustom = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.body) throw Error("Empty body object");
    let obj: RoutObjType = req.body;
    if (isValidParam(req.params.rout)) {
      obj.rout = req.params.rout;
      await save(obj);
      res.status(201).json({ message: "created new rout" });
    }
    res.status(400).json({ message: "Bad request. Change routs name" });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteCustom = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const routObject = await deleteByRout(req.params.rout);
    if (!routObject) {
      res.status(400).json({ message: "Object not found!" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error: any) {
    throw new Error((error as Error).message);
  }
};
