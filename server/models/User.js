const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  telegramId: Number,
  username: String,
  balance: { type: Number, default: 1000 },
  totalWon: { type: Number, default: 0 },
  referrer: Number
});

module.exports = mongoose.model("User", UserSchema);