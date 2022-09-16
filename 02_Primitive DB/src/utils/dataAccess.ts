import * as fs from "fs";

export const readFile = (): string | Buffer => {
  let persons: string | Buffer;
  try {
    persons = fs.readFileSync("./data/database.txt", { encoding: "utf8" });
    return persons;
  } catch (err) {
    throw Error((err as Error).message);
  }
};

export const writeData = (person: string): void => {
  fs.writeFile("./data/database.txt", person, function (err) {
    if (err) throw err;
  });
};
