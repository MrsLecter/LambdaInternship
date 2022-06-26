const {toCalculateDeadline} = require("./utils");

enum LangTime {
  "ru" = 1333,
  "ua" = 1333,
  "en" = 333,
}
type mime = "none" | "doc" | "docx" | "rtf" | "other";
type lang = "ua" | "ru" | "en";

export function getCalculatedTimeMs(language: lang, signCount: number, docType: mime): number {
    const start_time_ms = 30 * 60 * 1000;
    const min_time_ms = 60 * 60 * 1000;
    const time_for_text_ms = Math.ceil(
        (signCount / LangTime[language]) * 60 * 60 * 1000
    );
    let main_time_ms =
        start_time_ms + time_for_text_ms < min_time_ms
        ? min_time_ms
        : start_time_ms + time_for_text_ms;
    if (docType === "other") {
        main_time_ms += main_time_ms * 0.2;
    }
    return main_time_ms;
}

export function getDeadline(language: lang, signCount: number, docType: mime, orderDate: Date): string{
    const timeForWork = getCalculatedTimeMs(language, signCount, docType);
    const deadline = toCalculateDeadline(timeForWork, orderDate);
    return deadline;
}


//ts bugfix
export {};