require("dotenv").config();
const path = require("path");
const inquirer = require("inquirer");
const { getFileName } = require("./src/inquirerFunctions");
const { uploadFile } = require("./src/driveFunction");

const getfilePath = async () => {
  const question = {
    type: "input",
    name: "image_path",
    message:
      "Drag and drop your image to terminal and press Enter for upload: ",
  };
  inquirer
    .prompt(question)
    .then(async (answer) => {
      const filePath = answer.image_path.substring(
        1,
        answer.image_path.length - 1,
      );
      const fileExtension = path.extname(filePath);
      const fileName = path.basename(filePath);
      const fileID = await uploadFile(filePath, fileName);
      console.log(fileID);
      console.log(
        `Path file: ${filePath}\nFile name: ${fileName}\nFile extension: ${fileExtension.slice(
          1,
        )}`,
      );
      await getFileName(filePath, fileExtension, fileID, fileName);
    })
    .catch((err) => console.error(err));
};

getfilePath();
