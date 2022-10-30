export const FIVE_MINUTES = 5;

export const ONE_HOUR = 60;
export const TWENTY_FOUR_HOURS = 24 * 60;

export const POPULAR_CURRENCY = [
  "BTC",
  "ETH",
  "USDT",
  "USDC",
  "BNB",
  "BUSD",
  "XRP",
  "ADA",
  "SOL",
  "DOT",
  "SHIB",
  "TRX",
  "AVAX",
  "MATIC",
  "WBTC",
  "LTC",
  "FTT",
  "CRO",
  "LINK",
  "XLM",
  "NEAR",
];

export const admissibleMarkets = [
  "coinbase",
  "coinmarket",
  "coinpaprika",
  "coinstats",
  "kucoin",
];

export enum marketsUrlResourcesEnum {
  coinmarket = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
  coinpaprika = "https://api.coinpaprika.com/v1/tickers",
  coinstats = "https://api.coinstats.app/public/v1/coins?skip=0&limit=25&currency=USD",
  kucoin = "https://api.kucoin.com/api/v1/prices?base=USD",
  coinbase = "https://api.coinbase.com/v2/exchange-rates?currency=",
}
