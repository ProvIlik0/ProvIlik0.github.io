function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function formatBase(text) {
    if (!text) return "Player";
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/* вкладки */
function switchTab(tab) {
    const nickTab = document.getElementById("tabNick");
    const passTab = document.getElementById("tabPass");
    const nickSection = document.getElementById("nickSection");
    const passSection = document.getElementById("passSection");

    if (tab === "nick") {
        nickTab.classList.add("active");
        passTab.classList.remove("active");
        nickSection.classList.add("active");
        passSection.classList.remove("active");
    } else {
        passTab.classList.add("active");
        nickTab.classList.remove("active");
        passSection.classList.add("active");
        nickSection.classList.remove("active");
    }
}

/* ники */
function generateNickname() {
    const base = formatBase(
        document.getElementById("nameInput").value.trim()
    );
    const style = document.getElementById("styleSelect").value;

    let nick = "";

    if (style === "game") {
        const suffixes = ["Pro", "X", "GG", "Fire", "Prime", "1337"];
        nick = base + random(suffixes);
    }

    if (style === "media") {
        const suffixes = ["YT", "TV", "Official", "Live"];
        const prefixes = ["Its", "Real", ""];
        nick = random(prefixes) + base + random(suffixes);
    }

    if (style === "short") {
        const symbols = ["x", "_"];
        nick = random(symbols) + base;
    }

    document.getElementById("nicknameResult").innerText = nick;
}

/* пароли */
function generatePassword() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
    let pass = "";

    for (let i = 0; i < 14; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }

    document.getElementById("passwordResult").innerText = pass;
}

/* копирование */
function copyText(id) {
    const text = document.getElementById(id).innerText;
    if (!text) return;
    navigator.clipboard.writeText(text);
}

/* тема */
function toggleTheme() {
    document.body.classList.toggle("light");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("light") ? "light" : "dark"
    );
}

/* загрузка темы */
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
}
