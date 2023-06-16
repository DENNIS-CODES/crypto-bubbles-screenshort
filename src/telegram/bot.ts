import { Message } from 'node-telegram-bot-api';
import { configs } from '../configs';
import { formartMessage } from './formatMsg';
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(configs.BOT_TOKEN, {polling: true, filepath: false});

bot.onText(/\/start/, async (msg: Message) => {
  const chatId = msg.chat.id;
  const defaultMessage =
    `Hello Welcome to ${msg.from?.username}, a ScreenShareBot Powered by Equam🔥`.replaceAll(
      "_",
      "\\_"
    );
  await bot.sendMessage(chatId, defaultMessage, {parse_mode: "MarkdownV2"});
});

// A function to send messages
export const sendMessage = async (
    message: string,
    delete_message: boolean = false
  ) => {
    try {
      for (const chatId of configs.WHITELISTED_USERS) {
        await bot.sendMessage(chatId, formartMessage(message), {
          parse_mode: "MarkdownV2",
          disable_web_page_preview: true,
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


// A function to send photo
export const sendPhotoToWhitelistedUsers = async (photoUrl: any) => {
    try {
      for (const chatId of configs.WHITELISTED_USERS) {
      bot.sendPhoto(chatId, photoUrl);
      }
    } catch (error) {
      console.error('Error sending photo:', error);
    }
};

export {bot}
