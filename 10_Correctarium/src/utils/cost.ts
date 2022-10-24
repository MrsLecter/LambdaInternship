import { LangCost, Mime, Lang } from "../types/types";

export const getCost = (
  language: Lang,
  signCount: number,
  docType: Mime,
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
