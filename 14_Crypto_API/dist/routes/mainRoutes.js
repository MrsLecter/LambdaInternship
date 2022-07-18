"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mainControllers_1 = require("../controllers/mainControllers");
var router = express_1.Router();
router.get("/", mainControllers_1.startPage);
//for what period to return the data on the crypt
router.get("/period/:period", mainControllers_1.getDataForCertainPeriod);
//will return the data for a specific crypto
router.get("/currencies/:currency", mainControllers_1.getDataForCertainCurrency);
//will return the data for a specific crypto with the period
router.get("/currencies/:currency/:period", mainControllers_1.getDataForCertainCurrency);
//will return the data for a specific marketplace
router.get("/markets/:market", mainControllers_1.getDataForCertainMarket);
exports.default = router;
