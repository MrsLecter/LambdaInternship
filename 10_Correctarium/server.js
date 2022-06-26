const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const mainRoute = require('./routes/main');

app.use(bodyParser.json());

app.use('/correctarium', mainRoute);

app.use((req, res, next) => {
    res.send({"message": "404 Not found"});
});

app.listen(3000);

console.log("server listen on port 3000");