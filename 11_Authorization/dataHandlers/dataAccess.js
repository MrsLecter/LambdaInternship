const { MongoClient } = require("mongodb");

const { getDB } = require("./databaseHendler");

const saveUser = async (obj) => {
  const db = getDB();
  await db
    .collection("users")
    .insertOne(obj)
    .catch((err) => {
      throw new Error(err);
    });
};

const findUserByEmail = async (email) => {
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
};

const saveTokens = async (obj) => {
  const db = getDB();
  await db
    .collection("user_data")
    .updateOne(
      { user: "current" },
      { $set: { email: obj.email }, $set: { refreshToken: obj.refreshToken } },
    )
    .catch((err) => {
      throw new Error(err);
    });
};

const findTokens = async () => {
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
};

exports.saveUser = saveUser;
exports.findUserByEmail = findUserByEmail;
exports.saveTokens = saveTokens;
exports.findTokens = findTokens;
