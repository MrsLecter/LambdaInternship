require("dotenv").config();
import { MongoClient } from "mongodb";
import { RoutObjType } from "../types/types";

const { DB_NAME, COLLECTION } = process.env;

class MongoHandler {
  client: MongoClient;
  constructor() {
    this.client = new MongoClient(process.env.CLIENT_STR);
  }
  public async save(obj: RoutObjType): Promise<void> {
    const { rout, ...objBody } = obj;
    try {
      if (typeof this.client === "string") throw Error("database not found!");
      const routObj = await this.client
        .db(DB_NAME)
        .collection(COLLECTION)
        .findOne({ rout: obj.rout });
      if (!routObj) {
        await this.client
          .db(DB_NAME)
          .collection(COLLECTION)
          .insertOne({ rout: rout, obj: objBody });
      } else {
        await this.client
          .db(DB_NAME)
          .collection(COLLECTION)
          .updateOne({ rout: rout }, { $set: { obj: objBody } });
      }
    } catch (err) {
      throw Error((err as Error).message);
    }
  }

  public async findByRout(routName: string) {
    try {
      if (typeof this.client === "string") throw Error("database not found!");
      const routes = await this.client
        .db(DB_NAME)
        .collection(COLLECTION)
        .findOne({ rout: routName });
      return routes;
    } catch (err: any) {
      throw Error((err as Error).message);
    }
  }

  public async deleteByRout(routName: string) {
    let objectRout;
    try {
      if (typeof this.client === "string") throw Error("database not found!");
      const routObj = await this.client
        .db(DB_NAME)
        .collection(COLLECTION)
        .findOne({ rout: routName });
      if (routObj) {
        await this.client.db(DB_NAME).collection(COLLECTION).deleteOne(routObj);
      }
      return routObj;
    } catch (err: any) {
      throw Error((err as Error).message);
    }
  }
}

export const db = new MongoHandler();
