require("dotenv").config();
import mongo from "mongodb";
import { getDB } from "../utils/database";
import { routObjType } from "../types/types";

const { DB_NAME, COLLECTION } = process.env;

export const save = async (obj: routObjType): Promise<void> => {
  const { rout, ...objBody } = obj;
  const client = getDB();
  try {
    if (typeof client === "string") throw Error("database not found!");
    const routObj = client
      .db(DB_NAME)
      .collection(COLLECTION)
      .findOne({ rout: obj.rout });

    routObj.then((routData) => {
      if (!routData) {
        client
          .db(DB_NAME)
          .collection(COLLECTION)
          .insertOne({ rout: rout, obj: objBody });
      } else {
        client
          .db(DB_NAME)
          .collection(COLLECTION)
          .updateOne({ rout: rout }, { $set: { obj: objBody } });
      }
    });
    await client.close();
  } catch (err) {
    throw Error((err as Error).message);
  }
};

export const findByRout = async (routName: string) => {
  const client = getDB();
  try {
    if (typeof client === "string") throw Error("database not found!");
    const routes = client
      .db(DB_NAME)
      .collection(COLLECTION)
      .findOne({ rout: routName });
    await client.close();
    return routes.then((data) => {
      return data;
    });
  } catch (err) {
    throw Error((err as Error).message);
  }
};

export const deleteByRout = async (routName: string) => {
  const client = getDB();
  let objectRout;
  try {
    if (typeof client === "string") throw Error("database not found!");
    const routObj = client
      .db(DB_NAME)
      .collection(COLLECTION)
      .findOne({ rout: routName });

    objectRout = await routObj.then(async (routData) => {
      if (routData) {
        await client.db(DB_NAME).collection(COLLECTION).deleteOne(routData);
      }
      return routData;
    });
    await client.close();
    return objectRout;
  } catch (err: any) {
    throw Error((err as Error).message);
  }
};
