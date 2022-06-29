const mongo = require("mongodb");

const { getDB } = require("../utils/database");

type inputObj = {
  rout: string;
  obj: object;
};

export const save = async (obj: inputObj) => {
  const { rout, ...objBody } = obj;
  const db = getDB();

  await db
    .collection("routes")
    .find({ rout: rout })
    .next()
    .then((data) => {
      if (data === null) {
        db.collection("routes").insertOne({ rout: rout, obj: objBody });
      } else {
        db.collection("routes").updateOne(
          { rout: rout },
          { $set: { obj: objBody } }
        );
      }
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const findByRout = async (rout_name: string) => {
  const db = getDB();
  return await db
    .collection("routes")
    .find({ rout: rout_name })
    .next()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
