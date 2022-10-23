"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("./constants/constants");
const handlers_1 = require("./utils/handlers");
class TelegramBotRoutes {
    constructor() {
        this.bot = new node_telegram_bot_api_1.default(process.env.BOT_TOKEN, { polling: true });
    }
    handleCommands() {
        this.bot.setMyCommands([
            { command: "/start", description: "Start" },
            { command: "/info", description: "Info" },
            { command: "/currency", description: "Currency exchange rate" },
            { command: "/weather_forecast", description: "Weather" },
        ]);
        this.bot.onText(/\/start/, (msg) => {
            this.bot.sendMessage(msg.chat.id, "Welcome !", {
                reply_markup: {
                    keyboard: [
                        [{ text: "photo" }, { text: "/info" }],
                        [{ text: "/currency" }, { text: "/weather_forecast" }],
                    ],
                },
            });
        });
        this.bot.onText(/\/info/, (msg) => __awaiter(this, void 0, void 0, function* () {
            yield this.bot.sendMessage(msg.chat.id, "Hi. You can use me! I can store notes, show you the exchange rate, show you the weather");
            yield this.bot.sendSticker(msg.chat.id, process.env.STICKER_URL);
        }));
        this.bot.onText(/\/currency/, (msg) => {
            this.bot.sendMessage(msg.chat.id, "Currency exchange rate. Select bank:", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "dollar rate(Privatbank)", callback_data: "privat" },
                            { text: "USD rate(Monobank)", callback_data: "monobank" },
                        ],
                    ],
                },
            });
        });
        this.bot.onText(/\/weather_forecast/, (msg) => {
            this.bot.sendMessage(msg.chat.id, "Forecast for Odessa(Ukraine). Select interval:", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "at intervals of 3 hours", callback_data: "3" },
                            { text: "at intervals of 6 hours", callback_data: "6" },
                        ],
                    ],
                },
            });
        });
        this.bot.on("callback_query", (msg) => __awaiter(this, void 0, void 0, function* () {
            if (msg.data === undefined)
                throw Error("Message data undefined!");
            const data = msg.data;
            if (msg.message === undefined)
                throw Error("Message undefined!");
            const chatId = msg.message.chat.id;
            if ((data === null || data === void 0 ? void 0 : data.length) === 1) {
                console.log("url", constants_1.API_WEATHER, "wait, it takes much time!");
                try {
                    yield axios_1.default.get(constants_1.API_WEATHER).then((response) => {
                        const dataResponse = response.data.list;
                        this.bot.sendMessage(chatId, (0, handlers_1.getFormattedData)(dataResponse, +data));
                    });
                }
                catch (error) {
                    throw Error(error.message);
                }
            }
            if (data.length > 1) {
                if ((0, handlers_1.checkOldData)(data)) {
                    (0, handlers_1.rewriteData)(data).then((parsedData) => {
                        const date = new Date(parsedData.recordTime);
                        let formatTime = String(date.getHours() +
                            ":" +
                            date.getMinutes() +
                            " " +
                            date.getDate()).padStart(2, "0") +
                            "/" +
                            String(date.getMonth() + 1).padStart(2, "0") +
                            "/" +
                            date.getFullYear();
                        if (data.localeCompare("privat") === 0) {
                            this.bot.sendMessage(chatId, `Bank: Privatbank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`);
                        }
                        if (data.localeCompare("monobank") === 0) {
                            this.bot.sendMessage(chatId, `Bank: Monobank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`);
                        }
                    });
                }
                const parsedData = (0, handlers_1.readData)(data);
                const date = new Date(parsedData.recordTime);
                let formatTime = String(date.getHours() + ":" + date.getMinutes() + " " + date.getDate()).padStart(2, "0") +
                    "/" +
                    String(date.getMonth() + 1).padStart(2, "0") +
                    "/" +
                    date.getFullYear();
                if (data.localeCompare("privat") === 0) {
                    this.bot.sendMessage(chatId, `Bank: Privatbank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`);
                }
                else if (data.localeCompare("monobank") === 0) {
                    this.bot.sendMessage(chatId, `Bank: Monobank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`);
                }
            }
        }));
        this.bot.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            if (((_a = msg.text) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().indexOf("photo")) === 0) {
                yield axios_1.default
                    .get(process.env.IMAGE_URL)
                    .then((response) => {
                    this.bot.sendPhoto(msg.chat.id, response.request.res.responseUrl);
                })
                    .catch(function (error) {
                    console.log(error);
                });
                console.log(`The user ${(_b = msg.from) === null || _b === void 0 ? void 0 : _b.first_name} ${typeof ((_c = msg.from) === null || _c === void 0 ? void 0 : _c.last_name) === "undefined" ? "" : msg.from.last_name} requested a picture`);
            }
            else {
                yield this.bot.sendMessage(msg.chat.id, `The user ${(_d = msg.from) === null || _d === void 0 ? void 0 : _d.first_name} ${typeof ((_e = msg.from) === null || _e === void 0 ? void 0 : _e.last_name) === "undefined" ? "" : msg.from.last_name}wrote: ${msg.text}`);
                console.log(`The user ${(_f = msg.from) === null || _f === void 0 ? void 0 : _f.first_name} ${typeof ((_g = msg.from) === null || _g === void 0 ? void 0 : _g.last_name) === "undefined" ? "" : msg.from.last_name}wrote: ${msg.text}`);
            }
        }));
        this.bot.on("polling_error", console.log);
    }
    sendPhoto(photoUrl, chatId) {
        this.bot.sendPhoto(chatId, `${photoUrl}?random${Math.floor(Math.random() * (5000 - 0)) + 0}`);
    }
    sendMessage(message, chatId) {
        this.bot.sendMessage(chatId, message);
    }
}
exports.default = new TelegramBotRoutes();
