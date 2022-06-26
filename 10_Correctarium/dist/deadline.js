"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { toCalculateDeadline } = require("./utils");
var LangTime;
(function (LangTime) {
    LangTime[LangTime["ru"] = 1333] = "ru";
    LangTime[LangTime["ua"] = 1333] = "ua";
    LangTime[LangTime["en"] = 333] = "en";
})(LangTime || (LangTime = {}));
function getCalculatedTimeMs(language, signCount, docType) {
    const start_time_ms = 30 * 60 * 1000;
    const min_time_ms = 60 * 60 * 1000;
    const time_for_text_ms = Math.ceil((signCount / LangTime[language]) * 60 * 60 * 1000);
    let main_time_ms = start_time_ms + time_for_text_ms < min_time_ms
        ? min_time_ms
        : start_time_ms + time_for_text_ms;
    if (docType === "other") {
        main_time_ms += main_time_ms * 0.2;
    }
    return main_time_ms;
}
exports.getCalculatedTimeMs = getCalculatedTimeMs;
function getDeadline(language, signCount, docType, orderDate) {
    const timeForWork = getCalculatedTimeMs(language, signCount, docType);
    const deadline = toCalculateDeadline(timeForWork, orderDate);
    return deadline;
}
exports.getDeadline = getDeadline;
