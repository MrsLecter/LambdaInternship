"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const webSocket = new WebSocket("ws://localhost:3000");
const bot = new node_telegram_bot_api_1.default(process.env.BOT_TOKEN, { polling: true });
const sendCat = (data) => {
    bot.sendMessage(process.env.CHAT_ID, data);
};
webSocket.onmessage = (response) => sendCat(response.data);
