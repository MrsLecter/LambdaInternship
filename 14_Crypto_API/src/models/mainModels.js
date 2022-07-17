const db = require("../utils/dbInit");
const {getAverage} = require('../utils/utils');


function getCurrentMarket(market) {
    const admissibleMarkets = ['coinbase', 'coinmarket', 'coinpaprika', 'coinstats', 'kucoin'];
    if(admissibleMarkets.includes(market)){
        return require('../utils/handlersAPI/' + market);
    }else{
        return {"message": "Market not find! Use only allowed markets: coinbase, coinmarket, coinpaprika, coinstats, kucoin"};
    }
}


function getCurrentCurrency(currency, period = 30){
    const periodAccepted = (period === 30)? 30: period * 60;
    let date = new Date();
    date.setMinutes(date.getMinutes() - periodAccepted);
    return db.execute(`SELECT ${currency} FROM currency WHERE timestamp > '${date.toJSON().slice(0, 19).replace('T', ' ')}';`);
}


function getAllFromPeriod( period = 30) {
    const periodAccepted = (period == 30)? 30: period * 60;
    let date = new Date();
    date.setMinutes(date.getMinutes() - periodAccepted);
    return db.execute(`SELECT * FROM currency WHERE timestamp > '${date.toJSON().slice(0, 19).replace('T', ' ')}';`);    
  }


module.exports = {getCurrentMarket, getCurrentCurrency, getAllFromPeriod};