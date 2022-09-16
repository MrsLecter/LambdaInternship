const { toCalculateDeadline } = require("./utils");

enum LangTime {
  "ru" = 1333,
  "ua" = 1333,
  "en" = 333,
}
type mime = "none" | "doc" | "docx" | "rtf" | "other";
type lang = "ua" | "ru" | "en";

export const getCalculatedTimeMs = (
  language: lang,
  signCount: number,
  docType: mime,
): number => {
  const startTimeMs = 30 * 60 * 1000;
  const minTimeMs = 60 * 60 * 1000;
  const timeForTextMs = Math.ceil(
    (signCount / LangTime[language]) * 60 * 60 * 1000,
  );
  let mainTimeMs =
    startTimeMs + timeForTextMs < minTimeMs
      ? minTimeMs
      : startTimeMs + timeForTextMs;
  if (docType === "other") {
    mainTimeMs += mainTimeMs * 0.2;
  }
  return mainTimeMs;
};

export const getDeadline = (
  language: lang,
  signCount: number,
  docType: mime,
  orderDate: Date,
): string => {
  const timeForWork = getCalculatedTimeMs(language, signCount, docType);
  const deadline = toCalculateDeadline(timeForWork, orderDate);
  return deadline;
};

//ts bugfix
export {};
