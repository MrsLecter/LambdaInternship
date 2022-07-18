"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express = require("express");
var _a = require("express"), Request = _a.Request, Response = _a.Response, NextFunction = _a.NextFunction;
var helmet = require("helmet");
var error_1 = require("./controllers/error");
var json = require("body-parser").json;
var morgan = require("morgan");
var fs = require('fs');
var path = require('path');
var mainRoutes_1 = __importDefault(require("./routes/mainRoutes"));
var cron_job_1 = require("./sheduled_jobs/cron_job");
var PORT = process.env.PORT;
var app = express();
app.use(json());
app.use(helmet());
var logStream = fs.createWriteStream(path.join(__dirname, "logs.log"), {
    flags: "a"
});
app.use(morgan('combined', { stream: logStream }));
cron_job_1.toRefreshDbData();
app.use(mainRoutes_1.default);
app.use(error_1.get404);
var errHandler = function (err, req, res, next) {
    console.error(err.stack);
    return res.status(500).json({ message: "Internal Server Error" });
};
app.use(errHandler);
try {
    app.listen(PORT || 3000);
    console.log("Server is running on port " + PORT);
}
catch (e) {
    console.log(e);
    throw new Error('An error occured');
}
