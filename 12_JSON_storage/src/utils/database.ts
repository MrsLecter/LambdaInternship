require("dotenv").config();
import { MongoClient } from "mongodb";

export const getDB = (): MongoClient | string => {
  const client = new MongoClient(process.env.CLIENT_STR);
  if (client) {
    return client;
  }
  throw new Error("No database found!");
};
