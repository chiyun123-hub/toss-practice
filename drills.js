// 🧩 연습 기능 모음 (v46, 2026-11-17): ① 답변 틀 카드 ③ 표→문장·숫자 읽기 ④ 재도전 자동 비교 ⑤ Q11 아이디어 뱅크
// ② 발음 짝 드릴 데이터(PAIRS)도 여기 있고 index.html(출퇴근)과 연습 탭에서 같이 씀.

// ---------------- ① 답변 틀 카드 ----------------
// 제이크 틀 + 치윤님 답안지 기준. 준비 시간에 보이고, 답변 중에는 지금 말할 문장을 강조.
const SCAF = {
  3:["I think this picture was taken at / in + 장소.","On the left side of the picture, a ___ wearing ___ is ~ing.","On the right, another ___ (with ___ hair) is ~ing.","In the background, there are ___ / ___ are displayed.","It seems like ___."],
  5:["질문 단어 그대로: The last time I ~ was ___ ago / I usually ~ ___ .","답 하나 더: and I ___ (with ___ / for ___)."],
  6:["I prefer ___ / I think ___ .","That's because I can ___ .","For example, ___ ."],
  7:["I think ___ is the most ___ (factor).","That's because ___ .","So ___ .","For example, when I ___ , I ___ ."],
  8:["The ___ is at / on ___ (with ___).","and ___ (질문 두 번째 것)."],
  9:["I'm sorry, but there seems to be a misunderstanding.","___ has been canceled / moved to ___ / She has worked at ___ .","So ___ ."],
  10:["There are two ___ .","First, ___ worked as a ___ at ___ from ___ to ___ / will give a ___ on ___ at ___ .","Second, ___ has been ___ since ___ / another ___ will be ___ .","Also, ___ ."],
  11:["I would prefer ___ / I agree that ___ .","That's because (누구나 공감하는 이유) ___ .","So ___ .","For example, about ___ ago, I / my ___ ___ .","(전개) ___ .","As a result, ___ .","That's why ___ ."]
};
SCAF[4]=SCAF[3];
// 자동: 11/21(Day7)까지 전체 → 11/25(Day11)까지 힌트(앞 단어만) → 그 뒤(리허설·시험)는 끄기
function scafLevel(){ const s=(localStorage.getItem('scaf')||'auto'); if(s!=='auto') return s; const i=dayIdx(); return i<=6?'full':i<=10?'hint':'off'; }
function scafCut(t){ const w=t.split(' '); return w.length>3? w.slice(0,3).join(' ')+' …' : t; }
let scafQ=null, scafTimer=null;
function scafAttach(html){ scafQ=null; const m=/Question (\d+) of 11/.exec(html); if(!m) return; const q=+m[1]; const lv=scafLevel(); if(!SCAF[q]||lv==='off') return; scafQ=q;
  const box=document.createElement('div'); box.id='scafBox'; box.className='scaf';
  box.innerHTML=`<div class="sub">🧱 답변 틀 · ${lv==='full'?'전체':'힌트'} <span style="float:right">${SCAF[q].length}문장 목표</span></div>`+SCAF[q].map((t,i)=>`<div class="sl" data-i="${i}">${i+1}. ${esc(lv==='full'?t:scafCut(t))}</div>`).join('');
  $('stage').appendChild(box); }
function scafRun(sec){ scafStop(); const box=$('scafBox'); if(!box) return; const ls=[...box.querySelectorAll('.sl')], n=ls.length, t0=performance.now();
  const tick=()=>{ const k=Math.min(n-1,Math.floor((performance.now()-t0)/1000/(sec/n))); ls.forEach((l,i)=>{ l.classList.toggle('now',i===k); l.classList.toggle('done',i<k); }); };
  tick(); scafTimer=setInterval(tick,300); }
function scafStop(){ if(scafTimer) clearInterval(scafTimer); scafTimer=null; }
function scafCtlHTML(){ const v=localStorage.getItem('scaf')||'auto'; const o=[['auto','자동 (11/21까지 전체 → 11/25까지 힌트 → 끄기)'],['full','항상 전체'],['hint','힌트만'],['off','끄기']];
  return `🧱 답변 틀 카드: <select id="scafSel" style="font:inherit;background:#0b0f14;color:var(--fg);border:1px solid #2a3340;border-radius:8px;padding:3px">${o.map(([k,l])=>`<option value="${k}"${k===v?' selected':''}>${l}</option>`).join('')}</select> <span class="sub">지금: ${({full:'전체',hint:'힌트',off:'끔'})[scafLevel()]}</span>`; }
function bindScafCtl(id){ const el=$(id); if(!el) return; el.innerHTML=scafCtlHTML(); $('scafSel').onchange=e=>{ localStorage.setItem('scaf',e.target.value); bindScafCtl(id); }; }

