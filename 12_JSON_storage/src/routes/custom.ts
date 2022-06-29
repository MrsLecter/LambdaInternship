import { Router } from "express";
import { getСustom, createCustom } from "../controllers/custom";

const router = Router();

router.get("/:rout", getСustom);

router.post("/:rout", createCustom);

export default router;
