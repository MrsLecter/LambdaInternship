const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { saveTokens } = require("../dataHandlers/dataAccess");
require("dotenv").config();

const getRandomTTL = () => {
  const minTime = 30;
  const maxTime = 60;
  const ttlInS = Math.floor(Math.random() * (maxTime - minTime + 1) + minTime);
  return ttlInS;
};

const getTokens = (userEmail) => {
  const ttl = getRandomTTL();
  const refreshToken = uuid();
  const token = jwt.sign({ email: userEmail }, process.env.SECRET_KEY, {
    expiresIn: ttl,
  });
  saveTokens({
    user: "curent",
    email: userEmail,
    accessToken: token,
    refreshToken,
  });
  return { accessToken: token, refreshToken: refreshToken, TTL: ttl };
};

module.exports = { getRandomTTL, getTokens };
