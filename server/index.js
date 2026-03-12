require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const User = require('./models/User');
const play = require('./gameEngine');
const rewardRef = require('./referral');
const getLeaderboard = require('./leaderboard');

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => res.send("Server is running!"));

// Telegram webhook
const bot = new TelegramBot(process.env.BOT_TOKEN);
const URL = process.env.WEBAPP_URL;
bot.setWebHook(`${URL}/bot${process.env.BOT_TOKEN}`);
app.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Bot commands
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '🎰 Играть в Plinko', {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Открыть игру', web_app: { url: URL } }
      ]]
    }
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// API endpoints
app.post("/auth", async (req, res) => {
  const { telegramId, username } = req.body;
  let user = await User.findOne({ telegramId });
  if (!user) user = await User.create({ telegramId, username });
  res.json(user);
});

app.post("/play", async (req, res) => {
  const { telegramId, bet } = req.body;
  const user = await User.findOne({ telegramId });
  if (user.balance < bet) return res.json({ error: "balance" });

  user.balance -= bet;
  const result = play(bet);
  user.balance += result.win;
  user.totalWon += result.win;

  await rewardRef(user, bet);
  await user.save();
  res.json({ balance: user.balance, multiplier: result.multiplier, win: result.win });
});

app.get("/leaderboard", async (req, res) => {
  const top = await getLeaderboard();
  res.json(top);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));