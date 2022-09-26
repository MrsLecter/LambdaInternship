## ShortLinker
Returns a shortened version of the link

Express + TypeORM + MySQL + Auth JWT + TS + Helmet + Morgan

### Endpoints

**GET** <code>https://{your_host}:{your_port}/</code> - return greet message;

**POST** <code>https://{your_host}:{your_port}/</code> -/Auth Token + {"email": [email], "url": [url], "alias":[alias]}/ - return short url;

**POST** <code>https://{your_host}:{your_port}/shorted/all</code> -/Auth Token +{"email": [email]} - return all user's shorted links;

**GET** <code>https://{your_host}:{your_port}/:address</code> - redirect on original site;

**POST** <code>https://{your_host}:{your_port}/signup</code> - /{"email": [email], "password": [password]}/- signup to service;

**POST** <code>https://{your_host}:{your_port}/login</code> - /{"email": [email], "password": [password]}/- login to service, receive tokens;

**POST** <code>https://{your_host}:{your_port}/refresh</code> - /Refresh Token + {"email": [email], "password": [password]}/- receive new tokens
