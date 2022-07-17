const axios = require('axios');
const {POPULAR_CURRENCY} = require('../constants');

//NOTE: everything works. if there are failures at the request to repeat the request after 2 seconds

function getFilteredData(data, required_currency){
  let filtered = {};
  for (let i =0; i < data.length; i++) {
    if(required_currency.includes(data[i].symbol)){
      filtered[data[i].symbol] = (data[i].quotes.USD.price).toFixed(5);
    }
  }
  return filtered;
}


let response = null;
module.exports = new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://api.coinpaprika.com/v1/tickers');
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const filtered = getFilteredData(response.data, POPULAR_CURRENCY);
    resolve(filtered);
  }
});