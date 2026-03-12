require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(express.json());

const bot = new TelegramBot(process.env.BOT_TOKEN);
const URL = process.env.WEBAPP_URL; // https://plinko-telegram-casino1.onrender.com

// Устанавливаем webhook
bot.setWebHook(`${URL}/bot${process.env.BOT_TOKEN}`);

// Эндпоинт для приема сообщений от Telegram
app.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Пример обработки команды /start
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, '🎰 Играть в Plinko', {
        reply_markup: {
            inline_keyboard: [[
                { text: 'Открыть игру', web_app: { url: URL } }
            ]]
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));