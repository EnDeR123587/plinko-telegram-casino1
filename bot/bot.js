require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, msg => {
    bot.sendMessage(msg.chat.id, "🎰 Играть в Plinko", {
        reply_markup: {
            inline_keyboard: [[
                { text: "Открыть Plinko", web_app: { url: process.env.WEBAPP_URL } }
            ]]
        }
    });
});