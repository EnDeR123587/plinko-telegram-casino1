const User = require("./models/User");

async function rewardReferrer(user, bet) {
    if (!user.referrer) return;
    const ref = await User.findOne({ telegramId: user.referrer });
    if (!ref) return;
    const reward = bet * 0.05;
    ref.balance += reward;
    await ref.save();
}

module.exports = rewardReferrer;