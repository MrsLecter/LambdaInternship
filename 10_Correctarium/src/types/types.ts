export enum LangCost {
  "ua" = 0.05,
  "ru" = 0.05,
  "en" = 0.12,
}

export enum LangTime {
  "ru" = 1333,
  "ua" = 1333,
  "en" = 333,
}

export type Mime = "none" | "doc" | "docx" | "rtf" | "other";
export type Lang = "ua" | "ru" | "en";
