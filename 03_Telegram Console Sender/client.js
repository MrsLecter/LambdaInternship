const { io } = require("socket.io-client");
const { TWENTYFIVE_MINUTES } = require("./src/constants.js");

const socket = io(process.env.HEROKU_URL);

socket.on("connect", () => {
  let timerId = setInterval(() => {
    console.log("send message");
    socket.emit("hello", "world", (response) => {
      console.log(response);
    });
  }, TWENTYFIVE_MINUTES);
});
