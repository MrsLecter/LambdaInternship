import { Router } from "express";
import {
  startPage,
  getDataForCertainPeriod,
  getDataForCertainCurrency,
  getDataForCertainMarket,
} from "../controllers/mainControllers";

const router = Router();

router.get("/", startPage);

router.get("/period/:period", getDataForCertainPeriod);

router.get("/currencies/:currency", getDataForCertainCurrency);

router.get("/currencies/:currency/:period", getDataForCertainCurrency);

router.get("/markets/:market", getDataForCertainMarket);

export default router;
