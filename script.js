/* ===== THEME ===== */
function setTheme(t){
    document.body.className=t;
    localStorage.setItem("theme",t);
}
document.body.className=localStorage.getItem("theme")||"dark";

/* ===== VISITS ===== */
let visits=+localStorage.getItem("visits")||0;
let sessionUsed=sessionStorage.getItem("used");
const visitsEl=document.getElementById("visits");
updateVisits();

function action(){
    if(!sessionUsed){
        visits++;
        localStorage.setItem("visits",visits);
        sessionStorage.setItem("used","1");
        sessionUsed=true;
        updateVisits();
    }
}
function updateVisits(){visitsEl.textContent="Visits: "+visits;}

/* ===== AUTH UI ===== */
function showRegister(){
    register.style.display="block";
    login.style.display="none";
    tabReg.classList.add("active");
    tabLog.classList.remove("active");
}
function showLogin(){
    register.style.display="none";
    login.style.display="block";
    tabLog.classList.add("active");
    tabReg.classList.remove("active");
}

/* ===== AUTH LOGIC ===== */
function valid(l,p){
    if(!l||!p) return "Заполни все поля";
    if(/[а-яА-Я\s]/.test(l)) return "Русские буквы и пробелы запрещены";
    return "";
}

function register(){
    const err=valid(regLogin.value,regPass.value);
    if(err){regError.textContent=err;return;}
    localStorage.setItem("user",JSON.stringify({l:regLogin.value,p:regPass.value}));
    auth.style.display="none";app.style.display="block";
    action();
}

function login(){
    const u=JSON.parse(localStorage.getItem("user"));
    if(!u)return;
    if(logLogin.value===u.l&&logPass.value===u.p){
        auth.style.display="none";app.style.display="block";
        action();
    }
}

function logout(){
    app.style.display="none";
    auth.style.display="block";
}

/* ===== TEMP ACCOUNT ===== */
let tempTimer;
function createTemp(){
    let t=1800;
    timer.style.display="block";
    auth.style.display="none";app.style.display="block";
    action();
    tempTimer=setInterval(()=>{
        t--;
        timer.textContent=`Осталось ${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`;
        if(t<=0){clearInterval(tempTimer);logout();}
    },1000);
}

/* ===== NICK + HISTORY ===== */
let hist=JSON.parse(localStorage.getItem("hist")||"[]");

function generateNick(){
    const c="abcdefghijklmnopqrstuvwxyz0123456789";
    let r="";for(let i=0;i<6;i++)r+=c[Math.random()*c.length|0];
    const n=(baseNick.value||"")+r;
    nickResult.textContent=n;
    hist.unshift(n);if(hist.length>5)hist.pop();
    localStorage.setItem("hist",JSON.stringify(hist));
    renderHistory();action();
}
function renderHistory(){history.innerHTML=hist.join("<br>");}
function toggleHistory(){
    history.style.display=history.style.display==="block"?"none":"block";
}
renderHistory();

/* ===== PASSWORD ===== */
function generatePassword(){
    const c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let p="";for(let i=0;i<12;i++)p+=c[Math.random()*c.length|0];
    passResult.textContent=p;action();
}
