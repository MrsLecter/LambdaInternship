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
      console.log(err);
      throw err;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
