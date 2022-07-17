const { Router } = require("express");
const {startPage, getDataForCertainPeriod, getDataForCertainCurrency, getDataForCertainMarket} = require('../controllers/mainControllers');

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

module.exports = router;