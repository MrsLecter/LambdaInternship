export interface ObjectCurrencyCoinmarket {
  symbol: string;
  quote: {
    USD: {
      price: number;
    };
  };
}

export interface ObjectCurrencyCoinpaprika {
  symbol: string;
  quotes: {
    USD: {
      price: number;
    };
  };
}

export interface ObjectCurrencyCoinstats {
  symbol: string;
  price: number;
}
