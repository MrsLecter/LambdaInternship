export const getAlphabetSort = (arr: string[]): string[] => {
  let words = arr.filter((item) => isNaN(parseInt(item)));
  return words.sort();
};

export const getASCSort = (arr: string[]): number[] => {
  const strings = arr.filter((item) => isNaN(Number(item)) === false);
  const numbers = strings.map((item) => Number(item));
  return numbers.sort((a, b) => a - b);
};

export const getDESCSort = (arr: string[]): number[] => {
  const strings = arr.filter((item) => isNaN(Number(item)) === false);
  const numbers = strings.map((item) => Number(item));
  return numbers.sort((a, b) => b - a);
};

export const getASCSortLetterNumber = (arr: string[]): string[] => {
  const words = arr.filter((item) => isNaN(parseInt(item)));
  return words.sort((a, b) => a.length - b.length);
};

export const getUniqueWords = (arr: string[]): string[] => {
  const words = arr.filter((item) => isNaN(parseInt(item)));
  const uniq_words = new Set(words);
  return Array.from(uniq_words);
};

export const getUniqueAll = (arr: string[]): string[] => {
  const uniq = new Set(arr);
  return Array.from(uniq);
};
