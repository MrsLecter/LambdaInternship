import { LangCost, mime, lang } from "../types/types";

export const getCost = (
  language: lang,
  signCount: number,
  docType: mime,
): number => {
  let signCost =
    signCount * LangCost[language] < LangCost[language] * 1000
      ? LangCost[language] * 1000
      : signCount * LangCost[language];
  const percent = 0.2;
  if (docType === "other") {
    signCost += signCost * percent;
  }
  return +signCost.toFixed(3);
};
