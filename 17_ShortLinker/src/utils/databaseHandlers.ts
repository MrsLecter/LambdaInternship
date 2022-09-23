import { AuthDb } from "../entity/User";
import { TokensDb } from "../entity/Tokens";
import { AppDataSource } from "../data-source";
import { refresh } from "../controllers/authControllers";
import { DataSource } from "typeorm";
import { userObjType, tokenObjType } from "./types";

export const saveUser = async ({
  email: email,
  password: password,
}: userObjType) => {
  AppDataSource.initialize()
    .then(async (appDataSource) => {
      let userDb = new AuthDb();
      userDb.email = email;
      userDb.password = password;
      console.log("in save user", userDb);
      await AppDataSource.manager.save(userDb);
      AppDataSource.destroy();
    })
    .catch((error) => {
      AppDataSource.destroy();
      throw new Error(error.message);
    });
};

export const findUserByEmail = async (email: string) => {
  return AppDataSource.initialize()
    .then(async () => {
      const authRepository = AppDataSource.getRepository(AuthDb);
      const userObj = await authRepository.findOneBy({
        email: email,
      });
      console.log("userObj", userObj);
      AppDataSource.destroy();
      return userObj;
    })
    .catch((error) => {
      AppDataSource.destroy();
      throw new Error(error.message);
    });
};

export const saveToken = async (token: string) => {
  AppDataSource.initialize()
    .then(async (appDataSource) => {
      const tokensDb = new TokensDb();
      tokensDb.token = token;
      console.log("savetoken", token);
      await AppDataSource.manager.save(tokensDb);
      AppDataSource.destroy();
    })
    .catch((error) => {
      AppDataSource.destroy();
      throw new Error(error.message);
    });
};

export const findToken = async (
  token: string | undefined,
): Promise<TokensDb | null> => {
  return AppDataSource.initialize()
    .then(async () => {
      if (!token) {
        throw new Error("Token not found!");
      }
      const authRepository = AppDataSource.getRepository(TokensDb);
      const tokenObj = await authRepository.findOneBy({
        token: token,
      });
      console.log("tokenObj", tokenObj);
      AppDataSource.destroy();
      return tokenObj;
    })
    .catch((error) => {
      AppDataSource.destroy();
      throw new Error(error.message);
    });
};
