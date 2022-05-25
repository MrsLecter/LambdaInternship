let cnst = require("./constants");
let func = require("./functions");
//current data storage
let current_data;
//array storage
let data;

//ask first question
process.stdout.write(cnst.QHELLO);

process.stdin.on("readable", () => {
  //read input
  current_data = process.stdin.read().toString().trim();
  //convert to a string. if it array of number and strings go to default
  switch (current_data) {
    case "exit":
      process.exit();
    case "1":
      process.stdout.write(">>1\n");
      process.stdout.write(func.getAlphabetSort(data)+'\n');
      process.stdout.write(cnst.QHELLO);
      break;
    case "2":
      process.stdout.write(">>2\n");
      process.stdout.write(func.getASCSort(data)+'\n');
      process.stdout.write(cnst.QHELLO);
      break;
    case "3":
      process.stdout.write(">>3\n");
      process.stdout.write(func.getDESCSort(data)+ "\n");
      process.stdout.write(cnst.QHELLO);
      break;
    case "4":
      process.stdout.write(">>4\n");
      process.stdout.write(func.getASCSortLetterNumber(data) + "\n");
      process.stdout.write(cnst.QHELLO);
      break;
    case "5":
      process.stdout.write(">>5\n");
      process.stdout.write(func.getUniqueWords(data)+ "\n");
      process.stdout.write(cnst.QHELLO);
      break;
    case "6":
      process.stdout.write(">>6\n");
      process.stdout.write(func.getUniqueAll(data) + "\n");
      process.stdout.write(cnst.QHELLO);
      break;
    default:
        data = current_data.split(' ');
        process.stdout.write(cnst.QOPTIONS);
    }
    //read input
    process.stdin.read();
});

process.on("exit", function () {
    process.stdout.write(cnst.BYE);
});
