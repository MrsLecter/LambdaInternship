import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { userObjType } from "../types/types";
import * as dotenv from "dotenv";
dotenv.config();
import {
  saveUser,
  findUserByEmail,
  findToken,
  saveToken,
} from "../databaseHandler/databaseHandlers";
import { getTokens } from "../utils/utils";

export const userReg = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  let userObj = {} as userObjType;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      return res
        .status(409)
        .json({ message: "Conflict. User is already exists" });
    }
    return bcrypt.hash(password, 12).then((hashPasswd: string) => {
      userObj.email = email;
      userObj.password = hashPasswd;
      saveUser(userObj);
      return res.status(201).json({ message: "User successfully registered" });
    });
  } catch (err: any) {
    const error = new Error((err as Error).message);
    return next(error);
  }
};

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(403)
        .json({ " message": "Not found. Please, register first" });
    }
    bcrypt.compare(password, (user as userObjType).password).then((isMatch) => {
      if (isMatch) {
        return res.status(202).json({
          message: "Accepted",
          ...getTokens((user as userObjType).email),
        });
      }
      return res.status(403).json({ message: "Forbidden. Incorrect data" });
    });
  } catch (err) {
    const error = new Error((err as Error).message);
    return next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { email } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Refresh token not provided!" });
  }
  if (!email) {
    return res.status(400).json({ message: "Email not provided!" });
  }
  try {
    const tokenObj = await findToken(token);
    if (!tokenObj) {
      saveToken(token);
      return res.status(202).json({
        message: "New refresh token received",
        ...getTokens(email),
      });
    }
    return res.status(404).json({ message: "Token expired! Login again" });
  } catch (err) {
    const error = new Error((err as Error).message);
    return next(error);
  }
};
