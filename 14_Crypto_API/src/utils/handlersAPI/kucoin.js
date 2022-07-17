const axios = require('axios');
require('dotenv').config();
const {POPULAR_CURRENCY} = require('../constants.js');


function getFilteredData(data, required_currency){
  let filtered = {};
  for (let i =0; i < data.length; i++) {
    if(required_currency.includes(data[i].symbol)){
      filtered[data[i].symbol] = (data[i].quote.USD.price).toFixed(5);
    }
  }
  return filtered;
}

let response = null;
module.exports = new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {//'https://api.kucoin.com/api/v1/prices?base=USD'
      headers: {
        'X-CMC_PRO_API_KEY': 'f4e05ef5-d516-4b8e-811c-58f82c177b11',
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const filtered = getFilteredData(response.data.data, POPULAR_CURRENCY);
    // console.log(filtered)
    resolve(filtered);
  }
}
);
