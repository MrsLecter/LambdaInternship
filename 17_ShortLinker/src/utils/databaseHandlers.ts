import { AuthDb } from "../entity/User";
import { TokensDb } from "../entity/Tokens";
import { UrlsDb } from "../entity/Urls";
import { AppDataSource } from "../data-source";
import { userObjType } from "../types/types";
import { DBError, LackOfDataError } from "./errorHandler";

export const saveUser = async ({
  email: email,
  password: password,
}: userObjType): Promise<void> => {
  if (!email && !password) {
    throw new LackOfDataError("Send email and password");
  }
  AppDataSource.initialize()
    .then(async (appDataSource) => {
      const userObj = new AuthDb();
      userObj.email = email;
      userObj.password = password;
      await AppDataSource.manager.save(userObj);
      AppDataSource.destroy();
    })
    .catch((error) => {
      AppDataSource.destroy();
      throw new DBError((error as Error).message);
    });
};

export const findUserByEmail = async (
  email: string,
): Promise<AuthDb | null> => {
  if (!email) {
    throw new LackOfDataError("Email not provided!");
  }
  return AppDataSource.initialize()
    .then(async () => {
      const authRepository = AppDataSource.getRepository(AuthDb);
      const userObj = await authRepository.findOneBy({
        email: email,
      });
      AppDataSource.destroy();
      return userObj;
    })
    .catch((error) => {
      AppDataSource.destroy();
      throw new DBError((error as Error).message);
    });
};

export const saveToken = async (token: string): Promise<void> => {
  if (!token) {
    throw new LackOfDataError("Token not provided!");
  }
  AppDataSource.initialize()
    .then(async (appDataSource) => {
      const tokensDb = new TokensDb();
      tokensDb.token = token;
      await AppDataSource.manager.save(tokensDb);
      AppDataSource.destroy();
    })
    .catch((error) => {
      AppDataSource.destroy();
      throw new DBError((error as Error).message);
    });
};

export const findToken = async (
  token: string | undefined,
): Promise<TokensDb | null> => {
  if (!token) {
    throw new LackOfDataError("Token not provided!");
  }
  return AppDataSource.initialize()
    .then(async () => {
      const authRepository = AppDataSource.getRepository(TokensDb);
      const tokenObj = await authRepository.findOneBy({
        token: token,
      });
      AppDataSource.destroy();
      return tokenObj;
    })
    .catch((error) => {
      AppDataSource.destroy();
      throw new DBError((error as Error).message);
    });
};

export const findAllUrls = async (email: string | undefined) => {
  if (!email) {
    throw new LackOfDataError("Email not provided!");
  }
  return AppDataSource.initialize()
    .then(async () => {
      const authRepository = AppDataSource.getRepository(UrlsDb);
      const usersObj = await authRepository.findBy({
        email: email,
      });
      AppDataSource.destroy();
      return usersObj;
    })
    .catch((error) => {
      AppDataSource.destroy();
      throw new DBError((error as Error).message);
    });
};
