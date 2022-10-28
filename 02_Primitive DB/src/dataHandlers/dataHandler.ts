import { readFile, writeData } from "./dataAccess.js";

interface Answers extends Record<string, any> {}

export const checkData = (person: Answers): Boolean => {
  if (
    !person.hasOwnProperty("name") &&
    !person.hasOwnProperty("age") &&
    !person.hasOwnProperty("gender")
  ) {
    return false;
  }
  return true;
};

export const addPerson = (persons: Answers[]): void => {
  let currentPersonsData: Answers[] = JSON.parse(readFile() as string);
  if (persons.length > 0 && persons[0].name) {
    for (let person of persons) {
      if (checkData(person)) {
        person.name = person.name.toLowerCase();
        currentPersonsData.push(person);
      }
    }
    writeData(JSON.stringify(currentPersonsData));
  }
};

export const findPerson = (requestedPersonName: string): string => {
  let requestedPerson = "";
  const currentPersonsData: Answers[] = JSON.parse(readFile() as string);
  for (let person of currentPersonsData) {
    if (person.name === requestedPersonName.toLowerCase()) {
      requestedPerson = JSON.stringify(person);
    }
  }

  return requestedPerson === ""
    ? `Person with name [${requestedPersonName}] not found!`
    : requestedPerson;
};
