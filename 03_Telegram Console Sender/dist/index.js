"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
process.env["NTBA_FIX_319"] = "1";
const commander_1 = __importDefault(require("commander"));
const telegramBotRouter_js_1 = __importDefault(require("./telegramBotRouter.js"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const program = new commander_1.default.Command();
const io = new socket_io_1.Server(server);
// const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
io.on("connection", (socket) => {
    socket.on("hello", (arg) => {
        telegramBotRouter_js_1.default.sendPhoto(process.env.IMAGE_URL, process.env.CHAT_ID);
        // bot.sendPhoto(
        //   process.env.CHAT_ID,
        //   `${process.env.IMAGE_URL}?random${
        //     Math.floor(Math.random() * (5000 - 0)) + 0
        //   }`,
        // );
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
    telegramBotRouter_js_1.default.sendMessage(options.message, process.env.CHAT_ID);
    // bot.sendMessage(process.env.CHAT_ID, options.message);
}
if (options.photo) {
    telegramBotRouter_js_1.default.sendPhoto(process.env.IMAGE_URL, process.env.CHAT_ID);
    // bot.sendPhoto(
    //   process.env.CHAT_ID,
    //   `${process.env.IMAGE_URL}?random${
    //     Math.floor(Math.random() * (5000 - 0)) + 0
    //   }`,
    // );
}
if (options.help) {
    console.log("'-m, --message', 'send a message to the bot'\n'-p, --photo', 'send a message to the bot'\n");
}
telegramBotRouter_js_1.default.handleCommands();
