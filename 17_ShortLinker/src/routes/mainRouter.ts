import { Router } from "express";
const {
  userReg,
  logIn,
  getMe,
  refresh,
} = require("../controllers/authControllers");
const { body } = require("express-validator");
const { authenticateToken } = require("../middleware/authMiddleware");

import {
  startPage,
  receiveUrl,
  redirectUrl,
} from "../controllers/mainControllers";

const router = Router();

router.get("/", startPage);

router.post("/", authenticateToken, receiveUrl);
router.get("/:address", redirectUrl);

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  userReg,
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  logIn,
);

router.post("/refresh", refresh);

export default router;
