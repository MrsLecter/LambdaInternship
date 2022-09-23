## Serverless SQS
  URL reduction service
  Express + TS + TypeORM + MySQL + JWT Auth
### How to use
  Don't forget fill your .env file
  1) Login to service: go to <code>/login</code> and send your email and password;
  2) Singnup: got to <code>/signup</code>, send your email and password and receive accesstoken, refreshtoken with ttl;
  3) Use service: go to <code>/</code>, send your email, accesstoken and url, receive shortened_url;
  4) If your accesstoken expired, go to <code>/refresh</code> and update accesstoken and refreshtoken;
  5) If you want to see all your shortened link go to <code>/shorted/all</code> with accesstoken and email
  
### Endpoints
- **GET**  <code>http://localhost:3000/</code> - home page;
- **POST**  <code>http://localhost:3000/</code> - send url and receive shortener;
- **POST**  <code>http://localhost:3000/shorted/all</code> - see all your shortener url;
- **POST**  <code>http://localhost:3000/:address</code> - use shortener url to visit site;
- **POST**  <code>http://localhost:3000/login</code> - login to service;
- **POST**  <code>http://localhost:3000/signup</code> - signup to receive tokens;
- **POST**  <code>http://localhost:3000/refresh</code> - refresh access token

