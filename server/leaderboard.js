const User = require("./models/User");

async function getLeaderboard() {
    const top = await User.find().sort({ totalWon: -1 }).limit(10);
    return top;
}

module.exports = getLeaderboard;