// ---------------- ④ 재도전 자동 비교 ----------------
function cwords(t){ return (t.toLowerCase().match(/[a-z0-9']+/g)||[]).filter(w=>!/^(a|an|the|i|is|are|was|to|of|and|in|on|at|it|my|me|so|for|that|this)$/.test(w)); }
function usedFix(fix, text){ const a=[...new Set(cwords(fix))]; if(!a.length) return false; const b=new Set(cwords(text)); return a.filter(w=>b.has(w)).length/a.length>=0.6; }
function retrySummary(date, qs, dn){
  const F=(typeof FEEDBACK!=='undefined')?FEEDBACK:{}; const notes=Object.keys(F).filter(k=>k.slice(0,10)===date).flatMap(k=>F[k].notes||[]);
  const rows=qs.map(q=>{ const lab=q===11?'Q11-1':'Q'+q, base=`Day${dn}_${lab}`;
    const orig=recs.find(r=>!r.img && (r.name===base+'.webm'||r.name===base+'.m4a'||r.name===base+'.wav'));
    const ret=[...recs].reverse().find(r=>!r.img && r.name.startsWith(base+'_재도전'));
    return {q, orig, ret, fixes:notes.filter(n=>n.q===q).map(n=>n.fix)}; });
  const box=document.createElement('div'); box.className='cmpbox'; box.id='retrySum';
  const cell=r=> r? `<audio controls src="${URL.createObjectURL(r.blob)}"></audio>${metricsHTML(r.m)}<div class="trtext sub">${r.text?esc(r.text):''}</div>` : '<span class="sub">녹음 목록에 없음</span>';
  box.innerHTML=`<b>🆚 재도전 결과 — 원래 답 vs 재도전</b><div class="sub">졸업 후보 = 시간 75% 이상 + 3초 넘는 침묵 없음 + 답안지 고친 문장 하나 이상 사용 (받아쓰기 후 판정). 최종 점수는 Claude 채점으로.</div>
    <button id="rsTr" style="width:100%;margin:8px 0">📝 받아쓰기로 고친 문장 썼는지 확인 (처음 한 번 모델 받기)</button>`+
    rows.map(x=>`<div class="cmprow" data-q="${x.q}"><div><b>Q${x.q}</b> <span class="verdict sub"></span></div><div class="cmp2"><div><span class="tag">원래</span>${cell(x.orig)}</div><div><span class="tag">재도전</span>${cell(x.ret)}</div></div><div class="fixuse sub"></div></div>`).join('');
  $('stage').innerHTML=''; $('stage').appendChild(box);
  const judge=()=>rows.forEach(x=>{ const el=box.querySelector(`.cmprow[data-q="${x.q}"]`); const m=x.ret&&x.ret.m; if(!m){ el.querySelector('.verdict').textContent='재도전 녹음 없음'; return; }
    const timeOK=m.speak/m.sec>=0.75 && m.maxGap<3; const used=x.ret.text? x.fixes.filter(f=>usedFix(f,x.ret.text)) : null;
    el.querySelector('.fixuse').innerHTML= x.fixes.length? (used? x.fixes.map(f=>`${used.includes(f)?'✅':'⬜'} ${esc(f)}`).join('<br>') : '고친 문장 사용 여부: 받아쓰기 후 표시') : '';
    const ok= timeOK && (!x.fixes.length || (used && used.length>0));
    el.querySelector('.verdict').innerHTML= ok? '🎓 <b style="color:#86efac">졸업 후보</b>' : (timeOK? (used?'고친 문장을 아직 안 씀':'시간 OK · 받아쓰기로 확인') : '⏱ 아직 짧거나 끊김'); });
  judge();
  $('rsTr').onclick=async()=>{ const b=$('rsTr'); b.disabled=true; b.textContent='받아쓰는 중…';
    try{ for(const x of rows) for(const r of [x.orig,x.ret]) if(r && !r.text){ r.text=await transcribe(r.blob); }
      saveRecs(); retrySummary(date,qs,dn); }catch(e){ b.textContent='받아쓰기 실패: '+e.message; b.disabled=false; } };
}

// ---------------- 공통: 음성인식 (대안 여러 개) ----------------
function listenAlts(ms=8000){ return new Promise(res=>{ const SR=window.SpeechRecognition||window.webkitSpeechRecognition; if(!SR) return res({err:'no-sr',alts:[]});
  const r=new SR(); r.lang='en-US'; r.interimResults=false; r.maxAlternatives=5; let alts=[], done=false; const fin=e=>{ if(!done){done=true; res({alts, err:e});} };
  r.onresult=e=>{ const x=e.results[e.results.length-1]; alts=[...x].map(a=>a.transcript.trim()); }; r.onerror=e=>fin(e.error); r.onend=()=>fin(); setTimeout(()=>{ try{r.stop();}catch(_){} },ms); try{ r.start(); }catch(e){ fin('start'); } }); }
const normT=t=>t.toLowerCase().replace(/[’']/g,"'").replace(/[^a-z0-9:'$. ]/g,' ').replace(/\s+/g,' ').trim();

// ---------------- ③ 표 → 문장 ----------------
// keys = 꼭 들어가야 할 말(숫자·이름·전치사). 음성인식이 숫자를 '9:30'처럼 쓰는 걸 고려해 숫자는 숫자로.
const T2S=[
 {q:"What time is the social media workshop, and who is leading it?",t:'A',row:'9:30–10:30 a.m. | Workshop: Social Media Trends | Emily Clark',model:'Emily Clark will lead a workshop on social media trends from 9:30 to 10:30 a.m.',keys:['emily','clark','workshop','on','social media','from','9:30','to','10:30']},
 {q:"Can you tell me about the lecture on building a brand?",t:'A',row:'10:30–11:30 a.m. | Lecture: Building a Brand | Mark Lee',model:'Mark Lee will give a lecture on building a brand from 10:30 to 11:30 a.m.',keys:['mark','lee','give','lecture','on','brand','from','10:30','11:30']},
 {q:"I'd like to attend the panel on online advertising at 12:30. That's right?",t:'A',row:'12:30–1:30 p.m. | Panel: Online Advertising (Canceled)',model:'Unfortunately, the panel discussion on online advertising has been canceled.',keys:['panel','online advertising','has been canceled']},
 {q:"How much is the registration fee?",t:'A',row:'Registration fee: $60 (members $40)',model:'The registration fee is 60 dollars, but members only pay 40 dollars.',keys:['registration fee','60','members','40']},
 {q:"When and where will the conference be held?",t:'A',row:'Date: Saturday, March 14 · Location: Riverside Hotel, Ballroom',model:'The conference will be held on Saturday, March 14th, in the ballroom at the Riverside Hotel.',keys:['will be held','on','march','14','at','riverside hotel']},
 {q:"What time is the first interview, and who is it with?",t:'B',row:'9:30 a.m. | Jason Choi | Sales Manager | Blue Mobile',model:'The first interview is at 9:30 a.m. with Jason Choi from Blue Mobile, who is applying for the sales manager position.',keys:['at','9:30','with','jason','choi','from','blue mobile','sales manager']},
 {q:"I'll meet Kevin Moore at 11:30, right?",t:'B',row:'11:30 a.m. | Kevin Moore (Canceled) | Sales Manager | Top Retail',model:"I'm sorry, but there seems to be a misunderstanding. Kevin Moore's interview at 11:30 has been canceled.",keys:['misunderstanding','kevin','moore','interview','11:30','has been canceled']},
 {q:"Who is the 1:30 interview with?",t:'B',row:'1:30 p.m. | Linda Yoon | Design Engineer | Hanbit Electronics (internal)',model:'At 1:30 p.m., you will interview Linda Yoon, who currently works at Hanbit Electronics and is applying for the design engineer position.',keys:['1:30','linda','yoon','works at','hanbit','design engineer']},
 {q:"Who is interviewing at 3 p.m.?",t:'B',row:'3:00 p.m. | Brian Song | Sales Manager | Green Foods',model:'Brian Song from Green Foods will be interviewed at 3 p.m. for the sales manager position.',keys:['brian','song','from','green foods','interviewed','at','3','sales manager']},
 {q:"What was her most recent degree, and when did she receive it?",t:'C',row:'M.S. in Mechanical Engineering, Korea University, 2019',model:'Her most recent degree is a master\'s degree in mechanical engineering from Korea University, and she received it in 2019.',keys:["master's",'degree','in','mechanical engineering','from','korea university','received','2019']},
 {q:"Where is she working now?",t:'C',row:'Senior Engineer, Hyundai Robotics (2021–present)',model:'She has been working as a senior engineer at Hyundai Robotics since 2021.',keys:['has been','as','senior engineer','at','hyundai robotics','since','2021']},
 {q:"Where did she work before that?",t:'C',row:'Engineer, LG Parts (2019–2021)',model:'She worked as an engineer at LG Parts from 2019 to 2021.',keys:['worked','as','engineer','at','lg parts','from','2019','to','2021']},
 {q:"What skills does she have?",t:'C',row:'Skills: AutoCAD, Python, fluent in English and Chinese',model:'She also has skills in AutoCAD and Python, and she speaks English and Chinese fluently.',keys:['skills','autocad','python','english','chinese','fluent']},
 {q:"When is Kids Story Time, and who leads it?",t:'D',row:'July 3 (Mon) | Kids Story Time | 10:00 a.m. | Amy Lee',model:'On Monday, July 3rd, Amy Lee will lead Kids Story Time at 10 a.m.',keys:['on','july','3','amy','lee','story time','at','10']},
 {q:"The resume writing workshop is on July 12th, right?",t:'D',row:'July 12 (Wed) Resume Writing Workshop → moved to July 14 (Fri) | 7:00 p.m. | John Kim',model:'The resume writing workshop on July 12th has been moved to Friday, July 14th, at 7 p.m.',keys:['resume writing workshop','has been moved','to','friday','july','14','7']},
 {q:"Can you tell me about the book club?",t:'D',row:'July 17 (Mon) | Book Club: Science Fiction | 6:30 p.m. | Paul Han',model:'Paul Han will lead a book club on science fiction at 6:30 p.m. on Monday, July 17th.',keys:['paul','han','book club','on','science fiction','at','6:30','july','17']},
 {q:"What time does my flight leave on Tuesday?",t:'E',row:'Nov 3 (Tue) | 8:20 a.m. | Depart Incheon (KE701) → arrive Tokyo 10:40 a.m.',model:'You will depart from Incheon on flight KE701 at 8:20 a.m. on Tuesday, November 3rd, and arrive in Tokyo at 10:40 a.m.',keys:['depart','incheon','8:20','november','3','arrive','tokyo','10:40']},
 {q:"I have dinner with clients on November 4th, right?",t:'E',row:'Nov 4 | 6:30 p.m. | Dinner with clients (Canceled)',model:'Unfortunately, the dinner with clients on November 4th has been canceled.',keys:['dinner','with clients','november','4','has been canceled']},
 {q:"What do I have on the afternoon of November 3rd?",t:'E',row:'Nov 3 | 2:00 p.m. | Meeting with Sato Trading',model:'At 2 p.m. on November 3rd, you have a meeting with Sato Trading.',keys:['at','2','november','3','meeting','with','sato trading']},
 {q:"When is the yoga class?",t:'F',row:'Yoga | Mon, Wed | 7:00 a.m. | Studio A',model:'The yoga class is held on Mondays and Wednesdays at 7 a.m. in Studio A.',keys:['yoga','mondays','wednesdays','at','7','in','studio a']},
 {q:"How much does a class cost?",t:'F',row:'Fee: $30 per month per class',model:'The fee is 30 dollars per month for each class.',keys:['fee','30','per month','class']},
 {q:"Are there any new classes?",t:'F',row:'Dance | Friday | 8:00 p.m. | Studio A (new class)',model:'There is also a new dance class on Fridays at 8 p.m. in Studio A.',keys:['new','dance class','on','fridays','at','8','studio a']},
 {q:"Who is giving the keynote, and when does it start?",t:'H',row:'9:30–10:30 a.m. | Keynote: The Future of Robotics | Hall A | Dr. Kevin Han',model:'Dr. Kevin Han will give a keynote speech on the future of robotics from 9:30 to 10:30 a.m. in Hall A.',keys:['kevin','han','give','keynote','on','robotics','from','9:30','to','10:30','hall a']},
 {q:"Do I need to bring my own lunch?",t:'H',row:'12:00–1:00 p.m. | Lunch (provided for registered guests) | Lobby',model:"That won't be necessary. Lunch will be provided for registered guests in the lobby from 12 to 1 p.m.",keys:["won't be necessary",'lunch','will be provided','registered guests','lobby','12','1']},
 {q:"How much is admission?",t:'H',row:'Admission: $25 (students $15)',model:'The admission fee is 25 dollars, and students pay only 15 dollars.',keys:['admission','25','students','15']},
 {q:"What is his current job?",t:'I',row:'Marketing Team Leader, Blue Ocean Foods (2021–present)',model:'He has been working as a marketing team leader at Blue Ocean Foods since 2021.',keys:['has been','as','marketing team leader','at','blue ocean foods','since','2021']},
 {q:"What did he do before that?",t:'I',row:'Marketing Assistant, Star Retail (2016–2020)',model:'He worked as a marketing assistant at Star Retail from 2016 to 2020.',keys:['worked','as','marketing assistant','at','star retail','from','2016','to','2020']},
 {q:"Has he received any awards?",t:'I',row:'Awards: Best Campaign Award, 2023',model:'He also received the Best Campaign Award in 2023.',keys:['received','best campaign award','in','2023']},
 {q:"The fire safety training is on Wednesday, right?",t:'J',row:'May 13 (Wed) Fire Safety → moved to May 15 (Fri), 10:00 a.m. | Mark Cho',model:'The fire safety session has been moved to Friday, May 15th, at 10 a.m., and Mark Cho will lead it.',keys:['fire safety','has been moved','to','friday','may','15','10','mark','cho']},
 {q:"What session is on Thursday?",t:'J',row:'May 14 (Thu) | Using the New Booking System | 9:00 a.m. | Lisa Park',model:'On Thursday, May 14th, Lisa Park will lead a session on using the new booking system at 9 a.m.',keys:['on','thursday','may','14','lisa','park','on','booking system','at','9']},
 {q:"Jake Lee teaches the painting class, right?",t:'K',row:'Painting | Sunday | 6:00–8:00 p.m. | Jake Lee → Tom Yoon',model:'I\'m sorry, but there seems to be a misunderstanding. The painting class on Sundays will now be taught by Tom Yoon, not Jake Lee.',keys:['misunderstanding','painting','sunday','by','tom','yoon','jake','lee']},
 {q:"When is the guitar class?",t:'K',row:'Guitar for Beginners | Saturday | 1:00–2:30 p.m. | Jake Lee',model:'Jake Lee teaches Guitar for Beginners on Saturdays from 1 to 2:30 p.m.',keys:['jake','lee','guitar','on','saturdays','from','1','to','2:30']},
 {q:"How much is the registration fee, and is there an age limit?",t:'K',row:'Registration fee: $20 per class · Ages 18+',model:'The registration fee is 20 dollars per class, and the classes are for people aged 18 and over.',keys:['registration fee','20','per class','18']},
 {q:"What happens at 1 p.m.?",t:'G',row:'1:00 p.m. | Team Building Activity | Tom Baker',model:'At 1 p.m., Tom Baker will lead a team building activity.',keys:['at','1','tom','baker','lead','team building activity']},
 {q:"Do we need to bring our own lunch?",t:'G',row:'12:00 p.m. | Lunch (provided)',model:"You don't need to bring your own lunch. Lunch will be provided at 12 p.m.",keys:['lunch','will be provided','at','12']},
 {q:"What is the last session of the day?",t:'G',row:'3:00 p.m. | Q&A with Managers | Various',model:'At 3 p.m., there will be a Q&A session with managers.',keys:['at','3','there will be','q','with managers']}
];
function keyHit(k, said){ const s=' '+normT(said).replace(/[.,!?](?=\s|$)/g,'')+' ', kk=normT(k).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  if(/^\d/.test(kk)) return new RegExp('(^|[^0-9])'+kk+'([^0-9]|$)').test(s);
  return new RegExp('(^| )'+kk+"( |$|s |'s )").test(s); }

// ---------------- 숫자 읽기 ----------------
function numItem(){ const r=a=>a[Math.floor(Math.random()*a.length)], n=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
  const kinds=[
    ()=>{ const y=r([2016,2017,2019,2020,2021,2023,2024]); return {show:String(y), hint:'연도', ans:String(y)}; },
    ()=>{ const h=n(1,12), m=r(['00','15','30','45']); const ap=r(['a.m.','p.m.']); return {show:`${h}:${m} ${ap}`, hint:'시각', ans: m==='00'?String(h):`${h}:${m}`}; },
    ()=>{ const d=r([1970,1980,1990]); return {show:`the ${d}s`, hint:'연대', ans:d+'s'}; },
    ()=>{ const p=r([15,25,30,40,45,60,99.5,12.75]); return {show:`$${p}`, hint:'가격', ans:String(p)}; },
    ()=>{ const x=r([13,14,15,16,17,18,19,30,40,50,60,70,80,90]); return {show:String(x)+' people', hint:'-teen vs -ty', ans:String(x)}; },
    ()=>{ const mo=r(['March','May','July','November']), d=n(1,30); return {show:`${mo} ${d}`, hint:'날짜(서수로)', ans:String(d)}; },
    ()=>{ const g=n(2,9)*100+n(1,9); return {show:'Room '+g, hint:'방 번호(한 자리씩도 OK)', ans:String(g)}; }
  ]; return r(kinds)(); }

// ---------------- ② 발음 짝 (치윤님이 실제로 틀린 것) ----------------
const PAIRS=[['room','loom'],['hall','hole'],['alone','around'],['large','rod'],['learn','run'],['real','rear'],['forty','fourteen'],['fifth','fist'],['foreign','four inch'],['thirty','story'],['flash','plash'],['light','right'],['lead','read'],['fly','fry'],['play','pray'],['work','walk'],['coastal','costa'],['fee','pea'],['file','pile'],['collect','correct']];

// ---------------- 🧩 연습 탭 ----------------
let dMode='t2s';
function renderDrills(){ const b=$('drillBody'); if(!b) return;
  const seg=[['t2s','📋 표→문장'],['num','🔢 숫자'],['pair','👂 발음 짝'],['idea','💡 Q11 아이디어']];
  b.innerHTML=`<div class="card" id="scafCtl2"></div><div class="pseg">${seg.map(([k,l])=>`<button data-m="${k}" class="${k===dMode?'on':''}">${l}</button>`).join('')}</div><div id="drillArea"></div>`;
  bindScafCtl('scafCtl2'); b.querySelectorAll('[data-m]').forEach(x=>x.onclick=()=>{ dMode=x.dataset.m; renderDrills(); });
  ({t2s:drillT2S, num:drillNum, pair:drillPair, idea:drillIdea})[dMode](); }
const srWarn=()=> (window.SpeechRecognition||window.webkitSpeechRecognition)? '' : '<div class="card bad">이 브라우저는 음성인식이 안 돼요 → 크롬에서 열어 주세요.</div>';
function t2sPick(){ const tab=(typeof P4_DAYS!=='undefined' && P4_DAYS[dayN()])? P4_DAYS[dayN()].t : null; const pool=T2S.filter(x=>x.t!==tab); return pool[Math.floor(Math.random()*pool.length)]; }
function t2sFrame(m){ const keep=/^(I'm|I|Unfortunately|First|Second|That|There|The|At|On|He|She|You|Lunch|Q&A)$/; return m.replace(/\b(\d[\d:.]*(?:st|nd|rd|th)?|[A-Z][A-Za-z0-9&'.]*)/g,w=> keep.test(w)?w:'___').replace(/(___[\s,]*){2,}/g,'___ ').replace(/___ (?=[.,])/g,'___'); }
let t2sCur=null, t2sStat={n:0,ok:0}, t2sHelp=(typeof localStorage==='undefined')||!localStorage.getItem('t2sSeen');
function t2sMark(x){ const doc=$('t2sDoc'); if(!doc) return; const tk=t=>new Set((t.toLowerCase().replace(/<[^>]+>/g,' ').match(/[a-z0-9:$]+/g)||[]));
  const want=tk(x.row); let best=null, bs=0;
  [...doc.querySelectorAll('tr'), ...doc.querySelectorAll('.dinfo div')].forEach(el=>{ if(el.querySelector&&el.querySelector('th')) return; const h=[...tk(el.textContent)].filter(w=>want.has(w)).length; if(h>bs){ bs=h; best=el; } });
  if(best && bs>=2){ best.style.background='#fff3b0'; best.style.outline='2px solid #f59e0b'; best.style.fontWeight='700'; } }
function drillT2S(){ t2sCur=t2sCur||t2sPick(); const x=t2sCur, T=P4_TABLES[x.t];
  const help=`<div class="card" style="border:1px solid #4f9cf9"><div style="display:flex;align-items:center"><b>📋 이렇게 하면 돼요</b><button id="t2sHelpT" style="margin-left:auto;padding:4px 10px">${t2sHelp?'접기':'펼치기'}</button></div>
     ${t2sHelp?`<ol style="margin:8px 0 0 18px;line-height:1.7">
       <li><b>🎤 시작</b>을 누르면 실제 시험처럼 <b>전화 질문</b>이 영어로 나와요 (화면에도 보여요).</li>
       <li>아래 <b>실제 시험 표</b>의 <b>노란 줄</b>에서 답을 찾고, <b>빈칸 틀</b>에 넣어서 머릿속으로 문장을 만들어요 (3초).</li>
       <li>삐 소리가 나면 <b>한 문장으로 말해요</b>. 말이 끝나고 잠깐 멈추면 자동으로 끝나요.</li>
       <li>결과 칩: <span class="mchip ok">✓ 말한 것</span> <span class="mchip bad">✗ 빠진 것</span> → 80% 넘으면 통과.</li>
       <li>못 넘으면 <b>🔊 모범 문장 듣기 → 🎤 다시</b>. 통과하면 <b>다음 ▶</b>.</li></ol>
       <div class="sub" style="margin-top:6px">목표: 파트4에서 표의 글을 그대로 읽지 않고 <b>문장</b>(as · at · from A to B · since · on · by)으로 바꾸는 습관. 하루 5개면 충분해요.</div>`:''}</div>`;
  $('drillArea').innerHTML=srWarn()+help+`<div class="card">
   <div class="sub">📞 질문 (${esc(T.title)})</div><div style="font-size:18px;font-weight:700;margin:4px 0 10px">${esc(x.q)} ${sayBtns(x.q)}</div>
   <div class="sub">📋 실제 시험 표 — <b style="background:#fff3b0;color:#111;padding:0 4px;border-radius:4px">노란 줄</b>에 답이 있어요</div><div id="t2sDoc" style="margin-top:4px">${tableHTML(T)}</div>
   <div class="sub" style="margin-top:10px">🧱 빈칸 틀 (이 순서로 말해 보세요)</div><div class="scaf" style="margin-top:4px"><div class="sl">${esc(t2sFrame(x.model))}</div></div>
   <button id="t2sGo" class="big" style="margin-top:12px;width:100%">🎤 시작 (질문 듣기 → 3초 생각 → 말하기)</button><div id="t2sRes" style="margin-top:8px"></div>
   <div style="display:flex;gap:6px;margin-top:8px"><button id="t2sModel" style="flex:1">🔊 모범 문장 듣기</button><button id="t2sNext" style="flex:1">다음 ▶</button></div>
   <div class="sub" style="margin-top:6px">오늘 ${t2sStat.ok}/${t2sStat.n} 통과</div></div>`;
  t2sMark(x);
  $('t2sHelpT').onclick=()=>{ t2sHelp=!t2sHelp; localStorage.setItem('t2sSeen','1'); drillT2S(); };
  $('t2sNext').onclick=()=>{ t2sCur=t2sPick(); drillT2S(); };
  $('t2sModel').onclick=()=>{ if(!$('t2sModelTxt')) $('t2sRes').insertAdjacentHTML('beforeend',`<div class="gex" id="t2sModelTxt">${esc(x.model)} ${sayBtns(x.model)}</div>`); speakEN(x.model,true); };
  $('t2sGo').onclick=async()=>{ const go=$('t2sGo'); go.disabled=true; localStorage.setItem('t2sSeen','1');
    go.textContent='📞 질문 듣는 중…'; await new Promise(r=>{ speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(x.q); u.lang='en-US'; u.rate=0.95; u.onend=r; u.onerror=r; speechSynthesis.speak(u); setTimeout(r,9000); });
    for(let s=3;s>0;s--){ go.textContent=`🤔 생각하기… ${s}`; await new Promise(r=>setTimeout(r,1000)); }
    try{ const ac=new (window.AudioContext||window.webkitAudioContext)(), o=ac.createOscillator(); o.frequency.value=880; o.connect(ac.destination); o.start(); o.stop(ac.currentTime+0.18); }catch(_){}
    go.textContent='🔴 말하세요 (끝나면 잠깐 멈추기)';
    const r=await listenAlts(15000); go.disabled=false; go.textContent='🎤 다시 (질문 듣기 → 3초 → 말하기)';
    if(!r.alts.length){ $('t2sRes').innerHTML=`<div class="sub">못 들었어요(${r.err||'무음'}). 마이크를 허용했는지 보고 다시 눌러 주세요.</div>`; return; }
    const best=r.alts[0]; const hit=x.keys.map(k=>[k, r.alts.some(a=>keyHit(k,a))]); const pct=Math.round(100*hit.filter(h=>h[1]).length/hit.length);
    t2sStat.n++; if(pct>=80) t2sStat.ok++;
    $('t2sRes').innerHTML=`<div style="font-size:17px">${pct>=80?'✅ 통과':'🔁 아깝다'} <b>${pct}%</b></div><div class="sub">들린 말: <i>${esc(best)}</i></div><div style="margin-top:4px">${hit.map(([k,ok])=>`<span class="mchip ${ok?'ok':'bad'}">${ok?'✓':'✗'} ${esc(k)}</span>`).join('')}</div>`+
      (pct<80?`<div class="sub" style="margin-top:6px">✗ 칩에 있는 말을 넣어서 다시 해 보세요. 모범 문장:</div><div class="gex" id="t2sModelTxt">${esc(x.model)} ${sayBtns(x.model)}</div>`:`<div class="sub" style="margin-top:6px">좋아요! <b>다음 ▶</b>을 누르세요.</div>`); };
}
let numCur=null, numStat={n:0,ok:0};
function drillNum(){ numCur=numCur||numItem(); const x=numCur;
  $('drillArea').innerHTML=srWarn()+`<div class="card"><div class="sub"><b>하는 법:</b> 큰 숫자를 보고 → 🎤 읽기 → 영어로 소리 내 읽기 → ✅/❌ 확인 → 헷갈리면 🔊 정답 듣기 → 다음.<br>🔢 숫자는 핵심 강세 — 천천히 크게 (제이크 Part1 ④). 연도 2021 = twenty twenty-one · forty(앞 강세) vs fourteen(뒤 강세)</div>
   <div style="font-size:34px;font-weight:800;text-align:center;margin:14px 0">${esc(x.show)}</div><div class="sub" style="text-align:center">${esc(x.hint)}</div>
   <button id="numGo" class="big" style="margin-top:10px">🎤 읽기</button><div id="numRes" style="margin-top:8px"></div>
   <div style="display:flex;gap:6px;margin-top:8px"><button id="numHear" style="flex:1">🔊 정답 듣기</button><button id="numNext" style="flex:1">다음 ▶</button></div>
   <div class="sub" style="margin-top:6px">오늘 ${numStat.ok}/${numStat.n} 정확</div></div>`;
  $('numHear').onclick=()=>speakEN(x.show.replace(/^\$(.*)$/,'$1 dollars'));
  $('numNext').onclick=()=>{ numCur=numItem(); drillNum(); };
  $('numGo').onclick=async()=>{ const go=$('numGo'); go.disabled=true; go.textContent='🔴 듣는 중'; const r=await listenAlts(6000); go.disabled=false; go.textContent='🎤 다시 읽기';
    const best=(r.alts[0]||''); const ok=r.alts.slice(0,2).some(a=>{ const s=normT(a).replace(/,/g,''); return s.includes(x.ans.toLowerCase()) || s.replace(/:00/g,'').includes(x.ans.toLowerCase()); });
    numStat.n++; if(ok) numStat.ok++;
    $('numRes').innerHTML= r.alts.length? `${ok?'✅ 정확해요':'❌ 다르게 들렸어요'} · 들린 말: <i>${esc(best)}</i>` : `<span class="sub">못 들었어요(${r.err||'무음'})</span>`; };
}
let pairCur=null, pairStat={n:0,ok:0};
function drillPair(){ pairCur=pairCur||PAIRS[Math.floor(Math.random()*PAIRS.length)]; const [a,b]=pairCur;
  $('drillArea').innerHTML=srWarn()+`<div class="card"><div class="sub"><b>하는 법:</b> 1·2번 버튼을 눌러 두 단어 소리 차이 듣기 → 🎲 들려주기 눌러 몇 번인지 맞히기 → 🎤 1번 단어 말하기 → 1번으로 들리면 ✅ → 다음 짝.<br>👂 치윤님이 모의고사에서 실제로 헷갈린 짝이에요. ① 듣고 고르기 ② <b>${esc(a)}</b>를 말해서 ${esc(b)}로 안 들리게. (출퇴근 앱에도 있어요)</div>
   <div style="display:flex;gap:8px;margin:12px 0"><button class="big" id="pA" style="flex:1">1. ${esc(a)}</button><button class="big" id="pB" style="flex:1">2. ${esc(b)}</button></div>
   <button id="pQuiz" style="width:100%">🎲 둘 중 하나 들려주기 → 맞히기</button><div id="pQz" class="sub" style="margin:6px 0"></div>
   <button id="pSay" class="big" style="width:100%">🎤 「${esc(a)}」 말하기</button><div id="pRes" style="margin-top:8px"></div>
   <button id="pNext" style="width:100%;margin-top:8px">다음 짝 ▶</button><div class="sub" style="margin-top:6px">오늘 말하기 ${pairStat.ok}/${pairStat.n} 통과</div></div>`;
  $('pA').onclick=()=>speakEN(a,true); $('pB').onclick=()=>speakEN(b,true); $('pNext').onclick=()=>{ pairCur=PAIRS[Math.floor(Math.random()*PAIRS.length)]; drillPair(); };
  $('pQuiz').onclick=()=>{ const k=Math.random()<.5?0:1; speakEN(pairCur[k]); $('pQz').innerHTML=`어느 쪽? <button id="g0">1</button> <button id="g1">2</button>`; [0,1].forEach(i=>$('g'+i).onclick=()=>{ $('pQz').textContent= i===k?'✅ 맞아요':'❌ 정답은 '+(k+1)+'번 '+pairCur[k]; }); };
  $('pSay').onclick=async()=>{ const go=$('pSay'); go.disabled=true; go.textContent='🔴 듣는 중'; const r=await listenAlts(5000); go.disabled=false; go.textContent=`🎤 「${a}」 다시 말하기`;
    const al=r.alts.map(normT); const top=al[0]||''; const okA=top.split(' ').includes(a.split(' ')[0]) || top===a; const gotB=al.slice(0,1).some(t=>t.includes(b.split(' ')[0]));
    pairStat.n++; if(okA&&!gotB) pairStat.ok++;
    $('pRes').innerHTML= r.alts.length? `${okA&&!gotB?'✅ '+esc(a)+'로 들렸어요':'❌ 「'+esc(r.alts[0])+'」로 들렸어요'} <span class="sub">(후보: ${esc(r.alts.slice(0,3).join(' / '))})</span>` : `<span class="sub">못 들었어요(${r.err||'무음'})</span>`; };
}
let ideaK=null;
function drillIdea(){ const all=(typeof P5_DAYS!=='undefined')? P5_DAYS.flat() : []; if(ideaK==null) ideaK=Math.floor(Math.random()*all.length); const q=all[ideaK]||'';
  const memo=localStorage.getItem('idea_'+ideaK)||'';
  $('drillArea').innerHTML=`<div class="card"><div class="sub"><b>하는 법:</b> 주제 읽기(🔊) → 메모 칸에 입장·이유 2개·예시를 한국어로 짧게 → 🎤 45초 동안 영어로 말하기 → 녹음 목록에 저장 → 💾 저장하면 제가 채점해요.<br>💡 제이크 Part5 ⑥: 매일 11번 아이디어 연습. 45초 안에 <b>입장 → 일반 이유 2개 → 예시(누가·언제·결과)</b>를 영어로 말해 보기. 이유는 고른 쪽 2개 + 반대쪽 1개(2:1).</div>
   <div class="qtext" style="background:#fff;color:#0f172a;border-radius:8px;padding:10px;margin-top:8px">${esc(q)} ${sayBtns(q)}</div>
   <textarea id="ideaMemo" placeholder="메모 (한국어 OK, 마침표로 끝나는 문장으로) — 자동 저장" style="width:100%;min-height:90px;margin-top:8px;font:inherit;background:#0b0f14;color:var(--fg);border:1px solid #2a3340;border-radius:8px;padding:8px">${esc(memo)}</textarea>
   <button id="ideaGo" class="big" style="width:100%;margin-top:8px">🎤 45초 아이디어 말하기 (녹음 목록에 저장)</button><div id="ideaT" class="sub" style="margin-top:6px"></div>
   <button id="ideaNext" style="width:100%;margin-top:8px">다른 주제 ▶</button><div class="sub" style="margin-top:6px">${all.length}개 주제 중 ${ideaK+1}번 · 녹음은 ⏱ 실전 탭 녹음 목록에 「아이디어」로 저장 → 💾로 드라이브 재도전 폴더</div></div>`;
  $('ideaMemo').oninput=e=>localStorage.setItem('idea_'+ideaK,e.target.value);
  $('ideaNext').onclick=()=>{ ideaK=Math.floor(Math.random()*all.length); drillIdea(); };
  $('ideaGo').onclick=async()=>{ if(running) return; const go=$('ideaGo'); go.disabled=true;
    if(!await openMic()){ $('ideaT').textContent='마이크를 허용해 주세요.'; go.disabled=false; return; }
    const mime=MediaRecorder.isTypeSupported('audio/webm;codecs=opus')?'audio/webm;codecs=opus':''; const mr=new MediaRecorder(stream, mime?{mimeType:mime}:{}); const ch=[]; mr.ondataavailable=e=>{ if(e.data.size) ch.push(e.data); };
    mr.start(); for(let s=45;s>0;s--){ go.textContent=`🔴 녹음 중… ${s}초`; await new Promise(r=>setTimeout(r,1000)); } mr.stop(); await new Promise(r=>mr.onstop=r);
    const blob=new Blob(ch,{type:mr.mimeType||'audio/webm'}); const k=recs.filter(r=>r.name.includes('_아이디어')).length+1;
    const rec={name:`Day${dayNo()}_Q11_아이디어${k}.webm`, blob, retry:true}; try{ rec.m=await audioMetrics(blob,45); }catch(e){} recs.push(rec); saveRecs(); renderRecs();
    go.disabled=false; go.textContent='🎤 다시 45초'; $('ideaT').innerHTML=`저장했어요: ${rec.name} ${metricsHTML(rec.m)}`; };
}
