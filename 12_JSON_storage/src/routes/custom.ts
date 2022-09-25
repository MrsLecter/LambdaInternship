import { Router } from "express";
import { getСustom, createCustom, deleteCustom } from "../controllers/custom";

const router = Router();

router.get("/:rout", getСustom);

router.post("/:rout", createCustom);

router.delete("/:rout", deleteCustom);

export default router;
