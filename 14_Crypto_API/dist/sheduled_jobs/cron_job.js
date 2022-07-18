"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cron = require('node-cron');
var db = require('../utils/dbInit');
var getAverage = require('../utils/utils').getAverage;
var TWENTY_FOUR_HOURS = require('../utils/constants').TWENTY_FOUR_HOURS;
var coinMarketArr = ['coinbase', 'coinstats', 'kucoin', 'coinpaprika'].map(function (item) { return require('../utils/handlersAPI/' + item); });
exports.toRefreshDbData = function () {
    //ask every 5 minutes
    var toRefreshDB = cron.schedule('* * * * *', function () {
        //ask present data
        var date = new Date();
        //delete expired data from database (more than 24 hours)
        date.setMinutes(date.getMinutes() - TWENTY_FOUR_HOURS);
        db.execute("DELETE FROM currency WHERE timestamp < '" + date.toJSON().slice(0, 19).replace('T', ' ') + "';");
        //add actual data to the database
        Promise.all(coinMarketArr)
            .then(function (dataArr) {
            //write present date to record tracking
            var date2 = new Date();
            //ask all markets and get average price
            var data = getAverage(dataArr);
            //to keep the records in order
            db.execute("insert into currency(BTC, ETH, USDT, USDC, BNB, BUSD, XRP, ADA, SOL, DOT, SHIB, TRX, AVAX, MATIC, WBTC, LTC, FTT, CRO, LINK, XLM, NEAR, timestamp) VALUES(" + data['BTC'] + ", " + data['ETH'] + ", " + data['USDT'] + ", " + data['USDC'] + ", " + data['BNB'] + ", " + data['BUSD'] + ", " + data['XRP'] + ", " + data['ADA'] + ", " + data['SOL'] + ", " + data['DOT'] + ", " + data['SHIB'] + ", " + data['TRX'] + ", " + data['AVAX'] + ", " + data['MATIC'] + ", " + data['WBTC'] + ", " + data['LTC'] + ", " + data['FTT'] + ", " + data['CRO'] + ", " + data['LINK'] + ", " + data['XLM'] + ", " + data['NEAR'] + ", '" + date2.toJSON().slice(0, 19).replace('T', ' ') + "');");
        })
            .catch(function (err) { throw new Error(err); })
            .finally(function () { return console.log('database updated'); });
    });
    toRefreshDB.start();
};
