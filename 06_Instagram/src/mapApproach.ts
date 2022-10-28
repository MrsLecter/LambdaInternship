import { CopyDBSnapshotResultFilterSensitiveLog } from "@aws-sdk/client-rds";
import * as crc32 from "crc-32";
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
  let map = new Map();

  for (let file of filesData) {
    for (let word of file) {
      const hash = crc32.str(word);
      const index = Math.abs(hash);
      map.set(index, word);
    }
  }
  const mapLength = map.size;
  return `Unique word combinations: ${mapLength} in ${filesData.length} files`;
};

export const getIntersection = (
  filesData: string[],
  filesNumber: number = 20,
): string => {
  let map = new Map<number, number[]>();
  const filesAmount = filesData.length;
  let rezArr = [];

  let fileIndex = 0;

  for (let file of filesData) {
    for (let word of file) {
      let hash = crc32.str(word);
      let index = Math.abs(hash);

      if (!(map.get(index) === undefined)) {
        let mapArr = map.get(index);
        if (mapArr?.indexOf(fileIndex) === -1) {
          map.set(index, [...mapArr, fileIndex]);
        }
      } else {
        map.set(index, [fileIndex]);
      }
    }
    fileIndex++;
  }
  const hTable = Array.from(map);
  if (filesNumber === 20) {
    for (let item of hTable) {
      if (item[1].length === 20) {
        rezArr.push(item[0]);
      }
    }
  } else if (filesNumber === 10) {
    for (let item of hTable) {
      if (item[1].length >= 10) {
        rezArr.push(item[0]);
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
//from 662.2780479993671 msec

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
