"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRefreshDbData = void 0;
var node_cron_1 = __importDefault(require("node-cron"));
var dbInit_1 = require("../utils/dbInit");
var utils_1 = require("../utils/utils");
var constants_1 = require("../utils/constants");
var coinMarketArr = ["coinbase", "coinstats", "kucoin", "coinpaprika"].map(function (item) { return require("../utils/handlersAPI/" + item); });
var toRefreshDbData = function () {
    var toRefreshDB = node_cron_1.default.schedule("* * * * *", function () {
        var date = new Date();
        date.setMinutes(date.getMinutes() - constants_1.TWENTY_FOUR_HOURS);
        dbInit_1.db.execute("DELETE FROM currency WHERE timestamp < '".concat(date
            .toJSON()
            .slice(0, 19)
            .replace("T", " "), "';"));
        Promise.all(coinMarketArr)
            .then(function (dataArr) {
            var date2 = new Date();
            var data = (0, utils_1.getAverage)(dataArr);
            dbInit_1.db.execute("insert into currency(BTC, ETH, USDT, USDC, BNB, BUSD, XRP, ADA, SOL, DOT, SHIB, TRX, AVAX, MATIC, WBTC, LTC, FTT, CRO, LINK, XLM, NEAR, timestamp) VALUES(".concat(data["BTC"], ", ").concat(data["ETH"], ", ").concat(data["USDT"], ", ").concat(data["USDC"], ", ").concat(data["BNB"], ", ").concat(data["BUSD"], ", ").concat(data["XRP"], ", ").concat(data["ADA"], ", ").concat(data["SOL"], ", ").concat(data["DOT"], ", ").concat(data["SHIB"], ", ").concat(data["TRX"], ", ").concat(data["AVAX"], ", ").concat(data["MATIC"], ", ").concat(data["WBTC"], ", ").concat(data["LTC"], ", ").concat(data["FTT"], ", ").concat(data["CRO"], ", ").concat(data["LINK"], ", ").concat(data["XLM"], ", ").concat(data["NEAR"], ", '").concat(date2
                .toJSON()
                .slice(0, 19)
                .replace("T", " "), "');"));
        })
            .catch(function (err) {
            throw new Error(err);
        })
            .finally(function () { return console.log("database updated"); });
    });
    toRefreshDB.start();
};
exports.toRefreshDbData = toRefreshDbData;
