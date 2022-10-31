const jwt = require("jsonwebtoken");
require("dotenv").config();

const getRandomTTL = () => {
  const minTime = 30;
  const maxTime = 60;
  const ttlInS = Math.floor(Math.random() * (maxTime - minTime + 1) + minTime);
  return ttlInS;
};

const getTokens = (userEmail) => {
  const ttl = getRandomTTL();
  const refreshToken = jwt.sign({ email: userEmail }, process.env.SECRET_KEY);
  const token = jwt.sign({ email: userEmail }, process.env.SECRET_KEY, {
    expiresIn: ttl,
  });
  return { accessToken: token, refreshToken: refreshToken, TTL: ttl };
};

module.exports = { getRandomTTL, getTokens };
