const fs = require("fs");

function toTestUnique(files_amount) {
  let rezArr = [];

  for (let file_number = 0; file_number < files_amount; file_number++) {
    //read file and receive string
    let file = fs.readFileSync(
      `./words/out${file_number}.txt`,
      "utf8",
      function (err, file_content) {
        if (err) return err;
        return file_content;
      }
    );
    //split string into words
    let arr = file.split("\n");
    // calculate hash for each word and push [hash]: [word] pairs to object
    rezArr.push(...arr);
  }
  let set = new Set(rezArr);
  return set.size;
}

let uniq_s = performance.now();
let uniq_rez = toTestUnique(20);//129240 words
let uniq_e = performance.now();
console.log("unique time: ", uniq_e - uniq_s, "words: ", uniq_rez);

function toTestIntersection(files_amount) {
  let rezArr = [];
  let setArr = [];

  for (let file_number = 0; file_number < files_amount; file_number++) {
    let file = fs.readFileSync(
      `./words/out${file_number}.txt`,
      "utf8",
      function (err, file_content) {
        if (err) return err;
        return file_content;
      }
    );
    let arr = file.split("\n");
    let set = new Set(arr);
    setArr.push(set);
  }
  let intersect = setsIntersection(...setArr);
  return intersect.size;
}

let ints10 = performance.now();
let intersectFiles10 = toTestIntersection(10);//1764 words
let inte10 = performance.now();

console.log("time 10 words: ", inte10 - ints10, " words: ", intersectFiles10);

let ints = performance.now();
let intersectFiles = toTestIntersection(20);//441 words
let inte = performance.now();

console.log("time 20 words: ", inte - ints, " words: ", intersectFiles);

function setsIntersection(...sets) {
  if (sets.length < 1) {
    return new Set();
  }

  let min_size = sets[0].length;
  let min_set_index = 0;

  for (let i = 1; i < sets.length; i++) {
    const size = sets[i].size;
    if (size < min_size) {
      min_size = size;
      min_set_index = i;
    }
  }

  const result = new Set(sets[min_set_index]);
  for (let i = 1; i < sets.length && i != min_set_index; i++) {
    for (const v of result) {
      if (!sets[i].has(v)) {
        result.delete(v);
      }
    }
  }
  return result;
}
