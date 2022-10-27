"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var error_1 = require("./controllers/error");
var body_parser_1 = require("body-parser");
var morgan_1 = __importDefault(require("morgan"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var mainRoutes_1 = __importDefault(require("./routes/mainRoutes"));
// import { toRefreshDbData } from "./sheduled_jobs/cron_job";
var PORT = process.env.PORT;
var app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, helmet_1.default)());
var logStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, "logs.log"), {
    flags: "a",
});
app.use((0, morgan_1.default)("combined", { stream: logStream }));
// toRefreshDbData();
app.use(mainRoutes_1.default);
app.use(error_1.get404);
var errHandler = function (err, req, res, next) {
    console.error(err.stack);
    return res.status(500).json({ message: "Internal Server Error" });
};
app.use(errHandler);
try {
    app.listen(PORT || 3000, function () {
        console.log("Server is running on port ".concat(PORT));
    });
}
catch (e) {
    console.log(e);
    throw new Error("An error occured");
}
