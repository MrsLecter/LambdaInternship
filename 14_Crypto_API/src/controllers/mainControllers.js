const {ONE_HOUR, THREE_HOURS, SIX_HOURS, TWELVE_HOURS, TWENTY_FOUR_HOURS} = require('../utils/constants');
const {toSaveRecentData, toDeleteRecentData,  getCurrentMarket, getCurrentCurrency, getAllFromPeriod} = require('../models/mainModels');
const {getAverage} = require('../utils/utils');


function startPage(req, res, next){
    res.status(200).json({"message": "Home page"});
}


function getDataForCertainPeriod(req, res, next){
    getAllFromPeriod(req.params['period'])
    .then(data => res.status(200).json(getAverage(data[0])))
    .catch(err => {
        console.log(err)
    })
}


function getDataForCertainCurrency(req, res, next){
    getCurrentCurrency(req.params['currency'], req.params['period'])
    .then(data => res.status(200).json(getAverage(data[0])))
    .catch(err => console.log(err))
    
}


async function getDataForCertainMarket(req, res, next) {
    res.status(200).json( await getCurrentMarket(req.params['market']));

}


module.exports = {startPage, getDataForCertainPeriod, getDataForCertainCurrency, getDataForCertainMarket}