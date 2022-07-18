"use strict";
var mysql = require('mysql2');
require('dotenv').config();
//mysql://b2252d609db6e7:9852dfb6@us-cdbr-east-06.cleardb.net/heroku_265290e4e48559e?reconnect=true
var pool = mysql.createPool({
    host: "us-cdbr-east-06.cleardb.net",
    user: "b2252d609db6e7",
    database: "heroku_265290e4e48559e",
    password: "9852dfb6"
});
module.exports = pool.promise();
