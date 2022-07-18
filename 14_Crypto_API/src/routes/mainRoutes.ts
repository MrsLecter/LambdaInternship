import { Router } from "express";
import {startPage, getDataForCertainPeriod, getDataForCertainCurrency, getDataForCertainMarket} from '../controllers/mainControllers';

const router = Router();

router.get("/", startPage);

//for what period to return the data on the crypt
router.get("/period/:period", getDataForCertainPeriod);

//will return the data for a specific crypto
router.get("/currencies/:currency", getDataForCertainCurrency);

//will return the data for a specific crypto with the period
router.get("/currencies/:currency/:period", getDataForCertainCurrency);

//will return the data for a specific marketplace
router.get("/markets/:market", getDataForCertainMarket);

export default router;