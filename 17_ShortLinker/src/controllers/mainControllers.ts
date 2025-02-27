import { Request, Response, NextFunction } from "express";
import { isValidUrl, getPrettierUrls } from "../utils/utils";
import { UrlsDb } from "../entity/Urls";
import { AppDataSource } from "../databaseHandler/data-source";
import { LackOfDataError } from "../errorHandlers/errorHandler";
import { findAllUrls } from "../databaseHandler/databaseHandlers";
import shortid from "shortid";

export const startPage = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res
    .status(200)
    .json({ message: "Home page. To use service you need signin" });
};

export const redirectUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.address) {
    throw new LackOfDataError("Address can't be empty");
  }

  let firstUrl;
  AppDataSource.initialize()
    .then(async () => {
      const urlRepository = AppDataSource.getRepository(UrlsDb);
      firstUrl = await urlRepository.findOneBy({
        url_shorted: req.params.address,
      });
      if (!firstUrl) {
        return res
          .status(400)
          .json({ message: `Url [${req.params.address}] not found` });
      }
      return res.redirect(firstUrl.url);
    })
    .catch((err: any) => {
      const error = new Error((err as Error).message);
      return next(error);
    })
    .finally(() => {
      AppDataSource.destroy();
    });
};

export const receiveUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!isValidUrl(req.body.url)) {
    res.status(400).json({ message: "The entered url is not valid" });
  }

  let shortedUrl = req.body.alias ? req.body.alias : shortid.generate();
  AppDataSource.initialize()
    .then(async (_) => {
      const urlDb = new UrlsDb();
      urlDb.email = req.body.email;
      urlDb.url = req.body.url;
      urlDb.url_shorted = shortedUrl;
      await AppDataSource.manager.save(urlDb);
    })
    .catch((err: any) => {
      const error = new Error((err as Error).message);
      return next(error);
    })
    .finally(() => {
      AppDataSource.destroy();
    });

  res.status(200).json({
    old_url: req.body.url,
    shorted_url: `http://${process.env.HOST}:${process.env.PORT}/${shortedUrl}`,
  });
};

export const showAllShortedUrls = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  findAllUrls(email)
    .then((urls) => {
      if (!urls) {
        res.status(200).json({
          message: "No url has been created",
        });
      }
      res.status(200).json({
        email,
        urls: getPrettierUrls(urls),
      });
    })
    .catch((err: any) => {
      const error = new Error((err as Error).message);
      return next(error);
    })
    .finally(() => {
      AppDataSource.destroy();
    });
};
