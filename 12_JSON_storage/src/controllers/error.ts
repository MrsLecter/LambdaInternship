import express, {Request, Response, NextFunction} from "express";

export const get404 = (req: express.Request, res: Response, next: NextFunction)  =>{
    console.log("404 error occured")
    res.status(404).send('not found');
};