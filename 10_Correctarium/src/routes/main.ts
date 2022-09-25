import express from "express";
import { body } from "express-validator";
import { Router } from "express";
import { getInfo, postInfo } from "../controllers/correctarium";

const router = Router();

router.get("/", getInfo);

router.post(
  "/",
  body("language").isIn(["en", "ua", "ru"]).exists(),
  body("mimetype").isIn(["doc", "docx", "rtf", "other"]).exists(),
  body("count").isNumeric().exists(),
  postInfo,
);

export default router;
