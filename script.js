// ===== VISITS =====
let visits = Number(localStorage.getItem("visits") || 0);
if(!sessionStorage.getItem("visited")){
    visits++;
    localStorage.setItem("visits", visits);
    sessionStorage.setItem("visited","1");
}
document.getElementById("visits").textContent = visits;

// ===== ELEMENTS =====
const authCard = document.getElementById("authCard");
const genCard = document.getElementById("genCard");

const regBox = document.getElementById("registerBox");
const loginBox = document.getElementById("loginBox");

const tabReg = document.getElementById("tabReg");
const tabLogin = document.getElementById("tabLogin");

const regError = document.getElementById("regError");
const logError = document.getElementById("logError");

const historyBox = document.getElementById("history");

// ===== TABS =====
function showRegister(){
    regBox.classList.remove("hidden");
    loginBox.classList.add("hidden");
    tabReg.classList.add("active");
    tabLogin.classList.remove("active");
}

function showLogin(){
    loginBox.classList.remove("hidden");
    regBox.classList.add("hidden");
    tabLogin.classList.add("active");
    tabReg.classList.remove("active");
}

// ===== VALIDATION =====
function valid(l,p){
    if(!l || !p) return "Заполни все поля";
    if(/[А-Яа-я]/.test(l)) return "Русские буквы запрещены";
    if(/\s/.test(l)) return "Пробелы запрещены";
    return "";
}

// ===== REGISTER =====
function register(){
    const l = regLogin.value.trim();
    const p = regPass.value.trim();
    const e = valid(l,p);
    if(e){ regError.textContent=e; return; }

    localStorage.setItem("user",JSON.stringify({l,p}));
    showLogin();
    logLogin.value=l;
    logPass.value="";
    logPass.focus();
}

// ===== LOGIN =====
function login(){
    const u = JSON.parse(localStorage.getItem("user")||"null");
    if(!u){ logError.textContent="Нет аккаунта"; return; }
    if(logLogin.value!==u.l || logPass.value!==u.p){
        logError.textContent="Неверные данные";
        return;
    }
    authCard.classList.add("hidden");
    genCard.classList.remove("hidden");
}

// ===== LOGOUT =====
function logout(){
    genCard.classList.add("hidden");
    authCard.classList.remove("hidden");
    showLogin();
}

// ===== NICK =====
function genNick(){
    const base = document.getElementById("base").value || ["Player","Neo","Dark","X"][rand(4)];
    const nick = base + rand(900+100);
    document.getElementById("nickResult").textContent = nick;
    saveHistory(nick);
}

function rand(n){ return Math.floor(Math.random()*n); }

// ===== HISTORY =====
function saveHistory(n){
    let h = JSON.parse(localStorage.getItem("history")||"[]");
    h.unshift(n);
    h = h.slice(0,5);
    localStorage.setItem("history",JSON.stringify(h));
}

function toggleHistory(){
    let h = JSON.parse(localStorage.getItem("history")||"[]");
    historyBox.innerHTML = h.length ? h.map(x=>"• "+x).join("<br>") : "Пусто";
    historyBox.style.display =
        historyBox.style.display==="block"?"none":"block";
}

// ===== PASSWORD =====
function genPass(){
    const chars="ABCDEFGabcdefg123456789!@#$";
    let p="";
    for(let i=0;i<10;i++) p+=chars[rand(chars.length)];
    document.getElementById("passResult").textContent = p;
}
