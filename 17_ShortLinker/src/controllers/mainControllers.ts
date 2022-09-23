import express, { Request, Response, NextFunction } from "express";
import { isValidUrl } from "../utils/utils";
import { UrlsDb } from "../entity/Urls";
import { AppDataSource } from "../data-source";
import { DataSource, DataSourceOptions } from "typeorm";
const jwt = require("jsonwebtoken");

const shortid = require("shortid");

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
  console.log(req.params.address);
  let firstUrl;
  AppDataSource.initialize()
    .then(async () => {
      console.log("Data Source has been initialized!");
      const urlRepository = AppDataSource.getRepository(UrlsDb);
      firstUrl = await urlRepository.findOneBy({
        url_shorted: req.params.address,
      });
      console.log(
        "req.params.address",
        req.params.address,
        "firstUrl",
        firstUrl,
      );
      if (firstUrl === null) {
        AppDataSource.destroy();
        res
          .status(400)
          .json({ message: `Url [${req.params.address}] not found` });
      } else {
        AppDataSource.destroy();
        res.redirect(firstUrl.url);
      }
    })
    .catch((error) => {
      AppDataSource.destroy();
      throw new Error(error.message);
    });

  //
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
    .then(async (appDataSource) => {
      const urlDb = new UrlsDb();
      urlDb.email = req.body.email;
      urlDb.url = req.body.url;
      urlDb.url_shorted = shortedUrl;
      await AppDataSource.manager.save(urlDb);
      AppDataSource.destroy();
    })
    .catch((error) => {
      AppDataSource.destroy();
      throw new Error(error.message);
    });

  res.status(200).json({
    old_url: req.body.url,
    shorted_url: `http://${process.env.HOST}:${process.env.PORT}/${shortedUrl}`,
  });
};
