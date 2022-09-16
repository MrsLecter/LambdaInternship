import * as fs from "fs";

export const readFile = () => {
  let persons = [];
  persons = fs.readFileSync(
    "./data/database.txt",
    { encoding: "utf8" },
    function (err) {
      if (err) throw err;
    },
  );
  return persons;
};

export const writeData = (person) => {
  fs.writeFile("./data/database.txt", person, function (err) {
    if (err) throw err;
  });
};
