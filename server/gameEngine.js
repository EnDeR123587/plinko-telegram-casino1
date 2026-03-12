const multipliers = [0, 0.2, 0.5, 1, 2, 5, 10, 20];

function play(bet) {
    const index = Math.floor(Math.random() * multipliers.length);
    const multiplier = multipliers[index];
    const win = bet * multiplier;
    return { multiplier, win };
}

module.exports = play;