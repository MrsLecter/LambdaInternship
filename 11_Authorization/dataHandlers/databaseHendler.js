const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
require("dotenv").config();

// let _db;

// const mongoConnect = (callback) => {
//   MongoClient.connect(process.env.MONGO_STR)
//     .then((client) => {
//       console.log("MongoDB connected ... ");
//       _db = client.db();
//       callback(client);
//     })
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     });
// };

// const getDB = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "No database found!";
// };

// exports.mongoConnect = mongoConnect;
// exports.getDB = getDB;

class DatabaseHandler {
  constructor() {
    this.client = MongoClient.connect(process.env.MONGO_STR);
    this.db = this.client.db();
  }

  async saveUser(obj) {
    const db = getDB();
    let dbOp;
    await db
      .collection("users")
      .insertOne(obj)
      .catch((err) => {
        throw new Error(err);
      });
  }

  async findUserByEmail(email) {
    const db = getDB();
    return await db
      .collection("users")
      .find({ email: email })
      .next()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  async saveTokens(obj) {
    const db = getDB();
    await db
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
  }

  async findTokens() {
    const db = getDB();
    return await db
      .collection("user_data")
      .find({ user: "current" })
      .next()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

exports.databaseHendler = new DatabaseHandler();
