const functions = require("../../dist/utils/functions");

test("test getAlphabetSort function: sort [c, d, b, a] to equal [a, b, c, d]", () => {
  const arr = ["c", "d", "b", "a"];
  const expected = ["a", "b", "c", "d"].join("");
  const result = functions.getAlphabetSort(arr).join("");
  expect(result).toBe(expected);
});

test("test getASCSort: sort [6, 2, 4, 1] to equal [1, 2, 4, 6]", () => {
  const arr = [6, 2, 4, 1];
  const expected = [1, 2, 4, 6].join("");
  const result = functions.getASCSort(arr).join("");
  expect(result).toBe(expected);
});

test("test getDESCSort: sort [6, 2, 4, 1] to equal [6, 4, 2, 1]", () => {
  const arr = [6, 2, 4, 1];
  const expected = [6, 4, 2, 1].join("");
  const result = functions.getDESCSort(arr).join("");
  expect(result).toBe(expected);
});

test("test getASCSortLetterNumber: sort ['ab', 'mdnf', 's', 'etere'] to equal ['s', 'ab', 'mdnf', 'etere']", () => {
  const arr = ["ab", "mdnf", "s", "etere"];
  const expected = ["s", "ab", "mdnf", "etere"].join("");
  const result = functions.getASCSortLetterNumber(arr).join("");
  expect(result).toBe(expected);
});

test("test getUniqueAll: sort ['ab', 'abc', 'a', 'trt', 'ab', 'abc'] to equal ['a', 'trt']", () => {
  const arr = ["ab", "abc", "a", "trt", "ab", "abc"];
  const expected = ["a", "trt"].join("");
  const result = functions.getUniqueAll(arr).join("");
  expect(result).toBe(expected);
});

test("test getUniqueAll: sort [ 1, 6, 'ab', 8, 6, 'abc', 5, 0, 1,'a', 'trt', 'ab', 'abc'] to equal ['a', 'trt']", () => {
  const arr = [1, 6, "ab", 8, 6, "abc", 5, 0, 1, "a", "trt", "ab", "abc"];
  const expected = [8, 5, "a", "trt"].join("");
  const result = functions.getUniqueAll(arr).join("");
  console.log(result);
  expect(result).toBe(expected);
});
