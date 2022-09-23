import jwt from "jsonwebtoken";
require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import { userObjType } from "../types/types";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === undefined)
    return res.send(401).json({ message: "Unauthorised" });

  jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
    if (err)
      return res.status(401).json({ message: "Unauthorised. Token expired" });
    if ((user as userObjType).email.localeCompare(email) !== 0)
      return res
        .status(401)
        .json({ message: "the token and the user do not match each other" });

    next();
  });
};
