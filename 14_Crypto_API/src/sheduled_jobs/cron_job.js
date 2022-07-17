const cron = require('node-cron');
const db = require('../utils/dbInit');
const {getAverage} = require('../utils/utils');
const {TWENTY_FOUR_HOURS} = require('../utils/constants');
const coinMarketArr = ['coinbase', 'coinstats', 'kucoin', 'coinpaprika'].map(item => require('../utils/handlersAPI/' + item));

function toRefreshDbData(){
  const toRefreshDB = cron.schedule('* 5 * * *', () => {

    //delete expired data from database
    let date = new Date();
    date.setMinutes(date.getMinutes() - TWENTY_FOUR_HOURS);
    db.execute(`DELETE FROM currency WHERE timestamp < '${date.toJSON().slice(0, 19).replace('T', ' ')}';`);
 
    //add actual data to the database
    Promise.all(coinMarketArr)
    .then(dataArr => {
        let date2 = new Date();
        const data = getAverage(dataArr);
        db.execute(`insert into currency(BTC, ETH, USDT, USDC, BNB, BUSD, XRP, ADA, SOL, DOT, SHIB, TRX, AVAX, MATIC, WBTC, LTC, FTT, CRO, LINK, XLM, NEAR, timestamp) VALUES(${data['BTC']}, ${data['ETH']}, ${data['USDT']}, ${data['USDC']}, ${data['BNB']}, ${data['BUSD']}, ${data['XRP']}, ${data['ADA']}, ${data['SOL']}, ${data['DOT']}, ${data['SHIB']}, ${data['TRX']}, ${data['AVAX']}, ${data['MATIC']}, ${data['WBTC']}, ${data['LTC']}, ${data['FTT']}, ${data['CRO']}, ${data['LINK']}, ${data['XLM']}, ${data['NEAR']}, '${date2.toJSON().slice(0, 19).replace('T', ' ')}');`)
    })
    .catch(err => console.log(err))
    .finally(() => console.log('database updated'))
  });

  toRefreshDB.start();
}

module.exports = {toRefreshDbData}  

