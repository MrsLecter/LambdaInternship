import TelegramBot from "node-telegram-bot-api";
import axios, { AxiosResponse } from "axios";
import { API_WEATHER } from "./constants";
import { bankResponse, monoOrPrivatType, apiWeatherData } from "./types";
import {
  getFormattedData,
  checkOldData,
  rewriteData,
  readData,
} from "./handlers";

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

export const handleCommands = () => {
  bot.setMyCommands([
    { command: "/start", description: "Start" },
    { command: "/info", description: "Info" },
    { command: "/currency", description: "Currency exchange rate" },
    { command: "/weather_forecast", description: "Weather" },
  ]);

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome !", {
      reply_markup: {
        keyboard: [
          [{ text: "photo" }, { text: "/info" }],
          [{ text: "/currency" }, { text: "/weather_forecast" }],
        ],
      },
    });
  });

  bot.onText(/\/info/, async (msg) => {
    await bot.sendMessage(
      msg.chat.id,
      "Hi. You can use me! I can store notes, show you the exchange rate, show you the weather",
    );
    await bot.sendSticker(msg.chat.id, process.env.STICKER_URL);
  });

  bot.onText(/\/currency/, (msg) => {
    bot.sendMessage(msg.chat.id, "Currency exchange rate. Select bank:", {
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

  bot.onText(/\/weather_forecast/, (msg) => {
    bot.sendMessage(
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

  bot.on("callback_query", async (msg: TelegramBot.CallbackQuery) => {
    if (msg.data === undefined) throw Error("Message data undefined!");
    const data = msg.data as monoOrPrivatType;
    if (msg.message === undefined) throw Error("Message undefined!");
    const chatId = msg.message.chat.id;
    if (data?.length === 1) {
      console.log("url", API_WEATHER, "wait, it takes much time!");
      try {
        await axios.get(API_WEATHER).then((response: AxiosResponse) => {
          const dataResponse: apiWeatherData[] = response.data.list;
          bot.sendMessage(chatId, getFormattedData(dataResponse, +data));
        });
      } catch (error) {
        throw Error((error as Error).message);
      }
    } else if (data.length > 1) {
      if (checkOldData(data)) {
        rewriteData(data).then((parsedData: bankResponse) => {
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
            bot.sendMessage(
              chatId,
              `Bank: Privatbank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`,
            );
          } else if (data.localeCompare("monobank") === 0) {
            bot.sendMessage(
              chatId,
              `Bank: Monobank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`,
            );
          }
        });
      } else {
        const parsedData = readData(data) as bankResponse;
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
          bot.sendMessage(
            chatId,
            `Bank: Privatbank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`,
          );
        } else if (data.localeCompare("monobank") === 0) {
          bot.sendMessage(
            chatId,
            `Bank: Monobank\nCurrency: 🇺🇸 USD\nBuy : ${parsedData.buy}\nSale: ${parsedData.sale}\nTime: ${formatTime}`,
          );
        }
      }
    }
  });

  bot.on("message", async (msg: TelegramBot.Message) => {
    if (msg.text?.toString().toLowerCase().indexOf("photo") === 0) {
      await axios
        .get(process.env.IMAGE_URL)
        .then(function (response) {
          bot.sendPhoto(msg.chat.id, response.request.res.responseUrl);
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
      await bot.sendMessage(
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

  bot.on("polling_error", console.log);
};
