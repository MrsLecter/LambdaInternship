require("dotenv").config();
const { google } = require("googleapis");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_UI, REFRESH_TOKEN } = process.env;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_UI,
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

module.exports = { drive };
