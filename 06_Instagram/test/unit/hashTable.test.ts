const functions = require("../../dist/hashTable");

test("Уникальных словосочетаний: 129233", () => {
  const allFilesData = functions.getAllFiles(20);
  const unicWords = functions.getUniqueValues(allFilesData);
  expect(unicWords).toBe("Unique word combinations: 129233 in 20 files");
});

test("Словосочетаний, которые есть во всех 20 файлах: 441", () => {
  const allFilesData = functions.getAllFiles(20);
  const unicWords = functions.getIntersection(allFilesData);
  expect(unicWords).toBe("Word combinations that are in all 20 files: 441");
});

test("Словосочетаний, которые есть во всех 10 файлах: 73246", () => {
  const allFilesData = functions.getAllFiles(20);
  const unicWords = functions.getIntersection(allFilesData, 10);
  expect(unicWords).toBe("Word combinations that are in all 10 files: 73246");
});
