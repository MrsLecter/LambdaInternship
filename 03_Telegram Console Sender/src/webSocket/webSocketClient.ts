import { io } from "socket.io-client";
import { TWENTYFIVE_MINUTES } from "../constants/constants.js";

const socket = io(process.env.HEROKU_URL);

socket.on("connect", () => {
  const timerId = setInterval(() => {
    console.log("send message");
    socket.emit("hello", "world", (response: string) => {
      console.log(response);
    });
  }, TWENTYFIVE_MINUTES);
});
