const bodyParser = require("body-parser");
const mongoConnect = require("./util/database").mongoConnect;
const express = require("express");
const app = express();

const PORT = 3000;
const authRout = require("./routes/authRouts");

app.use(bodyParser.json());

app.use(authRout);

app.use((error, req, res, next) => {
    res.status(500).json('500', {"message":"Internal Server Error"});
  });
  
try {
  mongoConnect((client) => {
    app.listen(PORT);
  });
  console.log(`Server is listening in port ${PORT}`);
} catch (e) {
  console.log(e);
  throw new Error("An Error occured");
}
