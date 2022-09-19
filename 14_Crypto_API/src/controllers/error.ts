import express, { Request, Response, NextFunction } from "express";

export const get404 = (
  req: express.Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).json({ message: "Rout not found" });
};
