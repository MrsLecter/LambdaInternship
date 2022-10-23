"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const constants_js_1 = require("../constants/constants.js");
const socket = (0, socket_io_client_1.io)(process.env.HEROKU_URL);
socket.on("connect", () => {
    const timerId = setInterval(() => {
        console.log("send message");
        socket.emit("hello", "world", (response) => {
            console.log(response);
        });
    }, constants_js_1.TWENTYFIVE_MINUTES);
});
