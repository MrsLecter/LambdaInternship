import inquirer from "inquirer";
import * as access from "./utils/dataAccess.js";
import * as utils from "./utils/utils.js";

interface Answers extends Record<string, any> {}

let currentRecord: Answers[] = [];

const questions = [
  {
    type: "input",
    name: "name",
    message: "Enter the user's name. To cancel press only Enter: ",
  },
  {
    type: "list",
    name: "gender",
    message: "Choose your gender: ",
    choices: ["male", "feemale"],
    when(answers: Answers) {
      return answers.name;
    },
  },
  {
    type: "input",
    name: "age",
    message: "Enter your age: ",
    when(answers: Answers) {
      return answers.name;
    },
    validate(value: string) {
      const pass = value.match(/^(1[89]|[2-9]\d)$/s);
      if (pass) {
        return true;
      }

      return "Please enter a valid age (between 18, 99)";
    },
  },
  {
    type: "confirm",
    name: "findondb",
    message: "Do you want to find a user by name in the database?",
    when(answers: Answers) {
      return !answers.name;
    },
  },
  {
    type: "input",
    name: "username",
    message: "Enter users name to find in database: ",
    when(answers: Answers) {
      return !answers.name && answers.findondb;
    },
  },
];

function ask() {
  inquirer.prompt(questions).then((answers) => {
    currentRecord.push(answers);
    if (answers.findondb) {
      console.log("Your database: " + access.readFile() + "\n");
      console.log(utils.findPerson(answers.username));
    } else if (!answers.findondb && !answers.name) {
      utils.addPerson(currentRecord);
      console.log("End");
    } else {
      utils.addPerson(currentRecord);
      currentRecord = [];
      ask();
    }
  });
}

ask();
