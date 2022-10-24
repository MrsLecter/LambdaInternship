const { getCost } = require("../../build/utils/cost.js");

describe("lower then minimal", () => {
  test('getCost(language: "ru", signCount: "20", docType: "doc") to equal 50', () => {
    expect(getCost("ru", "20", "docx")).toBe(50);
  });

  test('getCost(language: "ua", signCount: "20", docType: "doc") to equal 50', () => {
    expect(getCost("ua", "20", "doc")).toBe(50);
  });

  test('getCost(language: "en", signCount: "20", docType: "doc") to equal 120', () => {
    expect(getCost("en", "20", "rtf")).toBe(120);
  });
});

describe("normal mode", () => {
  test('getCost(language: "ua", signCount: "50000", docType: "doc") to equal 120', () => {
    expect(getCost("ua", "50000", "rtf")).toBe(2500);
  });

  test('getCost(language: "ru", signCount: "3500", docType: "doc") to equal 175', () => {
    expect(getCost("ru", "3500", "docx")).toBe(175);
  });

  test('getCost(language: "en", signCount: "7800", docType: "doc") to equal 936', () => {
    expect(getCost("en", "7800", "doc")).toBe(936);
  });
});

describe("change format to other", () => {
  test('getCost(language: "en", signCount: "15000", docType: "other") to equal 2160', () => {
    expect(getCost("en", "15000", "other")).toBe(2160);
  });
});
