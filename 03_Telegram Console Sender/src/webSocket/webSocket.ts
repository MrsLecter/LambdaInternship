require("dotenv").config();

import TelegramBot from "node-telegram-bot-api";

const webSocket = new WebSocket("ws://localhost:3000");
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const sendCat = (data: string) => {
  bot.sendMessage(process.env.CHAT_ID, data);
};

webSocket.onmessage = (response) => sendCat(response.data);
