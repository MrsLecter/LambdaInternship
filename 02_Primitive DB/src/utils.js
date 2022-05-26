import { toReadFile, toWriteData } from "./data_access.js";

export function toValidateData(data) {
  if (
    data.hasOwnProperty("name") &&
    data.hasOwnProperty("age") &&
    data.hasOwnProperty("gender")
  ) {
    return true;
  } else {
    return false;
  }
}

export function toAddData(arr) {
  let currentData = JSON.parse(toReadFile());
  try {
    if (arr.length > 0) {
      arr.forEach((item) => {
        if (toValidateData(item)) {
          currentData.push(item);
        }
      });
      toWriteData(JSON.stringify(currentData));
    }
  } catch (err) {
    console.log(err);
  }
}

export function toFindPerson(name) {
  let person = null;
  const data = JSON.parse(toReadFile());
  data.forEach((object) => {
    if (object["name"].localeCompare(name) === 0) {
      person = JSON.stringify(object);
    }
  });
  return person == undefined ? `Person with name [${name}] not found!` : person;
}
