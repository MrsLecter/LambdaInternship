const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const url = require("url");
require("dotenv").config();
// const {
//   saveUser,
//   findUserByEmail,
//   findTokens,
// } = require("../dataHandlers/dataAccess");
const { db } = require("../dataHandlers/databaseHendler");
const { getTokens } = require("../util/utils");

exports.userReg = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: `Invalid value: ${errors.array()}` });
  }
  try {
    const { email, password } = req.body;
    const userFromDb = await db.findUserByEmail(email);
    if (userFromDb) {
      return res
        .status(409)
        .json({ message: "Conflict. User is already exists" });
    }
    const hashFromPassword = await bcrypt.hash(password, 12);
    await db.saveUser({
      email: email,
      password: hashFromPassword,
    });
    return res.status(201).json({ message: "User successfully registered" });
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userFromDb = await db.findUserByEmail(email);
    if (!userFromDb) {
      res.status(403).json({ " message": "Not found. Please, register first" });
    }
    const isPasswordMatch = await bcrypt.compare(password, userFromDb.password);
    if (isPasswordMatch) {
      return res
        .status(202)
        .json({ message: "Accepted", ...getTokens(userFromDb.email) });
    }
    return res.status(403).json({ message: "Forbidden. Incorrect data" });
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

exports.getMe = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const params = req.params.me;
    if (params.length === 3 && params[2] >= 0 && params[2] <= 9) {
      res.status(200).json({
        request_num: params[2],
        data: {
          username: decoded.email,
        },
      });
    }
    res.status(404).json({ message: "Page not found" });
  } catch (err) {
    res.status(401).json({ " message": "Unauthorised" });
  }
};

exports.refresh = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const findToken = await db.findTokens();
  if (findToken.refreshToken === token) {
    return res.status(202).json({
      message: "New refresh token received",
      ...getTokens(findToken.email),
    });
  }
  return res.status(404).json({ message: "Not found. Incorrect data" });
};
