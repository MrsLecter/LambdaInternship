export const getAlphabetSort = (arr) => {
  let words = arr.filter((item) => isNaN(item));
  return words.sort();
};

export const getASCSort = (arr) => {
  let numbers = arr.filter((item) => isNaN(Number(item)) === false);
  numbers = numbers.map((item) => Number(item));
  return numbers.sort((a, b) => a - b);
};

export const getDESCSort = (arr) => {
  let numbers = arr.filter((item) => isNaN(Number(item)) === false);
  numbers = numbers.map((item) => Number(item));
  return numbers.sort((a, b) => b - a);
};

export const getASCSortLetterNumber = (arr) => {
  let words = arr.filter((item) => isNaN(item));
  return words.sort((a, b) => a.length - b.length);
};

export const getUniqueWords = (arr) => {
  let words = arr.filter((item) => isNaN(item));
  let uniq_words = new Set(words);
  return Array.from(uniq_words);
};

export const getUniqueAll = (arr) => {
  let uniq = new Set(arr);
  return Array.from(uniq);
};
