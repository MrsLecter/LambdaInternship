enum LangCost {
  "ua" = 0.05,
  "ru" = 0.05,
  "en" = 0.12,
}

type mime = "none" | "doc" | "docx" | "rtf" | "other";
type lang = "ua" | "ru" | "en";

// return price, time, deadline, deadline date
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
