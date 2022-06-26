const  {toCalculateDeadline, fitInRange,  ifCurrentDayInRange,ifCurrentHourInRange, getNextDay, setRightHours,addWorkingHours} = require('./utils');

describe('Test case 1: working day deadline', () => {
    it("should return 08.06.22 18:30, demanded time : 24h", () => {
        const working_time = 24*60*60*1000;
        const testDate = new Date(2022, 5, 6, 12, 30);
        const mockDateObject = toCalculateDeadline(working_time, testDate);
        const expectedDate = new Date(2022, 5, 8, 18, 30).toLocaleString();
        expect(mockDateObject.toLocaleString()).toEqual(expectedDate);
      });
});

describe('Test case 2: working day deadline including seconds', () => {
    it("should return 10.06.22 11:57:45, demanded time : 28:32:45", () => {
        const working_time = 28*60*60*1000 + 32 * 60*1000 + 45*1000;
        const testDate = new Date(2022, 5, 7, 10, 25);
        const mockDateObject = toCalculateDeadline(working_time, testDate);
        const expectedDate = new Date(2022, 5, 10, 11, 57, 45).toLocaleString();
        expect(mockDateObject.toLocaleString()).toEqual(expectedDate);
      });
});

describe('Test case 3: in working day range', () => {
    it("should return 08.06.22 16:46, demanded time : 3:21", () => {
        const working_time = 3*60*60*1000 + 21 * 60*1000;
        const testDate = new Date(2022, 5, 8, 13, 25);
        const mockDateObject = toCalculateDeadline(working_time, testDate);
        const expectedDate = new Date(2022, 5, 8, 16, 46).toLocaleString();
        expect(mockDateObject.toLocaleString()).toEqual(expectedDate);
      });
});

describe('Test case 4: jumping through the weekend ', () => {
    it("should return 03.06.22 15:10, demanded time : 12:30", () => {
        const working_time = 12*60*60*1000 + 30 * 60*1000;
        const testDate = new Date(2022, 5, 3, 15, 10);
        const mockDateObject = toCalculateDeadline(working_time, testDate);
        const expectedDate = new Date(2022, 5, 6, 18, 40).toLocaleString();
        expect(mockDateObject.toLocaleString()).toEqual(expectedDate);
      });
});

describe('Test case 5: in range', () => {
    it("should return 02.06.22 15:30, demanded time : 3h", () => {
        const working_time = 3*60*60*1000 ;
        const testDate = new Date(2022, 5, 2, 12, 30);
        const mockDateObject = toCalculateDeadline(working_time, testDate);
        const expectedDate = new Date(2022, 5, 2, 15, 30).toLocaleString();
        expect(mockDateObject.toLocaleString()).toEqual(expectedDate);
      });
});

describe('Test case 6: weekend order', () => {
    it("should return 06.06.22 16:00, demanded time : 6h", () => {
        const working_time = 6*60*60*1000;
        const testDate = new Date(2022, 5, 4, 10, 15);
        const mockDateObject = toCalculateDeadline(working_time, testDate);
        const expectedDate = new Date(2022, 5, 6, 16, 0).toLocaleString();
        expect(mockDateObject.toLocaleString()).toEqual(expectedDate);
      });
});

describe('Test case 7: time out of range', () => {
    it("should return 07.06.22 18:00, demanded time : 3h", () => {
        const working_time = 3*60*60*1000 ;
        const testDate = new Date(2022, 5, 6, 21, 0);
        const mockDateObject = toCalculateDeadline(working_time, testDate);
        const expectedDate = new Date(2022, 5, 7, 13, 0).toLocaleString();
        expect(mockDateObject.toLocaleString()).toEqual(expectedDate);
      });
});

describe('Test case 8: too late order and jump through the weekend', () => {
    it("should return 06.06.22 11:20, demanded time : 1:20", () => {
        const working_time = 1 * 60 * 60 * 1000 + 20 * 60 * 1000;
        const testDate = new Date(2022, 5, 3, 19, 30);
        const mockDateObject = toCalculateDeadline(working_time, testDate);
        const expectedDate = new Date(2022, 5, 6, 11, 20).toLocaleString();
        expect(mockDateObject.toLocaleString()).toEqual(expectedDate);
      });
});


describe('Test case 9: too early order', () => {
    it("should return 06.06.22 18:00, demanded time : 8h", () => {
        const working_time = 8*60*60*1000;
        const testDate = new Date(2022, 5, 6, 5,0);
        const mockDateObject = toCalculateDeadline(working_time, testDate);
        const expectedDate = new Date(2022, 5, 6, 18, 0).toLocaleString();
        expect(mockDateObject.toLocaleString()).toEqual(expectedDate);
      });
});

describe('Test case 10: test finInRange', () => {
    it("should return 06.06.22 10:00", () => {
        const testDate = new Date(2022, 5, 4, 18, 0);
        const expectedDate = fitInRange(testDate);
        const mockDateObject = new Date(2022, 5, 6, 10, 0).toLocaleString();
        expect(mockDateObject).toEqual(testDate.toLocaleString());
      });
});


describe('Test case 11: is working day?', () => {
    it("should return false", () => {
        const mockAnsw = ifCurrentDayInRange(new Date(2022, 5, 4, 18, 0));
        expect(mockAnsw).toBeFalsy();
      });
});

describe('Test case 12: test finInRange', () => {
    it("should return 05.06.22 18:00", () => {
        const testDate = new Date(2022, 5, 4, 18, 0);
        const mockAnsw = getNextDay(testDate);
        const expectedDate = new Date(2022, 5, 5, 18, 0);
        expect(expectedDate.toLocaleString()).toEqual(testDate.toLocaleString());
      });
});

describe('Test case 13: test ifCurrentHourInRange', () => {
    it("should return true", () => {
        const testDate = new Date(2022, 5, 7, 18, 0);
        const mockAnsw = ifCurrentHourInRange(testDate);
        expect(mockAnsw).toBeTruthy();
      });
});

describe('Test case 14: test setRightHours', () => {
    it("should return 07.06.22 10:00", () => {
        const testDate = new Date(2022, 5, 7, 5, 0);
        const mockAnsw = setRightHours(testDate);
        const expectedDate = new Date(2022, 5, 7, 10, 0);
        expect(expectedDate.toLocaleString()).toEqual(mockAnsw.toLocaleString());
      });
});

describe('Test case 15: test addWorkingHours', () => {
    it("should return 07.06.22 10:00", () => {
        const testDate = new Date(2022, 5, 7, 10, 0);
        const working_time = 5 * 60 * 60 * 1000;
        const mockAnsw = addWorkingHours(working_time, testDate);
        let expectedDate = new Date(2022, 5, 7, 15, 0);
        expect(expectedDate.toLocaleString()).toEqual(mockAnsw.toLocaleString());
      });
});