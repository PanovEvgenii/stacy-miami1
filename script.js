const FANVUE_URL='https://www.fanvue.com/stacy_miami/fv-3';
const i18n={
  en:{counter:'Visitors this month',age:'Are you 18 years old or older?',yes:'Yes, I am 18+',no:"No, I'm under 18",adultTop:'✦ EXCLUSIVE CONTENT',tgTop:'✦ FREE CHANNEL',lines:['Private updates are waiting for you ✨','Tap and unlock exclusive access','Join now and don’t miss new drops','VIP mood. One tap away.','Telegram has daily extras','Exclusive posts are live','Open private access now','Fresh drops every day']},
  ru:{counter:'Посетителей за месяц',age:'Вам уже есть 18 лет?',yes:'Да, мне есть 18+',no:'Мне нет 18',adultTop:'✦ ЭКСКЛЮЗИВНЫЙ КОНТЕНТ',tgTop:'✦ БЕСПЛАТНЫЙ КАНАЛ',lines:['Личный контент уже ждёт тебя ✨','Нажми и открой эксклюзив','Подпишись и не пропускай новинки','VIP-настроение в один клик','В Telegram — ежедневные апдейты','Эксклюзивные посты уже доступны','Открой приватный доступ','Новые посты каждый день']}
};
let lang=(navigator.language||'en').toLowerCase().startsWith('ru')?'ru':'en';
const $=(s)=>document.querySelector(s); const overlay=document.getElementById('tickerOverlay');

function applyLang(){const t=i18n[lang];$('#counterLabel').textContent=t.counter;$('#ageText').textContent=t.age;$('#confirm18').textContent=t.yes;$('#deny18').textContent=t.no;$('#adultTop').textContent=t.adultTop;$('#tgTop').textContent=t.tgTop;$('#langBtn').textContent=(lang==='ru'?'RU':'EN')+' ▾';}
$('#langBtn').addEventListener('click',()=>{lang=lang==='ru'?'en':'ru';applyLang();renderTicker();});
$('#adultBtn').addEventListener('click',()=>$('#ageModal').classList.remove('hidden'));
$('#confirm18').addEventListener('click',()=>{$('#ageModal').classList.add('hidden');$('#adultBtn').classList.remove('locked');window.location.href=FANVUE_URL;});
$('#deny18').addEventListener('click',()=>$('#ageModal').classList.add('hidden'));

function renderTicker(){
  if(!overlay) return;
  const lines=[...i18n[lang].lines].sort(()=>Math.random()-0.5).slice(0,3); overlay.innerHTML='';
  lines.forEach((line,i)=>{const d=document.createElement('div'); d.className='flyline '+(Math.random()>0.5?'run-ltr':'run-rtl'); d.textContent=line; d.style.top=`${20+i*28}%`; d.style.animationDelay=`${i*0.25}s`; overlay.appendChild(d);});
}
setInterval(renderTicker,5200);
setInterval(()=>document.querySelectorAll('.card').forEach(c=>c.classList.toggle('pulse')),1300);

async function counter(){
  const d=new Date(); const m=`${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}`; const localKey=`stacy-local-${m}`;
  try{
    const r=await fetch(`https://api.countapi.xyz/hit/stacy-global-traffic/visitors-${m}`,{cache:'no-store'});
    const j=await r.json(); if(typeof j.value==='number'){ $('#visitorsCount').textContent=j.value; return; }
  }catch{}
  const local=(Number(localStorage.getItem(localKey)||'0')+1); localStorage.setItem(localKey,String(local)); $('#visitorsCount').textContent=local;
}
applyLang();renderTicker();counter();
