const cron = require('node-cron');
const db = require('../utils/dbInit');
const {getAverage} = require('../utils/utils');
const {TWENTY_FOUR_HOURS} = require('../utils/constants');
const coinMarketArr = ['coinbase', 'coinstats', 'kucoin', 'coinpaprika'].map(item => require('../utils/handlersAPI/' + item));

export const toRefreshDbData = ():void => {
  //ask every 5 minutes
  const toRefreshDB = cron.schedule('* * * * *', () => {

    //ask present data
    let date = new Date();
    //delete expired data from database (more than 24 hours)
    date.setMinutes(date.getMinutes() - TWENTY_FOUR_HOURS);
    db.execute(`DELETE FROM currency WHERE timestamp < '${date.toJSON().slice(0, 19).replace('T', ' ')}';`);
 
    //add actual data to the database
    Promise.all(coinMarketArr)
    .then(dataArr => {
        //write present date to record tracking
        let date2 = new Date();
        //ask all markets and get average price
        const data = getAverage(dataArr);
        //to keep the records in order
        db.execute(`insert into currency(BTC, ETH, USDT, USDC, BNB, BUSD, XRP, ADA, SOL, DOT, SHIB, TRX, AVAX, MATIC, WBTC, LTC, FTT, CRO, LINK, XLM, NEAR, timestamp) VALUES(${data['BTC']}, ${data['ETH']}, ${data['USDT']}, ${data['USDC']}, ${data['BNB']}, ${data['BUSD']}, ${data['XRP']}, ${data['ADA']}, ${data['SOL']}, ${data['DOT']}, ${data['SHIB']}, ${data['TRX']}, ${data['AVAX']}, ${data['MATIC']}, ${data['WBTC']}, ${data['LTC']}, ${data['FTT']}, ${data['CRO']}, ${data['LINK']}, ${data['XLM']}, ${data['NEAR']}, '${date2.toJSON().slice(0, 19).replace('T', ' ')}');`)
    })
    .catch(err => {throw new Error(err);})
    .finally(() => console.log('database updated'))
  });

  toRefreshDB.start();
}

