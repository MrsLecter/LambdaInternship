const axios = require('axios').default;
import {POPULAR_CURRENCY} from '../constants';
require('dotenv').config()

interface objectCurrency  {
  symbol: string;
  quote: {
    USD: {
      price: number;
    }
  }
}

function getFilteredData(data: objectCurrency[], required_currency:string[]): object{
  let filtered: {[index: string]:any} = {};
  for (let i =0; i < data.length; i++) {
    if(required_currency.includes(data[i].symbol)){
      filtered[data[i].symbol] = (data[i].quote.USD.price).toFixed(5);
    }
  }
  return filtered;
}

let response = null;
module.exports = new Promise<object>(async (resolve, reject) => {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKET_TOKEN,
      },
    });
  } catch(error) {
    response = null;
    if(error instanceof Error){
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        throw new Error(error.message);
      } else {
        console.log('unexpected error: ', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }
  if (response) {
    // success
    const filtered = getFilteredData(response.data.data, POPULAR_CURRENCY);
    resolve(filtered);
  }
}
);