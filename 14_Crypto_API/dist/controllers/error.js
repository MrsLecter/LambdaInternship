"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get404 = void 0;
var get404 = function (req, res, next) {
    res.status(404).json({ message: "Rout not found" });
};
exports.get404 = get404;
