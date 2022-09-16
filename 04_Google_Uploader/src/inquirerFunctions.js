const path = require("path");
const inquirer = require("inquirer");
const prettylink = require("prettylink");

const { generatePublicURL, renameFile } = require("./driveFunction");

const getFileName = async (filePath, fileExtension, fileID, fileName) => {
  const question = {
    type: "confirm",
    name: "change_file",
    message: `You are uploading the file with name: ${fileName}. Would you like to change it?`,
    default() {
      return false;
    },
  };
  inquirer
    .prompt(question)
    .then(async (answer) => {
      if (answer.change_file) {
        await changeFileName(filePath, fileExtension, fileID);
      } else {
        await getLink(fileID);
      }
    })
    .catch((err) => console.log(err));
};

const changeFileName = async (filePath, fileExtension, fileID) => {
  const question = {
    type: "input",
    name: "new_file_name",
    message: "Enter new file name (WITHOUT extension aka .jpg, .png, etc.)",
  };
  inquirer
    .prompt(question)
    .then(async (answer) => {
      const fileName = answer.new_file_name + fileExtension;
      filePath = path.join(path.dirname(filePath), fileName);
      console.log(`New name: ${fileName} \nPath: ${filePath}`);
      await renameFile(fileID, answer.new_file_name);
      await getLink(fileID);
    })
    .catch((err) => console.log(err));
};

const getLink = async (fileID) => {
  const question = {
    type: "confirm",
    name: "shorten_link",
    message: "Would you like to shorten your link?",
    default() {
      return false;
    },
  };
  inquirer
    .prompt(question)
    .then(async (answer) => {
      if (answer.shorten_link) {
        const webLink = await generatePublicURL(fileID);
        const tinyurl = new prettylink.TinyURL();
        await tinyurl
          .short(webLink)
          .then((result) => {
            console.log("Your shorten link: " + result);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const webLink = await generatePublicURL(fileID);
        console.log("Your standart link: " + webLink);
      }
    })
    .catch((err) => console.log(err));
};

module.exports = { getFileName };
