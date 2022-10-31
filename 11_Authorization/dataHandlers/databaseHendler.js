const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
require("dotenv").config();

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.MONGO_STR)
    .then((client) => {
      console.log("MongoDB connected ... ");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
/*
const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.getDB = getDB;
exports.mongoConnect = mongoConnect;
*/

class MongoHandler {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_STR);
  }
  async saveUser(obj) {
    await this.client
      .collection("users")
      .insertOne(obj)
      .catch((err) => {
        throw new Error(err);
      });
    await this.client.close();
  }
  async findUserByEmail(email) {
    const user = await this.client
      .collection("users")
      .find({ email: email })
      .next()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw new Error(err);
      });
    this.client.close();
    return user;
  }

  async saveTokens(obj) {
    await this.client
      .collection("user_data")
      .updateOne(
        { user: "current" },
        {
          $set: { email: obj.email },
          $set: { refreshToken: obj.refreshToken },
        },
      )
      .catch((err) => {
        throw new Error(err);
      });
    this.client.close();
  }

  async findTokens() {
    const token = await this.client
      .collection("user_data")
      .find({ user: "current" })
      .next()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw new Error(err);
      });
    this.client.close();
  }
}

exports.db = new MongoHandler();
exports.mongoConnect = mongoConnect;
