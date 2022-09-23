const jwt = require("jsonwebtoken");
import express, { Request, Response, NextFunction } from "express";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.send(401).json({ message: "Unauthorised" });
  jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
    console.log("user in middleware", user);
    if (err)
      return res.status(401).json({ message: "Unauthorised. Token expired" });
    if (user.email.localeCompare(email) !== 0)
      return res
        .status(401)
        .json({ message: "the token and the user do not match each other" });

    next();
  });
};
