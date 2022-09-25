require("dotenv").config();
process.env["NTBA_FIX_319"] = 1;
import TelegramBot from "node-telegram-bot-api";
import commander from "commander";
import { handleCommands } from "./utils/handleCommands.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const program = new commander.Command();
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("hello", (arg) => {
    bot.sendPhoto(
      process.env.CHAT_ID,
      `${process.env.IMAGE_URL}?random${
        Math.floor(Math.random() * (5000 - 0)) + 0
      }`,
    );
  });
});

server.listen(3000, () => {
  console.log("listening on :3000");
});

program
  .option("-m, --message <message>", "send a message to the bot")
  .option("-p, --photo <photo>", "send a message to the bot")
  .option("-h, --help", "view help");

program.parse(process.argv);

const options = program.opts();
if (options.message) {
  bot.sendMessage(process.env.CHAT_ID, options.message);
}
if (options.photo) {
  bot.sendPhoto(
    process.env.CHAT_ID,
    `${process.env.IMAGE_URL}?random${
      Math.floor(Math.random() * (5000 - 0)) + 0
    }`,
  );
}
if (options.help) {
  console.log(
    "'-m, --message', 'send a message to the bot'\n'-p, --photo', 'send a message to the bot'\n",
  );
}

handleCommands();
