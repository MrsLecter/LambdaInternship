"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../utils/dbInit");
var getAverage = require("../utils/utils").getAverage;
var constants_1 = require("../utils/constants");
exports.getCurrentMarket = function (market) {
    if (constants_1.admissibleMarkets.includes(market)) {
        return require("../utils/handlersAPI/" + market);
    }
    else {
        return {
            message: "Market not find! Use only allowed markets: coinbase, coinmarket, coinpaprika, coinstats, kucoin",
        };
    }
};
exports.getCurrentCurrency = function (currency, period) {
    if (period === void 0) { period = 30; }
    var periodAccepted = period === 30 ? 30 : period * constants_1.ONE_HOUR;
    var date = new Date();
    date.setMinutes(date.getMinutes() - periodAccepted);
    return db.execute("SELECT " + currency + " FROM currency WHERE timestamp > '" + date
        .toJSON()
        .slice(0, 19)
        .replace("T", " ") + "';");
};
exports.getAllFromPeriod = function (period) {
    if (period === void 0) { period = 30; }
    var periodAccepted = period == 30 ? 30 : period * 60;
    var date = new Date();
    date.setMinutes(date.getMinutes() - periodAccepted);
    return db.execute("SELECT * FROM currency WHERE timestamp > '" + date
        .toJSON()
        .slice(0, 19)
        .replace("T", " ") + "';");
};
