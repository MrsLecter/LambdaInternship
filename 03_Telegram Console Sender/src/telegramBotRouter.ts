import TelegramBot from "node-telegram-bot-api";
import axios, { AxiosResponse } from "axios";
import { API_WEATHER } from "./constants/constants";
import { BankResponse, MonoOrPrivatType, ApiWeatherData } from "./types/types";
import {
  getFormattedData,
  checkOldData,
  rewriteData,
  readData,
} from "./utils/handlers";

class TelegramBotRoutes {
  public bot: TelegramBot;
  constructor() {
    this.bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
  }
  public handleCommands() {
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

    this.bot.onText(/\/info/, async (msg) => {
      await this.bot.sendMessage(
        msg.chat.id,
        "Hi. You can use me! I can store notes, show you the exchange rate, show you the weather",
      );
      await this.bot.sendSticker(msg.chat.id, process.env.STICKER_URL);
    });

    this.bot.onText(/\/currency/, (msg) => {
      this.bot.sendMessage(
        msg.chat.id,
        "Currency exchange rate. Select bank:",
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "dollar rate(Privatbank)", callback_data: "privat" },
                { text: "USD rate(Monobank)", callback_data: "monobank" },
              ],
            ],
          },
        },
      );
    });

    this.bot.onText(/\/weather_forecast/, (msg) => {
      this.bot.sendMessage(
        msg.chat.id,
        "Forecast for Odessa(Ukraine). Select interval:",
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "at intervals of 3 hours", callback_data: "3" },
                { text: "at intervals of 6 hours", callback_data: "6" },
              ],
            ],
          },
        },
      );
    });

    this.bot.on("callback_query", async (msg: TelegramBot.CallbackQuery) => {
      if (msg.data === undefined) throw Error("Message data undefined!");
      const data = msg.data as MonoOrPrivatType;
      if (msg.message === undefined) throw Error("Message undefined!");
      const chatId = msg.message.chat.id;
      if (data?.length === 1) {
        console.log("url", API_WEATHER, "wait, it takes much time!");
        try {
          await axios.get(API_WEATHER).then((response: AxiosResponse) => {
            const dataResponse: ApiWeatherData[] = response.data.list;
            this.bot.sendMessage(chatId, getFormattedData(dataResponse, +data));
          });
        } catch (error) {
          throw Error((error as Error).message);
        }
      }
      if (data.length > 1) {
        if (checkOldData(data)) {
          rewriteData(data).then((parsedData: BankResponse) => {
            const date = new Date(parsedData.recordTime);
            let formatTime =
              String(
                date.getHours() +
                  ":" +
                  date.getMinutes() +
                  " " +
                  date.getDate(),
              ).padStart(2, "0") +
              "/" +
              String(date.getMonth() + 1).padStart(2, "0") +
              "/" +
              date.getFullYear();
            if (data.localeCompare("privat") === 0) {
              this.bot.sendMessage(
                chatId,
                `Bank: Privatbank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`,
              );
            }
            if (data.localeCompare("monobank") === 0) {
              this.bot.sendMessage(
                chatId,
                `Bank: Monobank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`,
              );
            }
          });
        }

        const parsedData = readData(data) as BankResponse;
        const date = new Date(parsedData.recordTime);
        let formatTime =
          String(
            date.getHours() + ":" + date.getMinutes() + " " + date.getDate(),
          ).padStart(2, "0") +
          "/" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "/" +
          date.getFullYear();
        if (data.localeCompare("privat") === 0) {
          this.bot.sendMessage(
            chatId,
            `Bank: Privatbank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`,
          );
        } else if (data.localeCompare("monobank") === 0) {
          this.bot.sendMessage(
            chatId,
            `Bank: Monobank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`,
          );
        }
      }
    });

    this.bot.on("message", async (msg: TelegramBot.Message) => {
      if (msg.text?.toString().toLowerCase().indexOf("photo") === 0) {
        await axios
          .get(process.env.IMAGE_URL)
          .then((response) => {
            this.bot.sendPhoto(msg.chat.id, response.request.res.responseUrl);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(
          `The user ${msg.from?.first_name} ${
            typeof msg.from?.last_name === "undefined" ? "" : msg.from.last_name
          } requested a picture`,
        );
      } else {
        await this.bot.sendMessage(
          msg.chat.id,
          `The user ${msg.from?.first_name} ${
            typeof msg.from?.last_name === "undefined" ? "" : msg.from.last_name
          }wrote: ${msg.text}`,
        );
        console.log(
          `The user ${msg.from?.first_name} ${
            typeof msg.from?.last_name === "undefined" ? "" : msg.from.last_name
          }wrote: ${msg.text}`,
        );
      }
    });

    this.bot.on("polling_error", console.log);
  }

  public sendPhoto(photoUrl: string, chatId: string) {
    this.bot.sendPhoto(
      chatId,
      `${photoUrl}?random${Math.floor(Math.random() * (5000 - 0)) + 0}`,
    );
  }

  public sendMessage(message: string, chatId: string) {
    this.bot.sendMessage(chatId, message);
  }
}

export default new TelegramBotRoutes();
