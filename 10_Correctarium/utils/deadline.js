var LangTime;
(function (LangTime) {
    LangTime[LangTime["ru"] = 1333] = "ru";
    LangTime[LangTime["ua"] = 1333] = "ua";
    LangTime[LangTime["en"] = 333] = "en";
})(LangTime || (LangTime = {}));
;
function getCalculatedTime(language, signCount, docType) {
    var start_time_ms = 30 * 60 * 1000;
    var min_time_ms = 60 * 60 * 1000;
    var time_for_text_ms = Math.ceil((signCount / LangTime[language]) * 60 * 60 * 1000);
    var main_time = ((start_time_ms + time_for_text_ms) < min_time_ms) ? min_time_ms : (start_time_ms + time_for_text_ms);
    console.log(time_for_text_ms, min_time_ms);
    if (docType === 'other') {
        main_time += main_time * 0.2;
    }
    return main_time;
}
console.log(getCalculatedTime("ru", 50, "other"));
