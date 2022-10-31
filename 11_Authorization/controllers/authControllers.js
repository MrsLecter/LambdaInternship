const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
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
      email,
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
      return res
        .status(403)
        .json({ " message": "Not found. Please, register first" });
    }
    const isPasswordMatch = await bcrypt.compare(password, userFromDb.password);
    if (isPasswordMatch) {
      return res.status(202).json({ message: "Accepted", ...getTokens(email) });
    }
    return res.status(403).json({ message: "Forbidden. Incorrect data" });
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

exports.getMe = (req, res, next) => {
  const params = req.params.me;
  const token = req.headers.authorization.split(" ")[1];

  try {
    const { email, password } = jwt.verify(token, process.env.SECRET_KEY);
    if (params.length === 3 && params[2] >= 0 && params[2] <= 9) {
      return res.status(200).json({
        request_num: params[2],
        data: {
          username: email,
        },
      });
    }
    return res.status(404).json({ message: "Page not found" });
  } catch (err) {
    return res.status(401).json({ " message": "Unauthorised" });
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { email, _ } = jwt.verify(token, process.env.SECRET_KEY);
    const findToken = await db.findTokens(token);
    if (!findToken) {
      await db.saveToken({ email, refreshToken: token });
      return res.status(202).json({
        message: "New refresh token received",
        ...getTokens(email),
      });
    }
    return res
      .status(404)
      .json({ message: "This token has already been used. Incorrect data" });
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};
