/* ===== TIMER ===== */
let time = 1800;
const timerEl = document.getElementById("timer");

setInterval(() => {
    if (time <= 0) return;
    time--;
    const m = String(Math.floor(time / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");
    timerEl.textContent = `Осталось ${m}:${s}`;
}, 1000);

/* ===== NICK GENERATOR ===== */
const historyArr = [];

function generateNick(){
    const base = document.getElementById("baseNick").value || "";
    const caseType = document.getElementById("caseType").value;

    const letters = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";

    let rand = "";
    for(let i=0;i<6;i++){
        rand += Math.random() > 0.5
            ? letters[Math.floor(Math.random()*letters.length)]
            : nums[Math.floor(Math.random()*nums.length)];
    }

    let nick = base + rand;

    if(caseType === "lower") nick = nick.toLowerCase();
    if(caseType === "upper") nick = nick.toUpperCase();

    document.getElementById("nickResult").textContent = nick;

    historyArr.unshift(nick);
    if(historyArr.length > 5) historyArr.pop();
    renderHistory();
}

function renderHistory(){
    const h = document.getElementById("history");
    h.innerHTML = historyArr.join("<br>");
}

function toggleHistory(){
    const h = document.getElementById("history");
    h.style.display = h.style.display === "block" ? "none" : "block";
}

/* ===== PASSWORD ===== */
function generatePassword(){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pass = "";
    for(let i=0;i<12;i++){
        pass += chars[Math.floor(Math.random()*chars.length)];
    }
    document.getElementById("passResult").textContent = pass;
}
