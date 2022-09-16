import { readFile, writeData } from "./dataAccess.js";

export const checkData = (person) => {
  if (
    !person.hasOwnProperty("name") &&
    !person.hasOwnProperty("age") &&
    !person.hasOwnProperty("gender")
  ) {
    return false;
  }
  return true;
};

export const addPerson = (persons) => {
  let currentPersonsData = JSON.parse(readFile());
  if (persons.length > 0) {
    persons.forEach((person) => {
      if (checkData(person)) {
        currentPersonsData.push(person);
      }
    });
    writeData(JSON.stringify(currentPersonsData));
  }
};

export const findPerson = (requestedPersonName) => {
  let requestedPerson = null;
  const currentPersonsData = JSON.parse(readFile());
  currentPersonsData.forEach((person) => {
    if (person["name"].localeCompare(requestedPersonName) === 0) {
      requestedPerson = JSON.stringify(person);
    }
  });
  return requestedPerson === undefined
    ? `Person with name [${requestedPersonName}] not found!`
    : requestedPerson;
};
