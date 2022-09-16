const fs = require("fs");

function toTestUnique(filesAmount) {
  let rezArr = [];

  for (let fileNumber = 0; fileNumber < filesAmount; fileNumber++) {
    let file = fs.readFileSync(
      `./words/out${fileNumber}.txt`,
      "utf8",
      function (err, fileContent) {
        if (err) return err;
        return fileContent;
      },
    );
    let arr = file.split("\n");
    rezArr.push(...arr);
  }
  let set = new Set(rezArr);
  return set.size;
}

let uniqS = performance.now();
let uniqRez = toTestUnique(10); //129240 words
let uniqE = performance.now();
console.log("unique time: ", uniqE - uniqS, "words: ", uniqRez);

function toTestIntersection(filesAmount) {
  let rezArr = [];
  let setArr = [];

  for (let fileNumber = 0; fileNumber < filesAmount; fileNumber++) {
    let file = fs.readFileSync(
      `./words/out${fileNumber}.txt`,
      "utf8",
      function (err, fileContent) {
        if (err) return err;
        return fileContent;
      },
    );
    let arr = file.split("\n");
    let set = new Set(arr);
    setArr.push(set);
  }
  let intersect = setsIntersection(...setArr);
  return intersect.size;
}

let ints10 = performance.now();
let intersectFiles10 = toTestIntersection(10); //1764 words
let inte10 = performance.now();

console.log("time 10 words: ", inte10 - ints10, " words: ", intersectFiles10);

let ints = performance.now();
let intersectFiles = toTestIntersection(20); //441 words
let inte = performance.now();

console.log("time 20 words: ", inte - ints, " words: ", intersectFiles);

function setsIntersection(...sets) {
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
}
