require("dotenv").config();
import { getDB } from "../utils/database";
import { RoutObjType } from "../types/types";

const { DB_NAME, COLLECTION } = process.env;

export const save = async (obj: RoutObjType): Promise<void> => {
  const { rout, ...objBody } = obj;
  const client = getDB();
  try {
    if (typeof client === "string") throw Error("database not found!");
    const routObj = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .findOne({ rout: obj.rout });
    if (!routObj) {
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
  } catch (err) {
    throw Error((err as Error).message);
  }
};

export const findByRout = async (routName: string) => {
  const client = getDB();
  try {
    if (typeof client === "string") throw Error("database not found!");
    const routes = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .findOne({ rout: routName });
    return routes;
  } catch (err: any) {
    throw Error((err as Error).message);
  }
};

export const deleteByRout = async (routName: string) => {
  const client = getDB();
  let objectRout;
  try {
    if (typeof client === "string") throw Error("database not found!");
    const routObj = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .findOne({ rout: routName });
    if (routObj) {
      await client.db(DB_NAME).collection(COLLECTION).deleteOne(routObj);
    }
    return routObj;
  } catch (err: any) {
    throw Error((err as Error).message);
  }
};
