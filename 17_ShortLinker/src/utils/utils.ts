const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { saveTokens } = require("./databaseHandlers");
require("dotenv").config();

export const isValidUrl = (url: string): boolean => {
  try {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i",
    );

    return Boolean(new URL(url)) && !!urlPattern.test(url);
  } catch (e) {
    return false;
  }
};

export const getRandomTTL = (): number => {
  const minTime = 60;
  const maxTime = 120;
  const ttlInS = Math.floor(Math.random() * (maxTime - minTime + 1) + minTime);
  return ttlInS;
};

export const getTokens = (userEmail: string) => {
  const ttl = getRandomTTL();
  const refreshToken = uuid();
  const token = jwt.sign({ email: userEmail }, process.env.SECRET_JWT, {
    expiresIn: ttl,
  });
  return { accessToken: token, refreshToken: refreshToken, TTL: ttl };
};
