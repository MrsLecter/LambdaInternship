const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;
require("dotenv").config();

class MongoHandler {
  async connect() {
    try {
      const connection = await mongoClient.connect(process.env.MONGO_STR, {
        useNewUrlParser: true,
      });
      this.db = connection.db(process.env.MONGO_DB);
      console.info("MongoClient Connection successfull.");
    } catch (err) {
      const error = new Error(err);
      console.error(error);
    }
  }

  async saveUser(obj) {
    try {
      await this.db.collection("users").insertOne(obj);
    } catch (err) {
      const error = new Error(err);
      console.error(error);
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await this.db
        .collection("users")
        .find({ email: email })
        .next();
      return user;
    } catch (err) {
      const error = new Error(err);
      console.error(error);
    }
  }

  async saveToken(obj) {
    try {
      await this.db
        .collection("expired_tokens")
        .insertOne({ user: obj.email, refreshToken: obj.refreshToken });
    } catch (err) {
      const error = new Error(err);
      console.error(error);
    }
  }

  async findTokens(userToken) {
    try {
      const dbToken = await this.db
        .collection("expired_tokens")
        .find({ refreshToken: userToken })
        .next();
      return dbToken;
    } catch (err) {
      const error = new Error(err);
      console.error(error);
    }
  }
}
exports.db = new MongoHandler();
