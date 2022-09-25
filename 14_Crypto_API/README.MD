## Crypto_API
<p>There are five exchanges. Each exchange has its own API. Every five minutes we make requests</p>
<p>to all API in order to get the current price of cryptocurrencies and saved in the database for each market.</p>

### Endpoints

**GET** <code>htps://{your_host}:{your:port}/</code> - return greet message;

**GET** <code>htps://{your_host}:{your:port}/period/:period</code> - return currency exchance rate for certain period;

**GET** <code>htps://{your_host}:{your:port}/currencies/:currency</code> - return rate for certain currency for period 30 min;

**GET** <code>htps://{your_host}:{your:port}/currencies/:currency/:period</code> - return rate for certain currency for certain period;

**GET** <code>htps://{your_host}:{your:port}/markets/:market</code> - return rate for certain market;
