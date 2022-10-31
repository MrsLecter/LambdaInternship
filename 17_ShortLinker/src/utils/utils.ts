import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import {
  newTokenObjType,
  urlObjType,
  prettiedUrlObjType,
} from "../types/types";
import { LackOfDataError } from "../errorHandlers/errorHandler";
import { validateUrlRegExp } from "../constants";
require("dotenv").config();

export const isValidUrl = (url: string): boolean => {
  try {
    const urlPattern = new RegExp(validateUrlRegExp);

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

export const getTokens = (userEmail: string): newTokenObjType => {
  if (!userEmail) {
    throw new LackOfDataError("User email not provided");
  }
  const ttl = getRandomTTL();
  const refreshToken = jwt.sign({ email: userEmail }, process.env.SECRET_JWT);
  const token = jwt.sign({ email: userEmail }, process.env.SECRET_JWT, {
    expiresIn: ttl,
  });
  return { accessToken: token, refreshToken: refreshToken, TTL: ttl };
};

export const getPrettierUrls = (urls: urlObjType[]): prettiedUrlObjType[] => {
  if (!urls) {
    throw new LackOfDataError("Urls list not provided");
  }
  return urls.map((obj) => {
    return {
      url_original: obj.url,
      url_shorted: `http://${process.env.HOST}:${process.env.PORT}/${obj.url_shorted}`,
    };
  });
};
