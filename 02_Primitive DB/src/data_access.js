import * as fs from "fs";

export function toReadFile() {
  let data = [];
  try {
    data = fs.readFileSync(
      "./data/database.txt",
      { encoding: "utf8" },
      function (err) {
        if (err) throw err;
      }
    );
  } catch (err) {
    console.log(err);
  }
  return data;
}

export function toWriteData(content) {
  try {
    fs.writeFile("./data/database.txt", content, function (err) {
      if (err) throw err;
    });
  } catch (err) {
    console.log(err);
  }
}
