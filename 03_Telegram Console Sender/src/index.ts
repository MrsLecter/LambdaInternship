require("dotenv").config();
process.env["NTBA_FIX_319"] = 1;

import TelegramBot from "node-telegram-bot-api";
const commander = require("commander");

const program = new commander.Command();
const { handleCommands } = require("./utils/handleCommands.js");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
import { Server } from "socket.io";
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
