const FANVUE_URL = 'https://www.fanvue.com/stacy_miami/fv-3';
const i18n = {
  en: {counter:'Visitors this month', age:'Are you 18 years old or older?', yes:'Yes, I am 18+', no:"No, I'm under 18", adultTop:'✦ EXCLUSIVE CONTENT', tgTop:'✦ FREE CHANNEL', lines:['Private updates are waiting for you ✨','Tap and unlock exclusive access','Join now and don’t miss new drops','VIP mood. One tap away.','Telegram has daily extras','Exclusive posts are live']},
  ru: {counter:'Посетителей за месяц', age:'Вам уже есть 18 лет?', yes:'Да, мне есть 18+', no:'Мне нет 18', adultTop:'✦ ЭКСКЛЮЗИВНЫЙ КОНТЕНТ', tgTop:'✦ БЕСПЛАТНЫЙ КАНАЛ', lines:['Личный контент уже ждёт тебя ✨','Нажми и открой эксклюзив','Подпишись и не пропускай новинки','VIP-настроение в один клик','В Telegram — ежедневные апдейты','Эксклюзивные посты уже доступны']}
};
let lang = (navigator.language||'en').toLowerCase().startsWith('ru') ? 'ru':'en';
const $ = (s)=>document.querySelector(s);

function applyLang(){
  const t=i18n[lang];
  $('#counterLabel').textContent=t.counter; $('#ageText').textContent=t.age; $('#confirm18').textContent=t.yes; $('#deny18').textContent=t.no;
  $('#adultTop').textContent=t.adultTop; $('#tgTop').textContent=t.tgTop; $('#langBtn').textContent=(lang==='ru'?'RU':'EN')+' ▾';
}
$('#langBtn').addEventListener('click',()=>{lang=lang==='ru'?'en':'ru';applyLang();renderTicker();});

$('#adultBtn').addEventListener('click',()=>$('#ageModal').classList.remove('hidden'));
$('#confirm18').addEventListener('click',()=>{ $('#ageModal').classList.add('hidden'); $('#adultBtn').classList.remove('locked'); window.open(FANVUE_URL,'_blank','noopener,noreferrer'); });
$('#deny18').addEventListener('click',()=>$('#ageModal').classList.add('hidden'));

function renderTicker(){
  const lines=i18n[lang].lines.sort(()=>Math.random()-0.5).slice(0,3);
  $('#ticker').innerHTML='';
  lines.forEach(line=>{const d=document.createElement('div'); d.className='callout'; d.textContent=line; $('#ticker').appendChild(d);});
}
setInterval(renderTicker,5600);

async function counter(){
  const d=new Date(); const m=`${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}`;
  try{const r=await fetch(`https://api.countapi.xyz/hit/stacy-global-traffic/visitors-${m}`); const j=await r.json(); $('#visitorsCount').textContent=j.value ?? 0;}
  catch{ $('#visitorsCount').textContent='—'; }
}

applyLang(); renderTicker(); counter();
