require("dotenv").config();

const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");
const prettylink = require("prettylink");

let fileExtension;
let fileName;
let filePath;
let fileID;
let webLink;

//-----api authorization
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_UI
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});
//-----api authorization

//-----inquirer
async function getfilePath() {
  const question = {
    type: "input",
    name: "image_path",
    message:
      "Drag and drop your image to terminal and press Enter for upload: ",
  };
  inquirer
    .prompt(question)
    .then(async (answer) => {
      filePath = answer.image_path;
      fileExtension = path.extname(answer.image_path);
      fileName = path.basename(answer.image_path);
      await toUploadFile(filePath);
      console.log(
        `Path file: ${filePath}\nFile name: ${fileName}\nFile extension: ${fileExtension.slice(1)}`
      );
      await getFileName();
    })
    .catch((err) => console.log(err));
}

async function getFileName() {
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
        await toChangeFileName();
      } else {
        await getLink(fileID);
      }
    })
    .catch((err) => console.log(err));
}

async function toChangeFileName() {
  const question = {
    type: "input",
    name: "new_file_name",
    message: "Enter new file name (WITHOUT extension aka .jpg, .png, etc.)",
  };
  inquirer
    .prompt(question)
    .then(async (answer) => {
      fileName = answer.new_file_name + fileExtension;
      filePath = path.join(path.dirname(filePath), fileName);
      console.log(`New name: ${fileName} \nPath: ${filePath}`);
      await renameFile(fileID, answer.new_file_name);
      await getLink();
    })
    .catch((err) => console.log(err));
}

async function getLink() {
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
        await toGeneratePublicURL(fileID);
        //use tinyurl module
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
        await toGeneratePublicURL(fileID);
        console.log("Your standart link: " + webLink);
      }
    })
    .catch((err) => console.log(err));
}
//-----inquirer


//-----data operation with google drive api
async function toUploadFile(filePath) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: path.basename(filePath),
        mimeType: `image/${path.extname(filePath).slice(1)}`,
      },
      media: {
        mimeType: `image/${path.extname(filePath).slice(1)}`,
        body: fs.createReadStream(filePath),
      },
    });
    fileID = response.data.id;
  } catch (err) {
    console.log(err.message);
  }
}

async function toGeneratePublicURL(file_id) {
  try {
    await drive.permissions.create({
      fileId: file_id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId: file_id,
      fields: "webViewLink",
    });
    webLink = result.data.webViewLink;
  } catch (err) {
    console.log(err);
  }
}

async function renameFile(file_id, new_name) {
  var body = { name: new_name };
  drive.files.update(
    {
      fileId: file_id,
      resource: body,
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
    }
  );
}
//-----data operation with google drive api


//to run a chain of questions
getfilePath();