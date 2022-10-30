require("dotenv").config();
process.env.NTBA_FIX_319 = String(1);
const TelegramBot = require("node-telegram-bot-api");
import {
  TelegramMessage,
  MatchedCurrency,
  ResponseData,
  CallbackMessage,
} from "./interfaces/interfaces";
import axios from "axios";
import { db } from "./databaseHandlers/dbInit";
import { getCurrencyList, getStrinFromList } from "./utils/utils";
import {
  greetMessage,
  helpMessage,
  updateMessage,
  showAverageMessage,
} from "./constants/botMessages";

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const start = () => {
  bot.onText(/\/start/, (msg: TelegramMessage) => {
    bot.sendMessage(msg.chat.id, greetMessage);
  });

  bot.onText(/\/help/, (msg: TelegramMessage) => {
    bot.sendMessage(msg.chat.id, helpMessage);
  });

  bot.onText(/\/listFavourite/, async (msg: TelegramMessage) => {
    const [favourite, _] = await db.showAllFavourite(msg.chat.id);
    bot.sendMessage(msg.chat.id, getStrinFromList(getCurrencyList(favourite)));
  });

  bot.onText(
    /\/addToFavourite_([A-Z]{3,5})/,
    async (msg: TelegramMessage, match_curr: MatchedCurrency) => {
      const chatId = msg.chat.id;
      if (!match_curr) throw Error("Empty currency name");
      const resp = match_curr[1] as string;

      await db.addToFavourite(resp, chatId);
      bot.sendMessage(chatId, `${resp} added to favourite`);
    },
  );

  bot.onText(
    /\/removeFromFavourite_([A-Z]{3,5})/,
    async (msg: TelegramMessage, match_curr: MatchedCurrency) => {
      const chatId = msg.chat.id;
      if (!match_curr) throw Error("Empty currency name");
      const resp = match_curr[1] as string;

      await db.deleteFromFavourites(resp, chatId);
      bot.sendMessage(msg.chat.id, `${resp} removed from favourite`);
    },
  );

  bot.onText(/\/listRecent/, async (msg: TelegramMessage) => {
    axios
      .get(`http://${process.env.API_HOST}/period/60`)
      .then((response) => {
        if (response.data === "") {
          bot.sendMessage(msg.chat.id, updateMessage);
        }
        let obj: ResponseData = response.data;
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
      .catch((error) => {
        console.error(error);
      });
  });

  bot.onText(
    /\/[A-Z]{3,5}/,
    async (msg: TelegramMessage, match_curr: MatchedCurrency) => {
      const chatId = msg.chat.id;
      if (!match_curr) throw Error("Empty currency name");
      const resp = match_curr[1];
      const currentCyrrency = (match_curr[0] as string).slice(1);

      const favourite = await db.showAllFavourite(chatId);
      const currencyList = getCurrencyList(favourite[0]);
      if (currencyList.includes(currentCyrrency)) {
        bot.sendMessage(chatId, "/removeFromFavourite_" + currentCyrrency);
      } else {
        bot.sendMessage(chatId, "/addToFavourite_" + currentCyrrency);
      }

      bot.sendMessage(chatId, showAverageMessage, {
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
    },
  );

  bot.on("callback_query", async (msg: CallbackMessage) => {
    if (!msg.data || !msg.message) throw Error("Message data not found");
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
            Number(data[0]) === 30 ? "minutes" : "hour(s)"
          }: $${price}`,
        );
      })

      .catch(function (error) {
        console.error(error);
      });
  });

  bot.on("polling_error", console.log);
};

start();
