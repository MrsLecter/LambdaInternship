require("dotenv").config();
process.env["NTBA_FIX_319"] = "1";
import TelegramBot from "node-telegram-bot-api";
import commander from "commander";
import TelegramBotRoutes from "./telegramBotRouter.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const program = new commander.Command();

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("hello", (arg) => {
    TelegramBotRoutes.sendPhoto(process.env.IMAGE_URL, process.env.CHAT_ID);
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
  TelegramBotRoutes.sendMessage(options.message, process.env.CHAT_ID);
}
if (options.photo) {
  TelegramBotRoutes.sendPhoto(process.env.IMAGE_URL, process.env.CHAT_ID);
}
if (options.help) {
  console.log(
    "'-m, --message', 'send a message to the bot'\n'-p, --photo', 'send a message to the bot'\n",
  );
}

TelegramBotRoutes.handleCommands();
