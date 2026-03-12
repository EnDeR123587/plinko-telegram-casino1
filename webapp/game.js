async function play() {
    const bet = parseInt(document.getElementById("bet").value);
    const res = await fetch("/play", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramId: window.Telegram.WebApp.initDataUnsafe.user.id, bet })
    });
    const data = await res.json();
    balance = data.balance;
    document.getElementById("balance").innerText = "Баланс: " + balance;
    document.getElementById("result").innerText = "x" + data.multiplier + " выигрыш " + data.win;
}