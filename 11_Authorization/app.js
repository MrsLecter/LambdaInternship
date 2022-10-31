const bodyParser = require("body-parser");
const { db } = require("./dataHandlers/databaseHendler");
const express = require("express");
const app = express();

const PORT = 3000;
const authRout = require("./routes/authRouts");

app.use(bodyParser.json());

app.use(authRout);

app.use((error, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error" });
});

try {
  db.connect();
  app.listen(PORT, () => console.info(`Server is listening in port ${PORT}`));
} catch (err) {
  console.log(err);
  throw new Error("An Error occured");
}
