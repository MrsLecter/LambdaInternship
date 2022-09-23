const { validationResult } = require("express-validator");
import express, { Request, Response, NextFunction } from "express";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const url = require("url");
require("dotenv").config();
import {
  saveUser,
  findUserByEmail,
  findToken,
  saveToken,
} from "../utils/databaseHandlers";

const { getTokens } = require("../utils/utils");

export const userReg = (req: Request, res: Response, next: NextFunction) => {
  type userObjType = {
    email: string;
    password: string;
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  let userObj = {} as userObjType;

  findUserByEmail(email)
    .then((user) => {
      if (user) {
        return res
          .status(409)
          .json({ message: "Conflict. User is already exists" });
      } else {
        return bcrypt.hash(password, 12).then((hashPasswd: string) => {
          console.log("record", email, hashPasswd);
          userObj.email = email;
          userObj.password = hashPasswd;
          console.log("userObj", userObj);
          saveUser(userObj);
          return res
            .status(201)
            .json({ message: "User successfully registered" });
        });
      }
    })
    .catch((err: any) => {
      const error = new Error((err as Error).message);
      return next(error);
    });
};

export const logIn = (req: Request, res: Response, next: NextFunction) => {
  let userLogin;
  const { email, password } = req.body;
  console.log("ep", email, password);
  findUserByEmail(email)
    .then((user) => {
      console.log("user", user, user === null);
      if (user === null) {
        res
          .status(403)
          .json({ " message": "Not found. Please, register first" });
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          return res
            .status(202)
            .json({ message: "Accepted", ...getTokens(user.email) });
        } else {
          return res.status(403).json({ message: "Forbidden. Incorrect data" });
        }
      });
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

export const refresh = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { email } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Refresh token not provided!" });
  }
  if (!email) {
    return res.status(400).json({ message: "Email not provided!" });
  }
  findToken(token).then((tokenObj) => {
    console.log("tokenObj", tokenObj);
    if (tokenObj === null) {
      console.log("ttttoken", token);
      saveToken(token);
      return res.status(202).json({
        message: "New refresh token received",
        ...getTokens(email),
      });
    } else {
      return res.status(404).json({ message: "Token expired! Login again" });
    }
  });
};
