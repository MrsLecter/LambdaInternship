require('dotenv').config();
process.env["NTBA_FIX_319"] = 1; //handle error "node-telegram-bot-api deprecated "
const TelegramBot = require('node-telegram-bot-api');
const commander = require('commander');

//create commander
const program = new commander.Command();
//all constraints
const {handleCommands} = require('./src/handleCommands');

//bot token
const token = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

//--- socket ---
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
  
io.on("connection", (socket) => {
    socket.on("hello", (arg) => {
        bot.sendPhoto(process.env.CHAT_ID, `https://picsum.photos/200/300/?random${Math.floor(Math.random() * (5000 - 0)) + 0}`);
    });
  });
  
server.listen(3000, () => {
    console.log('listening on :3000');
  });
//--- socket ---

// ---handle command line argments ---
program
  .option('-m, --message <message>', 'send a message to the bot')
  .option('-p, --photo <photo>', 'send a message to the bot')
  .option('-h, --help', 'view help');

program.parse(process.argv);

const options = program.opts();
if (options.message){
    bot.sendMessage(process.env.CHAT_ID, options.message);   
}
if (options.photo){
    bot.sendPhoto(process.env.CHAT_ID, `https://picsum.photos/200/300/?random${Math.floor(Math.random() * (5000 - 0)) + 0}` );
}
if (options.help){
    console.log("'-m, --message', 'send a message to the bot'\n\'-p, --photo', 'send a message to the bot'\n");
}
// ---handle command line argments ---

//run bot
handleCommands();
