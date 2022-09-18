require("dotenv").config();
import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import {
  addToFavourite,
  deleteFromFavourites,
  showAllFavourite,
} from "./utils/dbFunctions";
import { getCurrencyList, getStrinFromList } from "./utils/utils";

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const start = () => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const message = "Hello! Write /help to see available command";

    bot.sendMessage(chatId, message);
  });

  bot.onText(/\/help/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      "Here is only the current rate of crypto from the most popular exchanges! Here's what I can do:" +
        '\n/listRecent - gives a list of "hype" crypto;' +
        "\n/listFavourite - returns the selected crypt sheet",
    );
  });

  bot.onText(/\/listFavourite/, async (msg) => {
    showAllFavourite(msg.chat.id)
      .then((favourite) =>
        bot.sendMessage(
          msg.chat.id,
          getStrinFromList(getCurrencyList(favourite[0])),
        ),
      )
      .catch((err) => console.log(err));
  });

  bot.onText(/\/addToFavourite_([A-Z]{3,5})/, async (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];

    addToFavourite(resp, chatId)
      .then((data) => bot.sendMessage(chatId, `${resp} added to favourite`))
      .catch((err) => console.log(err));
  });

  bot.onText(/\/removeFromFavourite_([A-Z]{3,5})/, async (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];

    deleteFromFavourites(resp, chatId)
      .then((data) =>
        bot.sendMessage(msg.chat.id, `${resp} removed from favourite`),
      )
      .catch((err) => console.log(err));
  });

  bot.onText(/\/listRecent/, async (msg) => {
    axios
      .get(`http://${process.env.API_HOST}/period/30`)
      .then(function (response) {
        if (response.data === "") {
          bot.sendMessage(
            msg.chat.id,
            "There are no records for the last 30 minutes. Update the data",
          );
        }
        let obj = response.data;
        let formattedData = "";
        for (let item in obj) {
          if (
            item.localeCompare("timestamp") !== 0 &&
            item.localeCompare("id") !== 0
          ) {
            formattedData += `\n/${item}  $${obj[item]}`;
          }
        }

        bot.sendMessage(
          msg.chat.id,
          formattedData === "" ? "Repeat the request later" : formattedData,
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  bot.onText(/\/[A-Z]{3,5}/, async (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    const currentCyrrency = match[0].slice(1);

    showAllFavourite(chatId).then((favourite) => {
      const currencyList = getCurrencyList(favourite[0]);
      if (currencyList.includes(currentCyrrency)) {
        bot.sendMessage(chatId, "/removeFromFavourite_" + currentCyrrency);
      } else {
        bot.sendMessage(chatId, "/addToFavourite_" + currentCyrrency);
      }
    });

    bot.sendMessage(chatId, "To derive the average price for the last ones:", {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            { text: "30 min", callback_data: `30 ${currentCyrrency}` },
            { text: "1 h", callback_data: `1 ${currentCyrrency}` },
            { text: "3 h", callback_data: `3 ${currentCyrrency}` },
            { text: "6 h", callback_data: `6 ${currentCyrrency}` },
            { text: "12 h", callback_data: `12 ${currentCyrrency}` },
            { text: "24 h", callback_data: `24 ${currentCyrrency}` },
          ],
        ],
      }),
    });
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data.split(" ");
    const chatId = msg.message.chat.id;
    axios
      .get(`http://${process.env.API_HOST}/currencies/${data[1]}/${data[0]}`)
      .then(function (response) {
        let obj = response.data;
        let currency = Object.keys(obj)[0];
        let price = obj[currency];
        bot.sendMessage(
          chatId,
          `Currency ${currency} rate for period ${data[0]} ${
            data[0] === 30 ? "minutes" : "hour(s)"
          }: $${price}`,
        );
      })

      .catch(function (error) {
        console.log(error);
      });
  });

  bot.on("polling_error", console.log);
};

start();
