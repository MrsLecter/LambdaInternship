import * as say from "./constants";
import * as func from "./utils/functions";

let currentData: string;
let data: string[];

process.stdout.write(say.HELLO);

process.stdin.on("readable", () => {
  currentData = process.stdin.read().toString().trim();
  if (currentData.length === 0) {
    process.stdout.write("Empty input!\n");
    return;
  }
  switch (currentData) {
    case "exit":
      process.exit();
    case "1":
      process.stdout.write(">>1\n");
      process.stdout.write(func.getAlphabetSort(data) + "\n");
      process.stdout.write(say.HELLO);
      break;
    case "2":
      process.stdout.write(">>2\n");
      process.stdout.write(func.getASCSort(data) + "\n");
      process.stdout.write(say.HELLO);
      break;
    case "3":
      process.stdout.write(">>3\n");
      process.stdout.write(func.getDESCSort(data) + "\n");
      process.stdout.write(say.HELLO);
      break;
    case "4":
      process.stdout.write(">>4\n");
      process.stdout.write(func.getASCSortLetterNumber(data) + "\n");
      process.stdout.write(say.HELLO);
      break;
    case "5":
      process.stdout.write(">>5\n");
      process.stdout.write(func.getUniqueAll(data) + "\n");
      process.stdout.write(say.HELLO);
      break;
    case "6":
      process.stdout.write(">>6\n");
      process.stdout.write(func.getUniqueAll(data) + "\n");
      process.stdout.write(say.HELLO);
      break;
    default:
      data = currentData.split(" ");
      process.stdout.write(say.CHOOSE_OPTIONS);
  }
  process.stdin.read();
});

process.on("exit", function () {
  process.stdout.write(say.BYE);
});

exports = {};
