const crc32 = require("crc-32");
const fs = require("fs");
const path = require("path");

import { IntersectionTable, UniqueTable } from "./types/types";

const ALL_FILES_AMOUNT = 20;

export const getAllFiles = (filesAmount = 1): string[] => {
  let allFiles = [] as string[];
  try {
    for (let file_number = 0; file_number < filesAmount; file_number++) {
      const file = fs.readFileSync(
        path.join(__dirname, `../words/out${file_number}.txt`),
        "utf8",
      );

      allFiles.push(file.split("\n"));
    }
    return allFiles;
  } catch (err) {
    throw Error((err as Error).message);
  }
};

export const getUniqueValues = (filesData: string[]): string => {
  let hTable = {} as UniqueTable;

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

export const getIntersection = (
  filesData: string[],
  filesNumber: number = 20,
): string => {
  let hTable = {} as IntersectionTable;
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
//from 748.0897660013288 msec

const intersectoinStart = performance.now();
const intWords = getIntersection(allFilesData);
const intersectoinFinish = performance.now();
console.log(intWords); //20 files ==> 441
console.log("time: ", intersectoinFinish - intersectoinStart, " msec ");

const intersectoinStart2 = performance.now();
const intWords2 = getIntersection(allFilesData, 10);
const intersectoinFinish2 = performance.now();
console.log(intWords2); //20 files ==> 73246
console.log("time: ", intersectoinFinish2 - intersectoinStart2, " msec ");
//10 files => time: 1912.6917430013418 msec
//20 files => time: 1540.3435130007565 msec
