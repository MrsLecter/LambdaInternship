const  {getCalculatedTimeMs, getDeadline} = require('./deadline');

describe('Test case 1: min price for "ru", "docx"', () => {
    it("should return 3600000", () => {
        const mockDateObject = getCalculatedTimeMs("ru", 50, "docx");
        const expectedDate = 3600000;
        expect(mockDateObject).toEqual(expectedDate);
      });
});

describe('Test case 2: min price for "en", "docx"', () => {
  it("should return 3600000", () => {
      const mockDateObject = getCalculatedTimeMs("en", 50, "docx");
      const expectedDate = 3600000;
      expect(mockDateObject).toEqual(expectedDate);
    });
});

describe('Test case 3: min price for "ru", "other"', () => {
  it("should return 4320000", () => {
      const mockDateObject = getCalculatedTimeMs("ru", 50, "other");
      const expectedDate = 4320000;
      expect(mockDateObject).toEqual(expectedDate);
    });
});

describe('Test case 4: normal price for "ru", "doc"', () => {
  it("should return 42310128", () => {
      const mockDateObject = getCalculatedTimeMs("ru", 15000, "doc");
      const expectedDate = 42310128;
      expect(mockDateObject).toEqual(expectedDate);
    });
});

describe('Test case 5: normal price for "en", "rtf"', () => {
  it("should return 98970293", () => {
      const mockDateObject = getCalculatedTimeMs("ru", 35980, "rtf");
      const expectedDate = 98970293;
      expect(mockDateObject).toEqual(expectedDate);
    });
});

describe('Test case 6: normal price for "en", "rtf"', () => {
  it("should return 98970293", () => {
      const mockDateObject = getDeadline("ru", 357945, "doc", new Date(2022, 5, 7, 18, 0));
      const expectedDate = new Date(2022, 6, 19, 17, 1, 33).toLocaleString();
      expect(mockDateObject.toLocaleString()).toEqual(expectedDate);
    });
});