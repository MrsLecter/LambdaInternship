require('dotenv').config();
const WebSocket = require('ws');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const commander = require('commander')

const ws = new WebSocket('ws://localhost:3000');

const {getFormattedData, isOldData, toRewriteData, toReadData} = require('./src/utils')

//create commander
const program = new commander.Command();
//all constraints
const {RATE_URL_PRIVAT,RATE_URL_MONOBANK,IMAGE_URL, STICKER_URL, API_WEATHER} = require('./src/constants');
//bot token
const token = process.env.BOT_TOKEN;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// ---handle command line argments
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
    bot.sendPhoto(process.env.CHAT_ID, 'https://http.cat');
}
if (options.help){
    console.log("'-m, --message', 'send a message to the bot'\n\'-p, --photo', 'send a message to the bot'\n");
}
// ---handle command line argments

// ---handle websocket server messages
function toSendPhoto(data) {
    axios.get(IMAGE_URL).then(function (response) {
        bot.sendPhoto(process.env.CHAT_ID, response.request.res.responseUrl);
        }).catch(function (error) {
            console.log(error);
        });
        console.log(`The user ${msg.from.first_name} ${(typeof (msg.from.last_name) === 'undefined') ? '' : msg.from.last_name} awake server`);
}
ws.onmessage = (response) => toSendPhoto(response.data)
// ---handle websocket server messages

//run bit
const start = () =>{
    //bot menu
    bot.setMyCommands([
        {'command': '/start', 'description': 'Start'},
        {'command': '/info', 'description': 'Info'},
        {'command': '/currency', 'description': 'Currency exchange rate'},
        {'command': '/weather_forecast', 'description': 'Weather'}
    ]);

    //menu handler
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, "Welcome !",
        {
            "reply_markup": {
                "keyboard": [["photo", "/info"], ["/currency" ,"/weather_forecast"]]
                }
        });
    });


    bot.onText(/\/info/, async(msg) => {
        await bot.sendMessage(msg.chat.id, "Hi. You can use me! I can store notes, show you the exchange rate, show you the weather");
        await bot.sendSticker(msg.chat.id, STICKER_URL);
    });


    bot.onText(/\/currency/, (msg) => {
        bot.sendMessage(msg.chat.id, "Currency exchange rate. Select bank:",
        {
            "reply_markup": JSON.stringify({
                "inline_keyboard": [
                    [{"text": "dollar rate(Privatbank)", "callback_data": "privat"},
                     {"text": "USD rate(Monobank)", "callback_data": "monobank"}]
                    ]
            })
        });
    });


    bot.onText(/\/weather_forecast/, (msg) => {
        bot.sendMessage(msg.chat.id, "Forecast for Odessa(Ukraine). Select interval:",
        {
            "reply_markup": JSON.stringify({
                "inline_keyboard": [
                    [{"text": "at intervals of 3 hours","callback_data": "3"},
                     {"text": "at intervals of 6 hours","callback_data": "6"}]
                    ]
            })
        });
    });


    bot.on("callback_query", async(msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data.length === 1){
            axios.get(API_WEATHER).then(function (response) {
                let dataResponse = response.data.list;
                bot.sendMessage(chatId, getFormattedData(dataResponse, +data));
            }).catch(function (error) {
                console.log(error);
            });
        }else if(data.length > 1){
            if(isOldData(data)){
                toRewriteData(data).then(parsedData => {
                    const date = new Date(parsedData.recordTime);
                    let formatTime = String(date.getHours()+':'+date.getMinutes() + ' ' + date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
                    if(data.localeCompare('privat')===0){
                        bot.sendMessage(chatId, `Bank: Privatbank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`);
                    }else if(data.localeCompare('monobank')===0){
                        bot.sendMessage(chatId, `Bank: Monobank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`);
                    }
                })
            }else{
                let parsedData = toReadData(data);
                const date = new Date(parsedData.recordTime);
                let formatTime = String(date.getHours()+':'+date.getMinutes() + ' ' + date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
                if(data.localeCompare('privat')===0){
                    bot.sendMessage(chatId, `Bank: Privatbank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`);
                }else if(data.localeCompare('monobank')===0){
                    bot.sendMessage(chatId, `Bank: Monobank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`);
                }
            }
        }
        
    });


    //handle input messages
    bot.on('message', async (msg) => {
        if(msg.text.toString().toLowerCase().indexOf('photo') === 0){
            axios.get(IMAGE_URL).then(function (response) {
                bot.sendPhoto(msg.chat.id, response.request.res.responseUrl);
                }).catch(function (error) {
                    console.log(error);
                });
            console.log(`The user ${msg.from.first_name} ${(typeof (msg.from.last_name) === 'undefined') ? '' : msg.from.last_name} requested a picture`);
        }else{
            await bot.sendMessage(msg.chat.id, 
                `The user ${msg.from.first_name} ${(typeof (msg.from.last_name) === 'undefined') ? '' : msg.from.last_name}wrote: ${msg.text}`);
            console.log(`The user ${msg.from.first_name} ${(typeof (msg.from.last_name) === 'undefined') ? '' : msg.from.last_name}wrote: ${msg.text}`);
        }

});


//show polling error 
bot.on("polling_error", console.log);
}

start();
