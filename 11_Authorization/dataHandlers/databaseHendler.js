const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
require("dotenv").config();

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://guest:r4dRatalNHmznDqw@cluster0.2vrmo.mongodb.net/auth-db?retryWrites=true&w=majority",
  )
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

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.getDB = getDB;
exports.mongoConnect = mongoConnect;
