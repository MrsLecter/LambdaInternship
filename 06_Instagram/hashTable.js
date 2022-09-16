const crc32 = require("crc-32");
const fs = require("fs");

const ALL_FILES_AMOUNT = 20;

const getAllFiles = (filesAmount = 1) => {
  let allFiles = [];
  for (let file_number = 0; file_number < filesAmount; file_number++) {
    let file = fs.readFileSync(
      `./words/out${file_number}.txt`,
      "utf8",
      function (err, file_content) {
        if (err) return err;
        return file_content;
      },
    );

    allFiles.push(file.split("\n"));
  }
  return allFiles;
};

const getUniqueValues = (filesData) => {
  let hTable = {};

  for (let file of filesData) {
    for (let word of file) {
      let hash = crc32.str(word);
      let index = Math.abs(hash);
      hTable[index] = word;
    }
  }
  const hTableLength = Object.keys(hTable).length;
  return `Unique word combinations: ${hTableLength} in ${filesData.length} files`;
};

const getIntersection = (filesData) => {
  let hTable = {};
  let filesAmount = filesData.length;
  let rezArr = [];
  let fileIndex = 0;

  for (let file of filesData) {
    for (let word of file) {
      let hash = crc32.str(word);
      let index = Math.abs(hash);

      if (!!hTable[index]) {
        if (!hTable[index][0].includes(fileIndex)) {
          hTable[index][0].push(fileIndex);
        }
      } else {
        hTable[index] = [];
        hTable[index][0] = [fileIndex];
        hTable[index][1] = word;
      }
    }
    fileIndex++;
  }

  if (filesAmount === 20) {
    for (let item in hTable) {
      if (hTable[item][0].length === filesAmount) {
        rezArr.push(hTable[item]);
      }
    }
  } else if (filesAmount === 10) {
    for (let item in hTable) {
      if (hTable[item][0].length >= 10) {
        rezArr.push(hTable[item]);
      }
    }
  }

  return `Word combinations that are in all ${filesAmount} files: ${rezArr.length}`;
};

const allFilesData = getAllFiles(20);

let startUnic = performance.now();
let unicWords = getUniqueValues(allFilesData);
let finishUnic = performance.now();
console.log(unicWords); //20 files ==> 129233
console.log("time: " + (finishUnic - startUnic) + " msec ");
//from 870.4358449988067 msec

const allFilesData10 = getAllFiles(10);

let intersectoinStart10 = performance.now();
let iintWords10 = getIntersection(allFilesData10);
let intersectoinFinish10 = performance.now();
console.log(iintWords10); //10 files ==> 1764;
console.log("time: ", intersectoinFinish10 - intersectoinStart10, " msec ");

let intersectoinStart = performance.now();
let intWords = getIntersection(allFilesData);
let intersectoinFinish = performance.now();
console.log(intWords); //20 files ==> 441
console.log("time: ", intersectoinFinish - intersectoinStart, " msec ");
//10 files => time: 1299.0277260020375 msec
//20 files => time: 1782.0763970017433 msec
