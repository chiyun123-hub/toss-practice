// Pure logic: text normalization, word alignment, intonation judgement, feedback text.
(function (root) {
  const ONES = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  const TENS = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  const ORD = {one:'first',two:'second',three:'third',five:'fifth',eight:'eighth',nine:'ninth',twelve:'twelfth'};
  function under100(n){ if(n<20) return [ONES[n]]; const t=[TENS[Math.floor(n/10)]]; if(n%10) t.push(ONES[n%10]); return t; }
  function numWords(n){
    if(n<100) return under100(n);
    if(n<1000){ const r=[ONES[Math.floor(n/100)],'hundred']; if(n%100) r.push(...under100(n%100)); return r; }
    if(n>=1100 && n<2000){ const r=under100(Math.floor(n/100)); r.push(...(n%100? under100(n%100):['hundred'])); return r; }
    if(n<1000000){ const r=numWords(Math.floor(n/1000)); r.push('thousand'); if(n%1000) r.push(...numWords(n%1000)); return r; }
    return String(n).split('');
  }
  function ordinal(words){ const w=words.slice(); const last=w[w.length-1];
    if(ORD[last]) w[w.length-1]=ORD[last]; else if(last.endsWith('y')) w[w.length-1]=last.slice(0,-1)+'ieth'; else w[w.length-1]=last+'th'; return w; }
  function plural(words){ const w=words.slice(); const last=w[w.length-1];
    w[w.length-1]= last.endsWith('y') ? last.slice(0,-1)+'ies' : last+'s'; return w; }
  function tokenize(text){
    let s=' '+text.toLowerCase()+' ';
    s=s.replace(/[’‘]/g,"'").replace(/\ba\.\s?m\.?/g,' am ').replace(/\bp\.\s?m\.?/g,' pm ').replace(/%/g,' percent ');
    s=s.replace(/\bdr\./g,' doctor ').replace(/\bdr\b/g,' doctor ').replace(/\bmr\./g,' mister ').replace(/\bst\./g,' street ');
    s=s.replace(/(\d),(\d{3})/g,'$1$2').replace(/-/g,' ');
    s=s.replace(/(\d+):(\d+)/g,(m,h,mm)=>' '+h+' '+(mm==='00'?'':mm)+' ');
    const out=[];
    for(const raw of s.split(/\s+/)){
      const t=raw.replace(/^[^a-z0-9']+|[^a-z0-9']+$/g,'');
      if(!t) continue;
      let m;
      if((m=t.match(/^(\d+)(st|nd|rd|th)$/))) out.push(...ordinal(numWords(+m[1])));
      else if((m=t.match(/^(\d+)'?s$/))) out.push(...plural(numWords(+m[1])));
      else if(/^\d+$/.test(t)) out.push(...numWords(+t));
      else if((m=t.match(/^(\d+)([a-z]+)$/))) { out.push(...numWords(+m[1]), m[2]); }
      else out.push(t.replace(/'/g,''));
    }
    return out;
  }
  // LCS alignment -> list of ops
  function align(a,b){
    const n=a.length,m=b.length, d=Array.from({length:n+1},()=>new Int16Array(m+1));
    for(let i=n-1;i>=0;i--) for(let j=m-1;j>=0;j--) d[i][j]= a[i]===b[j] ? d[i+1][j+1]+1 : Math.max(d[i+1][j],d[i][j+1]);
    const ops=[]; let i=0,j=0, cur=null;
    const push=(type,x,y)=>{ if(!cur||cur.type!==type){ cur={type,exp:[],got:[]}; ops.push(cur);} if(x!=null)cur.exp.push(x); if(y!=null)cur.got.push(y); };
    while(i<n||j<m){
      if(i<n&&j<m&&a[i]===b[j]){ cur=null; ops.push({type:'eq',exp:[a[i]],got:[b[j]]}); i++; j++; }
      else if(j<m&&(i===n||d[i][j+1]>=d[i+1][j])) { push('diff',null,b[j]); j++; }
      else { push('diff',a[i],null); i++; }
    }
    return ops.filter(o=>o.type==='diff').filter(o=>o.exp.join('')!==o.got.join(''));
  }
  const TH=/th/;
  function soundTip(exp,got){
    if(!got) return null;
    if(TH.test(exp) && !TH.test(got)) return '티 에이치 소리는 혀끝을 윗니와 아랫니 사이에 살짝 내밀고 바람을 내보내세요';
    const swap=(x,y)=>exp.replace(/[^a-z]/g,'').length===got.length;
    if(/r/.test(exp)&&/l/.test(got)&&!/l/.test(exp)) return '알 소리는 혀끝이 입천장에 닿지 않게 혀를 뒤로 말아 주세요';
    if(/l/.test(exp)&&/r/.test(got)&&!/r/.test(exp)) return '엘 소리는 혀끝을 윗니 뒤 잇몸에 딱 붙여 주세요';
    if(/f/.test(exp)&&/p/.test(got)) return '에프 소리는 윗니로 아랫입술을 살짝 물고 바람을 내보내세요';
    if(/v/.test(exp)&&/b/.test(got)) return '브이 소리는 윗니를 아랫입술에 대고 떨리게 내 주세요';
    if(/z|s$/.test(exp)&&/j/.test(got)) return '지 소리가 아니라 벌이 붕 하는 즈 소리로 내 주세요';
    if(got.length<exp.length && exp.startsWith(got)) return '마지막 자음 소리까지 끝까지 살려 주세요';
    return null;
  }
  const WH=/^(what|when|where|why|who|whom|whose|which|how)\b/i;
  function expectedEnd(sentence){
    const s=sentence.trim(); const p=s.slice(-1);
    if(p==='?') return WH.test(s) ? 'fall' : 'rise';
    return 'fall';
  }
  function commaCount(sentence){ return (sentence.match(/,/g)||[]).length; }
  // frames: [{t, rms, f0}] ; returns chunks with end slope (semitones over last 0.4 s)
  function analyzePitch(frames, opts={}){
    if(!frames.length) return {chunks:[], ok:false};
    const maxR=Math.max(...frames.map(f=>f.rms));
    if(maxR<0.004) return {chunks:[], ok:false, silent:true};
    const thr=Math.max(maxR*0.12, 0.003);
    const chunks=[]; let cur=null, gap=0;
    for(const f of frames){
      if(f.rms>thr){ if(!cur){cur={s:f.t,e:f.t,fr:[]};} cur.e=f.t; cur.fr.push(f); gap=0; }
      else if(cur){ gap+= (opts.dt||0.02); if(gap>=0.22){ chunks.push(cur); cur=null; } }
    }
    if(cur) chunks.push(cur);
    const real=chunks.filter(c=>c.e-c.s>0.18);
    for(const c of real){
      const tail=c.fr.filter(f=>f.t>=c.e-0.4 && f.f0>0);
      const all=c.fr.filter(f=>f.f0>0).map(f=>f.f0).sort((a,b)=>a-b);
      c.slope=null;
      if(tail.length>=5 && all.length){
        const med=all[Math.floor(all.length/2)];
        const xs=tail.map(f=>f.t), ys=tail.map(f=>12*Math.log2(f.f0/med));
        const mx=xs.reduce((a,b)=>a+b)/xs.length, my=ys.reduce((a,b)=>a+b)/ys.length;
        let num=0,den=0; for(let k=0;k<xs.length;k++){num+=(xs[k]-mx)*(ys[k]-my); den+=(xs[k]-mx)**2;}
        c.slope= den? num/den*0.4 : 0; // semitones change over 0.4 s
      }
      c.dir = c.slope==null ? '?' : c.slope>0.8 ? 'rise' : c.slope<-0.8 ? 'fall' : 'flat';
    }
    return {chunks:real, ok:true};
  }
  function judgeIntonation(sentence, pitch){
    const res={endOk:null, msgs:[], endDir:null};
    if(!pitch.ok || !pitch.chunks.length) return res;
    const ch=pitch.chunks, last=ch[ch.length-1];
    const exp=expectedEnd(sentence); res.endDir=last.dir;
    if(last.dir==='?') res.endOk=null;
    else if(exp==='fall') { res.endOk = last.dir==='fall';
      if(!res.endOk) res.msgs.push(last.dir==='rise' ? '문장 끝이 올라갔어요. 평서문은 끝을 내려 주세요' : '문장 끝이 평평했어요. 마지막 단어에서 음을 확실히 내려 주세요'); }
    else { res.endOk = last.dir==='rise';
      if(!res.endOk) res.msgs.push('예 아니오 의문문이에요. 문장 끝을 올려 주세요'); }
    const cc=commaCount(sentence);
    if(cc>0){
      if(ch.length===cc+1){
        const bad=ch.slice(0,cc).filter(c=>c.dir==='fall').length;
        if(bad) res.msgs.push('쉼표 앞에서 음이 내려갔어요. 쉼표에서는 살짝 올리고 이어 가세요');
      } else if(ch.length<cc+1) res.msgs.push('쉼표에서 잠깐 쉬어 주세요');
    }
    if(ch.length>cc+4) res.msgs.push('중간에 너무 자주 끊겼어요. 의미 덩어리로 이어 읽어 주세요');
    return res;
  }
  function splitSentences(text){
    const prot=text.replace(/\b([ap])\.m\.(?=\s+[a-z])/g,'$1․m․').replace(/\b(Dr|Mr|Mrs|Ms|St)\./g,'$1․');
    return prot.split(/(?<=[.?!])\s+(?=[A-Z"'])/).map(s=>s.replace(/․/g,'.').trim()).filter(Boolean);
  }
  const api={tokenize,align,soundTip,expectedEnd,analyzePitch,judgeIntonation,splitSentences,numWords};
  if(typeof module!=='undefined') module.exports=api; else root.Core=api;
})(this);
