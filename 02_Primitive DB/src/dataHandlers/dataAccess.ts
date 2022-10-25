import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readFile = (): string | Buffer => {
  let persons: string | Buffer;
  try {
    persons = fs.readFileSync(path.join(__dirname, process.env.FILE_PATH), {
      encoding: "utf8",
    });
    return persons;
  } catch (err: any) {
    throw Error((err as Error).message);
  }
};

export const writeData = (person: string): void => {
  fs.writeFile(
    path.join(__dirname, process.env.FILE_PATH),
    person,
    (err: any) => {
      if (err) throw Error((err as Error).message);
    },
  );
};
