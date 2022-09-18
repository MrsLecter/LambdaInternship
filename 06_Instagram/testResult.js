const fs = require("fs");

const toTestUnique = (filesAmount) => {
  let rezArr = [];

  for (let fileNumber = 0; fileNumber < filesAmount; fileNumber++) {
    const file = fs.readFileSync(
      `./words/out${fileNumber}.txt`,
      "utf8",
      function (err, fileContent) {
        if (err) return err;
        return fileContent;
      },
    );
    const arr = file.split("\n");
    rezArr.push(...arr);
  }
  const set = new Set(rezArr);
  return set.size;
};

const uniqS = performance.now();
const uniqRez = toTestUnique(10); //129240 words
const uniqE = performance.now();
console.log("unique time: ", uniqE - uniqS, "words: ", uniqRez);

const setsIntersection = (...sets) => {
  if (sets.length < 1) {
    return new Set();
  }

  let minSize = sets[0].length;
  let minSetIndex = 0;

  for (let i = 1; i < sets.length; i++) {
    const size = sets[i].size;
    if (size < minSize) {
      minSize = size;
      minSetIndex = i;
    }
  }

  const result = new Set(sets[minSetIndex]);
  for (let i = 1; i < sets.length && i != minSetIndex; i++) {
    for (const v of result) {
      if (!sets[i].has(v)) {
        result.delete(v);
      }
    }
  }
  return result;
};

const toTestIntersection = (filesAmount) => {
  let rezArr = [];
  let setArr = [];

  for (let fileNumber = 0; fileNumber < filesAmount; fileNumber++) {
    const file = fs.readFileSync(
      `./words/out${fileNumber}.txt`,
      "utf8",
      function (err, fileContent) {
        if (err) return err;
        return fileContent;
      },
    );
    const arr = file.split("\n");
    const set = new Set(arr);
    setArr.push(set);
  }
  const intersect = setsIntersection(...setArr);
  return intersect.size;
};

const ints10 = performance.now();
const intersectFiles10 = toTestIntersection(10); //1764 words
const inte10 = performance.now();

console.log("time 10 words: ", inte10 - ints10, " words: ", intersectFiles10);

const ints = performance.now();
const intersectFiles = toTestIntersection(20); //441 words
const inte = performance.now();

console.log("time 20 words: ", inte - ints, " words: ", intersectFiles);
