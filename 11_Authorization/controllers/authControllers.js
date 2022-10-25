const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const url = require("url");
require("dotenv").config();

const {
  saveUser,
  findUserByEmail,
  findTokens,
} = require("../dataHandlers/dataAccess");
const { getTokens } = require("../util/utils");

exports.userReg = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  let userObj;
  findUserByEmail(email)
    .then((user) => {
      if (user) {
        return res
          .status(409)
          .json({ message: "Conflict. User is already exists" });
      } else {
        return bcrypt.hash(password, 12).then((hashPasswd) => {
          userObj = {
            email: email,
            password: hashPasswd,
          };
          saveUser(userObj);
          return res
            .status(201)
            .json({ message: "User successfully registered" });
        });
      }
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

exports.logIn = (req, res, next) => {
  let userLogin;
  const params = url.parse(req.url, true).query;
  const { email, password } = params;

  findUserByEmail(email)
    .then((user) => {
      if (!user) {
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
    } else {
      res.status(404).json({ message: "Page not found" });
    }
  } catch (err) {
    res.status(401).json({ " message": "Unauthorised" });
  }
};

exports.refresh = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  findTokens().then((data) => {
    if (data["refreshToken"].localeCompare(token) === 0) {
      return res.status(202).json({
        message: "New refresh token received",
        ...getTokens(data["email"]),
      });
    } else {
      return res.status(404).json({ message: "Not found. Incorrect data" });
    }
  });
};
