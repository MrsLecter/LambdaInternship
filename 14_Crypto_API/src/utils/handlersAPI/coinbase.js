const axios = require('axios');
const {POPULAR_CURRENCY} = require('../constants');

const promise_list = POPULAR_CURRENCY.map(currency => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`https://api.coinbase.com/v2/exchange-rates?currency=${currency}`);
      let filtered = {[currency]: (+response.data.data.rates.USD).toFixed(5)};
      resolve(filtered);
    } catch(ex) {
      response = null;
      // error
      console.log(ex);
      reject(ex);
    }
  });
});


module.exports = Promise.all(promise_list)
.then(response => Object.assign({}, ...response))
.catch(err => console.log(err))


