import { Router } from "express";
import { userReg, logIn, refresh } from "../controllers/authControllers";
import { body } from "express-validator";
import { authenticateToken } from "../middleware/authMiddleware";

import {
  startPage,
  receiveUrl,
  redirectUrl,
  showAllShortedUrls,
} from "../controllers/mainControllers";

const router = Router();

router.get("/", startPage);

router.post(
  "/",
  authenticateToken,
  body("email").isEmail(),
  body("url").isLength({ min: 5 }),
  receiveUrl,
);

router.post(
  "/shorted/all",
  authenticateToken,
  body("email").isEmail(),
  showAllShortedUrls,
);

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
