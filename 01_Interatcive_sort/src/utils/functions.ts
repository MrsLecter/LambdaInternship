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

export const getUniqueAll = (arr: string[]): string[] => {
  const words = arr.filter((item) => parseInt(item) || item.length > 0);
  console.log(words);
  const map = new Map();
  for (let word of words) {
    if (map.has(word)) {
      map.set(word, map.get(word) + 1);
    }
    if (!map.has(word)) {
      map.set(word, 1);
    }
  }
  const uniq_words = [];
  for (const word of Array.from(map)) {
    if (word[1] === 1) {
      uniq_words.push(word[0]);
    }
  }
  return uniq_words;
};
