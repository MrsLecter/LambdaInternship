import express, {Request, Response, NextFunction} from "express";
const mongoConnect = require('../utils/database').mongoConnect;
const {save, findByRout} = require('../models/routs')
 
mongoConnect(client => {
    console.log("MongoDB connected ...");
})

export const getСustom = (req: express.Request, res: Response, next: NextFunction)  =>{
    console.log(req.params.rout);
    findByRout(req.params.rout)
    .then(data => {
        console.log("rout find" , data);
        if(data!==null){
            res.status(200).json(data.obj);
        }else{
            res.status(400).json({"message": "Page not foud"})
        }
        
    })
    .catch(err => console.log(err))
};

export const createCustom = (req: express.Request, res: Response, next: NextFunction)  =>{
    // console.log("post");
    console.log(req.params.rout)
    console.log(req.body);
    let obj = req.body;
    obj.rout = req.params.rout;
    // findByRout("sdgsdfgs");
    save(obj)
    res.status(201).json({"message": "created new rout"})
};
