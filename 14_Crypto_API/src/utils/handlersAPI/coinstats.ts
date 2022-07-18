const axios = require('axios').default;
import {POPULAR_CURRENCY} from '../constants';
require('dotenv').config();

type objectCurrency = {
  symbol: string;
  price: number;
}

function getFilteredData(data: objectCurrency[], required_currency: string[]){
  let filtered: {[index: string]:any} = {};
  for (let i =0; i < data.length; i++) {
    if(required_currency.includes(data[i].symbol)){
      filtered[data[i].symbol] = (data[i].price).toFixed(5);
    }
  }
  return filtered;
}


let response = null;
module.exports = new Promise<object>(async (resolve, reject) => {
  try {
    response = await axios.get('https://api.coinstats.app/public/v1/coins?skip=0&limit=25&currency=USD');
  } catch(error) {
    response = null;
      if (error instanceof Error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          throw new Error(error.message);
        } else {
          console.log("unexpected error: ", error);
          throw new Error("An unexpected error occurred");
        }
      }
  }
  if (response) {
    // success
    const filtered = getFilteredData(response.data.coins, POPULAR_CURRENCY);
    resolve(filtered);
  }
});