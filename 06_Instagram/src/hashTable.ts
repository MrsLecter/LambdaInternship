const crc32 = require("crc-32");
const fs = require("fs");
import { intersectionTable, uniqueTable } from "./types/types";

const ALL_FILES_AMOUNT = 20;

const getAllFiles = (filesAmount = 1): string[] => {
  let allFiles = [] as string[];
  try {
    for (let file_number = 0; file_number < filesAmount; file_number++) {
      const file = fs.readFileSync(`./words/out${file_number}.txt`, "utf8");

      allFiles.push(file.split("\n"));
    }
    return allFiles;
  } catch (err) {
    throw Error((err as Error).message);
  }
};

const getUniqueValues = (filesData: string[]): string => {
  let hTable = {} as uniqueTable;

  for (let file of filesData) {
    for (let word of file) {
      const hash = crc32.str(word);
      const index = Math.abs(hash);
      hTable[index] = word;
    }
  }
  const hTableLength = Object.keys(hTable).length;
  return `Unique word combinations: ${hTableLength} in ${filesData.length} files`;
};

const getIntersection = (
  filesData: string[],
  filesNumber: number = 20,
): string => {
  let hTable = {} as intersectionTable;
  const filesAmount = filesData.length;
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
        hTable[index] = [[], ""];
        hTable[index][0] = [fileIndex];
        hTable[index][1] = word;
      }
    }
    fileIndex++;
  }

  if (filesNumber === 20) {
    for (let item in hTable) {
      if (hTable[item][0].length === 20) {
        rezArr.push(hTable[item]);
      }
    }
  } else if (filesNumber === 10) {
    for (let item in hTable) {
      if (hTable[item][0].length >= 10) {
        rezArr.push(hTable[item]);
      }
    }
  }

  return `Word combinations that are in all ${filesNumber} files: ${rezArr.length}`;
};

const allFilesData = getAllFiles(20);

const startUnic = performance.now();
const unicWords = getUniqueValues(allFilesData);
const finishUnic = performance.now();
console.log(unicWords); //20 files ==> 129233
console.log("time: " + (finishUnic - startUnic) + " msec ");
//from 870.4358449988067 msec

let intersectoinStart = performance.now();
let intWords = getIntersection(allFilesData);
let intersectoinFinish = performance.now();
console.log(intWords); //20 files ==> 441
console.log("time: ", intersectoinFinish - intersectoinStart, " msec ");

let intersectoinStart2 = performance.now();
let intWords2 = getIntersection(allFilesData, 10);
let intersectoinFinish2 = performance.now();
console.log(intWords2); //20 files ==> 73246
console.log("time: ", intersectoinFinish2 - intersectoinStart2, " msec ");
//10 files => time: 2178.7542790006846 msec
//20 files => time: 1671.895828999579 msec
