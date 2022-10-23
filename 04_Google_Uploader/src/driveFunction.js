const { drive } = require("./driveClient");
const path = require("path");
const fs = require("fs");

const uploadFile = async (filePath) => {
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
    return response.data.id;
  } catch (err) {
    console.error(err.message);
  }
};

const generatePublicURL = async (fileId) => {
  try {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId,
      fields: "webViewLink",
    });
    return result.data.webViewLink;
  } catch (err) {
    console.error(err);
  }
};

const renameFile = async (fileId, newName) => {
  const body = { name: newName };
  drive.files.update(
    {
      fileId,
      resource: body,
    },
    (err) => {
      if (err) return console.error("The API returned an error: " + fileId);
    },
  );
};

module.exports = { renameFile, generatePublicURL, uploadFile };
