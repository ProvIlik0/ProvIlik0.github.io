// ===== ВИЗИТЫ =====
let visitKey = "visited";
let visits = Number(localStorage.getItem("visits") || 0);

if(!sessionStorage.getItem(visitKey)){
    visits++;
    localStorage.setItem("visits", visits);
    sessionStorage.setItem(visitKey, "1");
}

document.getElementById("visits").textContent = visits;

// ===== ПЕРЕКЛЮЧЕНИЕ =====
const regBox = document.getElementById("registerBox");
const loginBox = document.getElementById("loginBox");
const tabReg = document.getElementById("tabReg");
const tabLogin = document.getElementById("tabLogin");

function showRegister(){
    regBox.style.display="block";
    loginBox.style.display="none";
    tabReg.classList.add("active");
    tabLogin.classList.remove("active");
}

function showLogin(){
    regBox.style.display="none";
    loginBox.style.display="block";
    tabLogin.classList.add("active");
    tabReg.classList.remove("active");
}

// ===== ПРОВЕРКА =====
function valid(l,p){
    if(!l||!p) return "Заполни все поля";
    if(/[А-Яа-я]/.test(l)) return "Русские буквы запрещены";
    if(/\s/.test(l)) return "Пробелы запрещены";
    return "";
}

// ===== РЕГИСТРАЦИЯ =====
function register(){
    const l = regLogin.value.trim();
    const p = regPass.value.trim();
    const e = valid(l,p);
    if(e){ regError.textContent=e; return; }

    localStorage.setItem("user",JSON.stringify({l,p}));
    regError.style.color="#7CFF7C";
    regError.textContent="Аккаунт создан. Войди 👇";
    showLogin();
    logLogin.value=l;
}

// ===== ВХОД =====
function login(){
    const u = JSON.parse(localStorage.getItem("user")||"null");
    if(!u) return alert("Нет аккаунта");
    if(logLogin.value!==u.l||logPass.value!==u.p)
        return alert("Неверные данные");
    alert("Вход выполнен");
}

// ===== ГЕНЕРАТОР НИКОВ =====
const historyBox = document.getElementById("history");

function genNick(){
    const base = baseInput();
    const rand = Math.floor(Math.random()*900+100);
    const nick = base + rand;
    saveHistory(nick);
    alert(nick);
}

function baseInput(){
    return base.value || ["Player","X","Neo","Dark"][Math.floor(Math.random()*4)];
}

// ===== ИСТОРИЯ =====
function saveHistory(n){
    let h = JSON.parse(localStorage.getItem("history")||"[]");
    h.unshift(n);
    h = h.slice(0,5);
    localStorage.setItem("history",JSON.stringify(h));
    renderHistory();
}

function renderHistory(){
    let h = JSON.parse(localStorage.getItem("history")||"[]");
    historyBox.innerHTML = h.map(x=>"• "+x).join("<br>");
}

function toggleHistory(){
    renderHistory();
    historyBox.style.display =
        historyBox.style.display==="block"?"none":"block";
}

// ===== ПАРОЛЬ =====
function genPass(){
    const chars="ABCDEFGabcdefg123456789!@#";
    let p="";
    for(let i=0;i<10;i++)
        p+=chars[Math.floor(Math.random()*chars.length)];
    alert(p);
}
