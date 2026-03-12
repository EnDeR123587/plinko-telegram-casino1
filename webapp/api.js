const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe.user;
let balance = 0;

async function auth() {
    const res = await fetch("/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramId: user.id, username: user.username })
    });
    const data = await res.json();
    balance = data.balance;
    updateBalance();
}

function updateBalance() {
    document.getElementById("balance").innerText = "Баланс: " + balance;
}

auth();