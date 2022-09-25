const express = require("express");
const router = express.Router();
const {
  userReg,
  logIn,
  getMe,
  refresh,
} = require("../controllers/authControllers");
const { body } = require("express-validator");
const { authenticateToken } = require("../middleware/auth_middleware");

router.post(
  "/sign_up",
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

router.get("/:me", authenticateToken, getMe);

router.post("/refresh", refresh);

module.exports = router;
