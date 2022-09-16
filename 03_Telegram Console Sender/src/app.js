require("dotenv").config();
const { BOT_TOKEN, CHAT_ID } = process.env;
const TelegramBot = require("node-telegram-bot-api");

const ws = new WebSocket("ws://localhost:3000");
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const sendCat = (data) => {
  bot.sendMessage(CHAT_ID, data);
};

ws.onmessage = (response) => sendCat(response.data);
