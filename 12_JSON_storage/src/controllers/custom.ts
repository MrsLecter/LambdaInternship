import express, { Request, Response, NextFunction } from "express";
const mongoConnect = require("../utils/database").mongoConnect;
const { save, findByRout } = require("../models/routs");
const { isValidParam } = require("../utils/uri_validator");

mongoConnect((client) => {
  console.log("MongoDB connected ...");
});

export const getСustom = (
  req: express.Request,
  res: Response,
  next: NextFunction
) => {
  findByRout(req.params.rout)
    .then((data) => {
      if (data !== null) {
        res.status(200).json(data.obj);
      } else {
        res.status(400).json({ message: "Page not foud" });
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const createCustom = (
  req: express.Request,
  res: Response,
  next: NextFunction
) => {
  let obj = req.body;

  if (isValidParam(req.params.rout)) {
    obj.rout = req.params.rout;
    save(obj);
    res.status(201).json({ message: "created new rout" });
  } else {
    res.status(400).json({ message: "Bad request. Change routs name" });
  }
};
