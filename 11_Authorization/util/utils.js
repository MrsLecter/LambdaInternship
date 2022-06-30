require('dotenv').config();
const jwt = require("jsonwebtoken");

function getRandomTTL(){
    const minTime = 30;
    const maxTime = 60;
    const ttlInS = Math.floor(Math.random() * (maxTime - minTime + 1) + minTime);
    return ttlInS;
}

module.exports = {getRandomTTL}