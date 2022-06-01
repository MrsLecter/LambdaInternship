
require('dotenv').config();
const token = process.env.BOT_TOKEN;
const TelegramBot = require('node-telegram-bot-api');
const ws = new WebSocket('ws://localhost:3000');

const bot = new TelegramBot(token, {polling: true});

function toSendCat(data) {
    bot.sendMessage(process.env.CHAT_ID, data);  
}

ws.onmessage = (response) => toSendCat(response.data)
