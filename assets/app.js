(function(){
const STAR='M12 1.8l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17l-6.2 3.7 1.6-7L2 9l7.1-.6z';
function stars(n){
  let s='<span class="stars" role="img" aria-label="'+n+' out of 5 stars">';
  for(let i=1;i<=5;i++){
    const fill=i<=Math.floor(n)?1:(i-n<1?n-Math.floor(n):0);
    const id='g'+Math.random().toString(36).slice(2,8);
    s+='<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="'+id+'"><stop offset="'+fill+'" stop-color="#FFC53D"/><stop offset="'+fill+'" stop-color="rgba(238,240,255,.18)"/></linearGradient></defs><path fill="url(#'+id+')" d="'+STAR+'"/></svg>';
  }
  return s+'</span>';
}
const reviews=[
  {s:'northwind-couriers',c:'Northwind Couriers',t:'Couriers',col:'#2B3BFF',r:5,h:'Parcel arrived a day early',p:'Tracking was accurate to the hour and the rider called before arriving. Packaging was intact.',a:'Ayesha K.',d:'2 days ago'},
  {s:'lumen-dental',c:'Lumen Dental',t:'Dentists',col:'#0FA37F',r:4,h:'Painless, but the wait was long',p:'Dr. Imran explained every step. I waited 40 minutes past my slot, which is the only reason for four stars.',a:'Daniel R.',d:'3 days ago'},
  {s:'parcel-and-pine',c:'Parcel & Pine',t:'Online stores',col:'#C2410C',r:5,h:'Exactly like the photos',p:'The side table matched the listing, the wood is solid and assembly took ten minutes.',a:'Mehwish A.',d:'4 days ago'},
  {s:'orbit-telecom',c:'Orbit Telecom',t:'Mobile networks',col:'#9333EA',r:2,h:'Signal drops every evening',p:'Support was polite and logged a ticket, but three weeks later the evening drops are still there.',a:'Usman T.',d:'5 days ago'},
  {s:'halo-travel',c:'Halo Travel',t:'Travel agents',col:'#DB2777',r:4.5,h:'Visa file handled properly',p:'They caught a missing document before submission, which saved me a second appointment.',a:'Sara J.',d:'6 days ago'}
];
const tick='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
document.getElementById('rvGrid').innerHTML=reviews.map(v=>`
<article class="rv">
  <div class="rv-top"><a class="co" href="#company/${v.s}"><b style="background:${v.col}">${v.c[0]}</b><div>${v.c}<small>${v.t}</small></div></a>${stars(v.r)}</div>
  <h3>${v.h}</h3><p>${v.p}</p>
  <div class="rv-foot"><span>${v.a}, ${v.d}</span><span class="verified">${tick}Verified</span></div>
</article>`).join('');
document.getElementById('meterStars').outerHTML=stars(4.6);

const I=(d)=>'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';
const cats=[
  ['Online stores','18,240 businesses',I('<path d="M4 7h16l-1.5 11a2 2 0 01-2 1.7H7.5a2 2 0 01-2-1.7z"/><path d="M9 7a3 3 0 016 0"/>')],
  ['Couriers','2,310 businesses',I('<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>')],
  ['Banks and finance','1,905 businesses',I('<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>')],
  ['Mobile networks','640 businesses',I('<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>')],
  ['Restaurants','22,870 businesses',I('<path d="M7 3v8M5 3v4a2 2 0 004 0V3M7 11v10M16 3c-2 1.5-2.5 4-2.5 7h2.5v11"/>')],
  ['Health and dental','9,120 businesses',I('<path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z"/>')],
  ['Travel','4,460 businesses',I('<path d="M2.5 13.5l19-7-7 19-3-8z"/>')],
  ['Home services','7,050 businesses',I('<path d="M3 11l9-7 9 7M5 9.5V20h14V9.5"/><path d="M10 20v-6h4v6"/>')]
];
document.getElementById('catGrid').innerHTML=cats.map(c=>`<a class="cat" href="#categories" data-toast="${c[0]} listings open in the full product.">${c[2]}<div><strong>${c[0]}</strong><br><span>${c[1]}</span></div></a>`).join('');

/* big words split */
const bw=document.getElementById('bigWords');
bw.innerHTML=bw.textContent.split(' ').map((w,i)=>`<span style="transition-delay:${i*45}ms">${w}</span>`).join(' ');

/* toast */
const toast=document.getElementById('toast');let tt;
function say(m){toast.textContent=m;toast.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('on'),2400)}
document.addEventListener('click',e=>{const t=e.target.closest('[data-toast]');if(t){e.preventDefault();say(t.dataset.toast)}});

/* search */
const q=document.getElementById('q'),msg=document.getElementById('searchMsg');
document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{q.value=c.textContent;q.focus();msg.textContent=''}));
document.getElementById('searchForm').addEventListener('submit',e=>{
  e.preventDefault();
  const v=q.value.trim();
  if(!v){msg.textContent='Type a company name or a category to search.';q.focus();return}
  const hits=Object.keys(CO).filter(k=>(CO[k].name+' '+CO[k].cat).toLowerCase().includes(v.toLowerCase()));
  if(!hits.length){msg.textContent=`No businesses match "${v}" in this demo. Try Couriers, Dentists or Orbit.`;return}
  msg.innerHTML=`${hits.length} match${hits.length>1?'es':''}: `+hits.map(k=>`<a href="#company/${k}">${CO[k].name}</a>`).join(', ');
  rollFor(hits,0);
});

/* ---------- ludo dice: rolls the company's star rating ---------- */
const PIPS={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
const FACE_ROT={1:[0,0],2:[90,0],3:[0,-90],4:[0,90],5:[-90,0],6:[0,180]};
const rollEl=document.getElementById('roll'),die=document.getElementById('die'),drop=document.getElementById('dDrop'),shadowEl=document.getElementById('dShadow'),tally=document.getElementById('tally'),rcard=document.getElementById('rcard');
die.innerHTML=[1,2,3,4,5,6].map(n=>`<div class="face f${n}" data-n="${n}">${Array.from({length:9},(_,i)=>PIPS[n].includes(i)?'<span class="pip"></span>':'<span></span>').join('')}</div>`).join('');
let rollTimers=[],rollAnims=[],rollFocus=null;
function clearRoll(){rollTimers.forEach(clearTimeout);rollTimers=[];rollAnims.forEach(a=>a.cancel());rollAnims=[]}
function rollFor(hits,idx){
  clearRoll();
  const slug=hits[idx],c=CO[slug],sc=scoreOf(genReviews(slug)),n=Math.max(1,Math.min(5,Math.round(sc))),col=RCOL[n];
  if(!rollEl.classList.contains('open')){rollFocus=document.activeElement}
  rollEl.style.setProperty('--pc',col);rollEl.classList.remove('landed','done');rollEl.classList.add('open');rollEl.setAttribute('aria-hidden','false');
  die.querySelectorAll('.pip').forEach(p=>p.classList.remove('lit'));
  tally.textContent='';rcard.innerHTML='';
  const [rx,ry]=FACE_ROT[n],spinX=720+360*Math.floor(Math.random()*2),spinY=1080,tz=(Math.random()-.5)*20;
  const end=`rotateX(${rx+spinX}deg) rotateY(${ry+spinY}deg) rotateZ(0deg)`;
  const D=reduce?1:1900;
  rollAnims.push(die.animate([{transform:`rotateX(${-60+Math.random()*40}deg) rotateY(${Math.random()*90}deg) rotateZ(${tz}deg)`},{transform:end}],{duration:D,easing:'cubic-bezier(.15,.75,.25,1)',fill:'forwards'}));
  rollAnims.push(drop.animate([
    {transform:'translate3d(-140px,-320px,0)',offset:0},
    {transform:'translate3d(-40px,20px,0)',offset:.28,easing:'cubic-bezier(.3,0,.6,1)'},
    {transform:'translate3d(0,-70px,0)',offset:.46,easing:'cubic-bezier(.3,0,.6,1)'},
    {transform:'translate3d(24px,20px,0)',offset:.64},
    {transform:'translate3d(14px,-18px,0)',offset:.76},
    {transform:'translate3d(0,20px,0)',offset:.88},
    {transform:'translate3d(0,14px,0)',offset:1}],{duration:D,fill:'forwards'}));
  rollAnims.push(shadowEl.animate([{transform:'scale(.3)',opacity:.2},{transform:'scale(1)',opacity:1,offset:.28},{transform:'scale(.7)',opacity:.6,offset:.46},{transform:'scale(1)',opacity:1,offset:.64},{transform:'scale(1)',opacity:1}],{duration:D,fill:'forwards'}));
  const face=die.querySelector(`.f${n}`),pips=[...face.querySelectorAll('.pip')];
  const t0=D+80;
  rollTimers.push(setTimeout(()=>rollEl.classList.add('landed'),t0));
  pips.forEach((p,i)=>rollTimers.push(setTimeout(()=>{p.classList.add('lit');tally.textContent=`${i+1} star${i?'s':''}`},t0+(reduce?0:220)*(i+1))));
  rollTimers.push(setTimeout(()=>{
    tally.textContent=`${n} star${n>1?'s':''}, ${RLBL[n]}`;
    rcard.innerHTML=`<a class="co" href="#company/${slug}"><b style="background:${c.col}">${c.name[0]}</b><div>${c.name}<small>${c.cat}</small></div></a>
      <div class="rscore"><strong>${sc.toFixed(1)}</strong>${stars(Math.round(sc*2)/2)}</div>
      <p>TrustScore from ${c.total.toLocaleString()} reviews</p>
      <div class="racts"><a class="pill solid" href="#company/${slug}" id="rollOpen">See all reviews</a>${hits.length>1?`<button class="pill" type="button" id="rollNext">Roll next: ${CO[hits[(idx+1)%hits.length]].name}</button>`:''}</div>`;
    rollEl.classList.add('done');
    const nx=document.getElementById('rollNext');if(nx)nx.onclick=()=>rollFor(hits,(idx+1)%hits.length);
    document.getElementById('rollOpen').focus({preventScroll:true});
  },t0+(reduce?0:220)*(n+1)+250));
}
function closeRoll(){if(!rollEl.classList.contains('open'))return;clearRoll();rollEl.classList.remove('open','landed','done');rollEl.setAttribute('aria-hidden','true');if(rollFocus&&rollFocus.focus)rollFocus.focus({preventScroll:true})}
document.getElementById('rollX').onclick=closeRoll;
rollEl.addEventListener('click',e=>{if(e.target===rollEl)closeRoll();if(e.target.closest('a[href^="#company/"]'))closeRoll()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&rollEl.classList.contains('open')){e.stopImmediatePropagation();closeRoll()}},true);

/* reveal observers */
const io=new IntersectionObserver(es=>es.forEach(en=>{
  if(!en.isIntersecting)return;
  if(en.target===bw)bw.classList.add('in');
  if(en.target.id==='meter')en.target.querySelectorAll('i[data-w]').forEach(i=>i.style.width=i.dataset.w+'%');
}),{threshold:.35});
io.observe(bw);io.observe(document.getElementById('meter'));


/* ================= AUTH ================= */
let authOpen=false;
const auth=document.getElementById('auth'),view=document.getElementById('authView');
document.getElementById('qStars').outerHTML=stars(5);
const ico={
 eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
 eyeOff:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18M10.6 5.1A10 10 0 0112 5c6.4 0 10 7 10 7a17 17 0 01-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 005.4-1.6M9.9 9.9a3 3 0 004.2 4.2"/></svg>',
 google:'<svg viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.8-5.4 3.8-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.4 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z"/></svg>',
 apple:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.6 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.5.9-1.4 1.3-2.8 1.3-2.8s-2.1-.9-2.1-4.2zM13.9 4.9c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z"/></svg>',
 ok:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
 mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M4 7l8 6 8-6"/></svg>'
};
const reasons={review:'Log in or create an account to post your review.',business:'Create a free account to claim your business page.'};
let mode='login',reason='';
const emailRe=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function field(id,label,type,ph,extra,auto){
  return `<div class="field" id="f-${id}"><label for="${id}"><span>${label}</span>${extra||''}</label>
  <div class="ctrl"><input id="${id}" name="${id}" type="${type}" placeholder="${ph}" autocomplete="${auto}" ${type==='email'?'inputmode="email"':''}>
  ${type==='password'?`<button type="button" class="eye" data-eye="${id}" aria-label="Show password">${ico.eye}</button>`:''}</div>
  <p class="err" id="e-${id}"></p></div>`;
}
function render(){
  const signup=mode==='signup';
  if(mode==='forgot'){
    view.innerHTML=`<div class="view"><h2 id="authTitle">Reset your password</h2>
    <p class="intro">Enter the email you signed up with. We'll send a link to set a new password.</p>
    <form id="authForm" novalidate style="margin-top:26px">${field('email','Email','email','you@example.com','','email')}
    <button class="submit" type="submit"><span class="spin"></span><span>Send reset link</span></button></form>
    <p class="swap"><button type="button" class="linkbtn" data-mode="login">Back to log in</button></p></div>`;
  }else{
    view.innerHTML=`<div class="view"><h2 id="authTitle">${signup?'Create your account':'Welcome back'}</h2>
    <p class="intro">${signup?'Join 1.4 million people who review before they buy.':'Log in to write reviews, follow businesses and track your replies.'}</p>
    ${reason?`<p class="note">${reasons[reason]}</p>`:''}
    <div class="tabs" role="tablist" data-mode="${mode}"><i></i>
      <button type="button" role="tab" aria-selected="${!signup}" data-mode="login">Log in</button>
      <button type="button" role="tab" aria-selected="${signup}" data-mode="signup">Sign up</button></div>
    <div class="social"><button type="button" class="sbtn" data-social="Google">${ico.google}Google</button><button type="button" class="sbtn" data-social="Apple">${ico.apple}Apple</button></div>
    <div class="or">or with email</div>
    <form id="authForm" novalidate>
      <div class="form-err" id="formErr" role="alert"></div>
      ${signup?field('name','Full name','text','Ayesha Khan','','name'):''}
      ${field('email','Email','email','you@example.com','','email')}
      ${field('password','Password','password',signup?'At least 8 characters':'Your password',signup?'':'<button type="button" class="linkbtn" data-mode="forgot">Forgot password?</button>',signup?'new-password':'current-password')}
      ${signup?'<div class="meter-pw" aria-hidden="true"><span></span><span></span><span></span><span></span></div><p class="pw-hint" id="pwHint">Use 8+ characters with a number and a symbol.</p>':''}
      <div class="row"><label class="check"><input type="checkbox" id="remember" ${signup?'':'checked'}>${signup?'Email me when businesses reply':'Keep me logged in'}</label></div>
      <button class="submit" type="submit"><span class="spin"></span><span>${signup?'Create account':'Log in'}</span></button>
      ${signup?'<p class="terms">By creating an account you agree to our <a href="#login">Terms</a> and <a href="#login">Privacy Policy</a>. We never share your email with businesses.</p>':''}
    </form>
    <p class="swap">${signup?'Already have an account? <button type="button" class="linkbtn" data-mode="login">Log in</button>':'New to Starloom? <button type="button" class="linkbtn" data-mode="signup">Create an account</button>'}</p></div>`;
  }
  bindForm();
}
function setErr(id,msg){const f=document.getElementById('f-'+id);if(!f)return;f.classList.toggle('bad',!!msg);f.classList.toggle('ok',!msg);document.getElementById('e-'+id).textContent=msg||''}
function validate(id){
  const el=document.getElementById(id);if(!el)return true;const v=el.value.trim();let m='';
  if(id==='name'&&v.length<2)m='Enter your name as you want it shown on reviews.';
  if(id==='email'){if(!v)m='Enter your email address.';else if(!emailRe.test(v))m='This email looks incomplete. Check for a missing @ or domain.'}
  if(id==='password'){if(!el.value)m='Enter your password.';else if(mode==='signup'&&el.value.length<8)m='Use at least 8 characters.'}
  setErr(id,m);return !m;
}
function strength(pw){let n=0;if(pw.length>=8)n++;if(/[0-9]/.test(pw))n++;if(/[^A-Za-z0-9]/.test(pw))n++;if(pw.length>=12&&/[A-Z]/.test(pw))n++;return n}
function bindForm(){
  const form=document.getElementById('authForm');
  form.querySelectorAll('input:not([type=checkbox])').forEach(inp=>{
    inp.addEventListener('blur',()=>{if(inp.value)validate(inp.id)});
    inp.addEventListener('input',()=>{
      if(inp.closest('.field').classList.contains('bad'))validate(inp.id);
      document.getElementById('formErr')?.classList.remove('on');
      if(inp.id==='password'&&mode==='signup'){
        const n=strength(inp.value),cols=['#ff6b7d','#ffa24d','#ffc53d','#6fe0a8'];
        document.querySelectorAll('.meter-pw span').forEach((b,i)=>b.style.background=i<n?cols[n-1]:'');
        document.getElementById('pwHint').textContent=!inp.value?'Use 8+ characters with a number and a symbol.':['Too short','Weak. Add a number or symbol.','Okay. Add a symbol or more length.','Good password.','Strong password.'][n];
      }
    });
  });
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const ids=[...form.querySelectorAll('input:not([type=checkbox])')].map(i=>i.id);
    const okAll=ids.map(validate).every(Boolean);
    if(!okAll){form.querySelector('.field.bad input').focus();return}
    const btn=form.querySelector('.submit');btn.classList.add('busy');btn.disabled=true;
    setTimeout(()=>{
      btn.classList.remove('busy');btn.disabled=false;
      const email=document.getElementById('email').value.trim();
      if(mode==='login'&&document.getElementById('password').value==='wrongpass'){
        const fe=document.getElementById('formErr');fe.textContent='That email and password don\'t match. Try again or reset your password.';fe.classList.add('on');return;
      }
      success(email);
    },1100);
  });
  const first=view.querySelector('input:not([type=checkbox])');
  if(first&&authOpen)setTimeout(()=>first.focus({preventScroll:true}),350);
}
function success(email){
  const name=(document.getElementById('name')?.value.trim()||email.split('@')[0]).split(' ')[0];
  const nice=name.charAt(0).toUpperCase()+name.slice(1);
  setUser(nice);
  const msgs={
    login:[`Welcome back, ${nice}`,'You\'re logged in. Pick up where you left off.','Continue'],
    signup:[`You're in, ${nice}`,`We sent a confirmation link to ${email}. You can start writing reviews right away.`,reason==='business'?'Set up business page':'Write your first review'],
    forgot:['Check your inbox',`If an account exists for ${email}, a reset link is on its way. It expires in 30 minutes.`,'Back to log in']
  }[mode];
  view.innerHTML=`<div class="view done"><div class="badge">${mode==='forgot'?ico.mail:ico.ok}</div>
  <h2 id="authTitle">${msgs[0]}</h2><p class="intro">${msgs[1]}</p>
  <button class="submit" type="button" id="doneBtn" style="margin-top:28px">${msgs[2]}</button></div>`;
  const b=document.getElementById('doneBtn');b.focus();
  b.onclick=()=>{if(mode==='forgot'){mode='login';render()}else{closeAuth();say(mode==='signup'?'Account created. Welcome to Starloom.':'Logged in as '+nice+'.')}};
}
view.addEventListener('click',e=>{
  const m=e.target.closest('[data-mode]');if(m){mode=m.dataset.mode;history.replaceState(null,'','#'+(mode==='forgot'?'login':mode));render();return}
  const eye=e.target.closest('[data-eye]');if(eye){const i=document.getElementById(eye.dataset.eye),show=i.type==='password';i.type=show?'text':'password';eye.innerHTML=show?ico.eyeOff:ico.eye;eye.setAttribute('aria-label',show?'Hide password':'Show password');i.focus();return}
  const so=e.target.closest('[data-social]');if(so){so.innerHTML='<span class="spin" style="display:block;border-color:rgba(238,240,255,.2);border-top-color:#EEF0FF"></span>Connecting';setTimeout(()=>success(so.dataset.social.toLowerCase()+'user@example.com'),1000)}
});
let lastFocus=null;
let authPrev='',pendingReason='';
function openAuth(m,r){
  if(authOpen){mode=m;render();return}
  mode=m;reason=r||'';lastFocus=document.activeElement;authOpen=true;
  render();auth.classList.add('open');auth.setAttribute('aria-hidden','false');document.body.classList.add('auth-on');
  if(!companyOpen&&window.__camHome)window.__camHome();
}
function closeAuthUI(){
  if(!authOpen)return;authOpen=false;auth.classList.remove('open');auth.setAttribute('aria-hidden','true');document.body.classList.remove('auth-on');
  if(!companyOpen&&window.__camBack)window.__camBack();
  if(lastFocus)lastFocus.focus({preventScroll:true});
}
function closeAuth(){history.replaceState(null,'',authPrev?'#'+authPrev:location.pathname+location.search);authPrev='';route()}
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href="#login"],a[href="#signup"]');if(!a||auth.contains(a))return;
  const h=location.hash.slice(1);if(h!=='login'&&h!=='signup')authPrev=h;pendingReason=a.dataset.reason||'';
},true);
document.getElementById('authClose').onclick=closeAuth;document.getElementById('authLogo').onclick=e=>{e.preventDefault();closeAuth();scrollTo({top:0})};
document.addEventListener('keydown',e=>{
  if(!authOpen)return;
  if(e.key==='Escape'){e.stopImmediatePropagation();closeAuth();return}
  if(e.key==='Tab'){const f=[...auth.querySelectorAll('button,input,a[href]')].filter(x=>x.offsetParent);const a=f[0],z=f[f.length-1];
    if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
});



/* ================= COMPANY PAGE + WRITE REVIEW ================= */
let companyOpen=false,writeOpen=false,user='';
function setUser(n){user=n;document.querySelectorAll('[data-login]').forEach(el=>{el.textContent=n;el.removeAttribute('href');el.setAttribute('role','button');el.dataset.toast='Logged in as '+n+'.'})}
const CO={
 'northwind-couriers':{name:'Northwind Couriers',cat:'Couriers',col:'#2B3BFF',site:'northwind.example',total:12408,dist:[74,15,5,2,4],since:2019,rr:'94%',rt:'within 24 hours',about:'Same-day and next-day parcel delivery across 40 cities, with hour-by-hour tracking and a call before every drop.'},
 'lumen-dental':{name:'Lumen Dental',cat:'Dentists',col:'#0FA37F',site:'lumendental.example',total:2186,dist:[58,24,9,5,4],since:2021,rr:'88%',rt:'within 2 days',about:'Family and cosmetic dentistry with evening and weekend appointments.'},
 'parcel-and-pine':{name:'Parcel & Pine',cat:'Online stores',col:'#C2410C',site:'parcelandpine.example',total:5932,dist:[79,13,4,2,2],since:2020,rr:'97%',rt:'within 12 hours',about:'Solid-wood furniture made to order and delivered flat-packed with tools included.'},
 'orbit-telecom':{name:'Orbit Telecom',cat:'Mobile networks',col:'#9333EA',site:'orbittelecom.example',total:31277,dist:[14,10,12,22,42],since:2018,rr:'61%',rt:'within 5 days',about:'Prepaid and postpaid mobile plans, home broadband and 5G in major cities.'},
 'halo-travel':{name:'Halo Travel',cat:'Travel agents',col:'#DB2777',site:'halotravel.example',total:3410,dist:[55,23,10,6,6],since:2022,rr:'90%',rt:'within 2 days',about:'Visa files, flights and group tours, with document checks before every submission.'}
};
const T={
 5:[['Exactly what they promised','Everything happened on time and the team kept me updated at every step. I will use them again.'],['Better than I expected','I had low expectations after other companies, but the whole thing was smooth from start to finish.'],['Quick and honest','They told me the real price up front and there were no surprises at the end.'],['Support actually helped','I had one issue and support fixed it in the same conversation. No back and forth.'],['Recommended it to family','Clear communication, polite staff and a fair price. I have already sent my brother to them.']],
 4:[['Good, with one small delay','A good experience overall. It took a day longer than quoted, but they told me in advance.'],['Solid service','They did the job well. The app could be easier to use, which is the only reason for four stars.'],['Happy with the result','Friendly people and a good result. Waiting time on the phone was a bit long.'],['Reliable','Second time using them and both times were fine. Nothing special, nothing wrong.']],
 3:[['A mixed experience','The result was fine but I had to follow up three times to get an update.'],['Average','Not bad, not great. The price was fair but communication needs work.'],['Okay in the end','Got there eventually after a confusing start. Clearer instructions would help.']],
 2:[['Slow to respond','It took a week to hear back and the first answer did not solve the problem.'],['Not as described','What I got was different from what the website described. The refund is still in progress.'],['Too many hidden charges','The final bill had fees I was never told about.']],
 1:[['Would not use again','Nobody showed up on the agreed day and no one called to explain.'],['Support keeps stalling','I have raised the same complaint four times. Each time I am told to wait.'],['Charged twice','I was billed twice and it has been three weeks without a refund.']]
};
const NAMES=['Ayesha K.','Daniel R.','Mehwish A.','Usman T.','Sara J.','Bilal H.','Emma W.','Omar F.','Zainab S.','Liam P.','Hamza N.','Fatima Z.','Noah B.','Iqra M.','Ali R.','Chloe D.','Hassan Q.','Maryam I.','Ethan G.','Sana Y.','Rayan A.','Hira B.'];
const CTRY=['PK','PK','GB','AE','US','CA','SA','PK'];
const REPLY={pos:['Thank you, {f}. We have shared your review with the team who handled your order.','Glad it went smoothly, {f}. See you next time.'],neg:['Sorry about this, {f}. We have messaged you to fix it. Please reply there with your reference number.','{f}, this is not the standard we aim for. Our support lead will call you within 24 hours.']};
const RLBL=['','Bad','Poor','Average','Great','Excellent'];
const RCOL=['','#FF5A6E','#FF8A3D','#E9D9A6','#FFD36B','#FFC53D'];
function rng(seed){let a=0;for(const c of seed)a=(a*31+c.charCodeAt(0))|0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const fmt=d=>d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
function ago(d){const n=Math.round((Date.now()-d)/864e5);return n<1?'Today':n===1?'Yesterday':n<7?n+' days ago':fmt(d)}
const cache={};
function genReviews(slug){
  if(cache[slug])return cache[slug];
  const c=CO[slug],r=rng(slug),out=[];let day=0;
  for(let i=0;i<60;i++){
    let x=r()*100,rating=5;for(let k=0;k<5;k++){x-=c.dist[k];if(x<=0){rating=5-k;break}}
    day+=Math.floor(r()*6)+(i<4?0:1);
    const tp=T[rating][Math.floor(r()*T[rating].length)],nm=NAMES[Math.floor(r()*NAMES.length)];
    const d=new Date(Date.now()-day*864e5),exp=new Date(d-Math.floor(r()*20+1)*864e5);
    const wantReply=rating<=3?r()<.85:r()<.35;
    out.push({id:i,name:nm,ctry:CTRY[Math.floor(r()*CTRY.length)],n:Math.floor(r()*14)+1,rating,title:tp[0],text:tp[1],date:d,exp,helpful:Math.floor(r()*r()*48),verified:r()<.82,
      reply:wantReply&&day>2?{text:REPLY[rating>=4?'pos':'neg'][Math.floor(r()*2)].replace('{f}',nm.split(' ')[0]),date:new Date(Math.min(Date.now(),d.getTime()+864e5*(rating<=2?1:2)))}:null});
  }
  return cache[slug]=out;
}
function scoreOf(list){ // recency-weighted average
  let w=0,s=0;list.forEach((v,i)=>{const k=1/(1+i*.02);w+=k;s+=v.rating*k});return w?s/w:0;
}
const cpage=document.getElementById('cpage'),wr=document.getElementById('wr');
let cur=null,list=[],shown=10,filt={stars:new Set(),sort:'recent',replies:false,q:''},countShown=0,scoreShown=0,homeFocus=null;
const thumb='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10v11H4V10zM7 10l4-7a2.5 2.5 0 012.5 2.5V9h5.2a2 2 0 012 2.3l-1.3 8A2 2 0 0117.4 21H7"/></svg>';
const shareI='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v14"/></svg>';
const avCol=n=>`hsl(${[...n].reduce((a,c)=>a+c.charCodeAt(0),0)*37%360} 55% 42%)`;
const initials=n=>n.replace('.','').split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase();

function openCompany(slug){
  if(companyOpen&&cur===slug)return;
  cur=slug;const c=CO[slug];list=genReviews(slug);shown=10;filt={stars:new Set(),sort:'recent',replies:false,q:''};
  if(!companyOpen)homeFocus=document.activeElement;
  companyOpen=true;
  const sc=scoreOf(list);scoreShown=sc;countShown=c.total;
  cpage.innerHTML=`
  <div class="cbar"><a class="logo" href="#top" aria-label="Starloom home"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#FFC53D" d="${STAR}"/></svg>Starloom</a>
    <div class="nav-r"><a class="pill hide-s" href="#top">All businesses</a>${user?`<span class="pill" role="button" tabindex="0" data-toast="Logged in as ${user}.">${user}</span>`:'<a class="pill" href="#login" data-login>Log in</a>'}<a class="pill solid" href="#company/${slug}/write">Write a review</a></div></div>
  <header class="chero"><div class="wrap">
    <p class="hint"><i></i>Every light above is one review. Point at a review to find its star.</p>
    <div class="chead"><span class="ctile" style="background:${c.col}">${c.name[0]}</span>
      <div><h1>${c.name}</h1><p class="cmeta"><span>${c.cat}</span><a href="#company/${slug}" data-toast="Company websites open in the full product.">${c.site}</a><span class="verified">${tick}Verified company</span></p></div></div>
    <div class="cscore"><div class="bigscore" id="cScore">${sc.toFixed(1)}</div>
      <div><span id="cStars">${stars(Math.round(sc*2)/2)}</span><p><b id="cCount">${c.total.toLocaleString()}</b> reviews, TrustScore out of 5</p></div>
      <div class="cacts"><a class="pill solid big" href="#company/${slug}/write">Write a review</a></div></div>
  </div></header>
  <div class="cbody">
    <aside class="cside">
      <div class="panel"><h2>Filter by rating</h2><div class="dist" id="dist"></div>
        <label class="sel">Sort by<select id="sort"><option value="recent">Most recent</option><option value="high">Highest rated</option><option value="low">Lowest rated</option><option value="helpful">Most helpful</option></select></label>
        <label class="check"><input type="checkbox" id="withReplies">Only reviews with a reply</label></div>
      <div class="panel"><h2>About ${c.name}</h2><p>${c.about}</p>
        <dl><dt>On Starloom since</dt><dd>${c.since}</dd><dt>Replies to negative reviews</dt><dd>${c.rr}</dd><dt>Typical reply time</dt><dd>${c.rt}</dd></dl></div>
    </aside>
    <section class="clist" aria-label="Reviews">
      <div class="clist-top"><div class="rsearch"><label for="rq" style="position:absolute;left:-9999px">Search reviews</label><input id="rq" type="search" placeholder="Search reviews, e.g. refund"></div><p id="rcount" aria-live="polite"></p></div>
      <div id="rlist"></div><button class="pill more" id="more" type="button">Show more reviews</button>
    </section>
  </div>`;
  renderDist();renderList();
  cpage.scrollTop=0;cpage.classList.add('open');cpage.setAttribute('aria-hidden','false');document.body.classList.add('company-on');
  document.title=c.name+' reviews | Starloom';
  window.C3D&&C3D.build(list.map(v=>v.rating),c.col,list.map(v=>v.id));
  window.C3D&&C3D.setMode('company');
  bindCompany();
}
function closeCompany(){
  if(!companyOpen)return;companyOpen=false;cur=null;tetherId=null;
  cpage.classList.remove('open');cpage.setAttribute('aria-hidden','true');document.body.classList.remove('company-on');
  document.title='Starloom — Reviews from people who already bought';
  window.C3D&&C3D.setMode('home');
  if(homeFocus&&homeFocus.focus)homeFocus.focus({preventScroll:true});
}
function renderDist(){
  const n=list.length,cnt=[0,0,0,0,0,0];list.forEach(v=>cnt[v.rating]++);
  document.getElementById('dist').innerHTML=[5,4,3,2,1].map(k=>{const pc=Math.round(cnt[k]/n*100);return `<button type="button" class="dbtn" data-star="${k}" aria-pressed="${filt.stars.has(k)}"><span class="box"></span><span>${k} star${k>1?'s':''}</span><span class="trk"><i style="width:${pc}%;background:${RCOL[k]}"></i></span><span class="pc">${pc}%</span></button>`}).join('');
}
function filtered(){
  let a=list.filter(v=>(!filt.stars.size||filt.stars.has(v.rating))&&(!filt.replies||v.reply)&&(!filt.q||(v.title+' '+v.text).toLowerCase().includes(filt.q)));
  if(filt.sort==='high')a=[...a].sort((x,y)=>y.rating-x.rating||y.date-x.date);
  if(filt.sort==='low')a=[...a].sort((x,y)=>x.rating-y.rating||y.date-x.date);
  if(filt.sort==='helpful')a=[...a].sort((x,y)=>y.helpful-x.helpful);
  return a;
}
function card(v){
  const c=CO[cur];
  return `<article class="crv${v.fresh?' fresh':''}" data-id="${v.id}" tabindex="0" aria-label="${v.rating} star review by ${v.name}">
  <div class="crv-h"><div class="who"><span class="av" style="background:${avCol(v.name)}">${initials(v.name)}</span><div><strong>${v.name}</strong><small>${v.ctry}, ${v.n} review${v.n>1?'s':''}</small></div></div>
  <div class="when">${stars(v.rating)}<div>${ago(v.date)}</div></div></div>
  <h3>${esc(v.title)}</h3><p>${esc(v.text)}</p>
  <p class="exp">Date of experience: ${fmt(v.exp)}${v.verified?` <span class="tag-v">${tick}Verified</span>`:''}</p>
  <div class="acts"><button type="button" class="act" data-help="${v.id}" aria-pressed="${!!v.voted}">${thumb}Helpful<span>${v.helpful||''}</span></button><button type="button" class="act" data-share="${v.id}">${shareI}Share</button></div>
  ${v.reply?`<div class="reply"><strong>Reply from ${c.name}</strong><small>${fmt(v.reply.date)}</small><p>${v.reply.text}</p></div>`:''}
  </article>`;
}
function esc(t){return t.replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]))}
function renderList(){
  const a=filtered(),el=document.getElementById('rlist');
  el.innerHTML=a.length?a.slice(0,shown).map(card).join(''):`<div class="empty panel">No reviews match these filters. <button type="button" class="linkbtn" id="clearF">Clear filters</button></div>`;
  document.getElementById('rcount').textContent=`Showing ${Math.min(shown,a.length)} of ${a.length} recent reviews`;
  document.getElementById('more').style.display=a.length>shown?'':'none';
  list.forEach(v=>v.fresh=false);
  window.C3D&&C3D.dim(filt.stars.size||filt.replies||filt.q?new Set(a.map(v=>v.id)):null);
}
function bindCompany(){
  cpage.querySelector('#dist').addEventListener('click',e=>{const b=e.target.closest('[data-star]');if(!b)return;const k=+b.dataset.star;filt.stars.has(k)?filt.stars.delete(k):filt.stars.add(k);shown=10;renderDist();renderList()});
  cpage.querySelector('#sort').addEventListener('change',e=>{filt.sort=e.target.value;renderList()});
  cpage.querySelector('#withReplies').addEventListener('change',e=>{filt.replies=e.target.checked;shown=10;renderList()});
  let qt;cpage.querySelector('#rq').addEventListener('input',e=>{clearTimeout(qt);qt=setTimeout(()=>{filt.q=e.target.value.trim().toLowerCase();shown=10;renderList()},180)});
  cpage.querySelector('#more').addEventListener('click',()=>{shown+=10;renderList()});
  const rl=cpage.querySelector('#rlist');
  rl.addEventListener('click',e=>{
    if(e.target.id==='clearF'){filt={stars:new Set(),sort:filt.sort,replies:false,q:''};cpage.querySelector('#rq').value='';cpage.querySelector('#withReplies').checked=false;renderDist();renderList();return}
    const h=e.target.closest('[data-help]');
    if(h){const v=list.find(x=>x.id==h.dataset.help);v.voted=!v.voted;v.helpful+=v.voted?1:-1;h.setAttribute('aria-pressed',v.voted);h.querySelector('span').textContent=v.helpful||'';
      if(v.voted&&!reduce)for(let i=0;i<8;i++){const sp=document.createElement('i');sp.className='spark';const a=i/8*Math.PI*2;sp.style.setProperty('--dx',Math.cos(a)*26+'px');sp.style.setProperty('--dy',Math.sin(a)*20+'px');h.appendChild(sp);setTimeout(()=>sp.remove(),750)}
      return}
    const sh=e.target.closest('[data-share]');
    if(sh){const url=location.href.split('#')[0]+'#company/'+cur;(navigator.clipboard?navigator.clipboard.writeText(url):Promise.reject()).then(()=>say('Link copied.'),()=>say('Copy this link: '+url));}
  });
  const on=e=>{const c=e.target.closest('.crv');if(!c)return;tetherId=+c.dataset.id;tetherEl=c;window.C3D&&C3D.highlight(tetherId)};
  const off=e=>{const c=e.target.closest('.crv');if(!c||c.contains(e.relatedTarget))return;tetherId=null;window.C3D&&C3D.highlight(null)};
  rl.addEventListener('mouseover',on);rl.addEventListener('mouseout',off);
  rl.addEventListener('focusin',on);rl.addEventListener('focusout',off);
  cpage.onscroll=()=>{window.C3D&&C3D.scroll(cpage.scrollTop)};
}
/* tether: a live line from the hovered review to its star in the sky */
let tetherId=null,tetherEl=null;
const tpath=document.getElementById('tpath'),tdot=document.getElementById('tdot'),tg=document.getElementById('tg');
const fine=matchMedia('(pointer:fine)').matches;
window.__drawTether=()=>{
  if(tetherId===null||!companyOpen||writeOpen||!fine||!window.C3D){tpath.setAttribute('d','');tdot.setAttribute('r',0);return}
  const p=C3D.screen(tetherId);if(!p){tpath.setAttribute('d','');tdot.setAttribute('r',0);return}
  const r=tetherEl.getBoundingClientRect();
  const ax=p.x<r.left?r.left:p.x>r.right?r.right:r.left+r.width*.5,ay=p.x<r.left||p.x>r.right?r.top+28:r.top;
  const my=Math.min(ay,p.y)-40;
  tpath.setAttribute('d',`M${ax},${ay} C${ax},${my} ${p.x},${my} ${p.x},${p.y}`);
  tg.setAttribute('x1',ax);tg.setAttribute('y1',ay);tg.setAttribute('x2',p.x);tg.setAttribute('y2',p.y);
  tdot.setAttribute('cx',p.x);tdot.setAttribute('cy',p.y);tdot.setAttribute('r',14+Math.sin(performance.now()/200)*3);
};

/* ---------- write review ---------- */
let wrRating=0,wrPrev=null;
const pinI='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5l-8.6 8.6a5.5 5.5 0 01-7.8-7.8l8.6-8.6a3.7 3.7 0 015.2 5.2l-8.6 8.6a1.8 1.8 0 01-2.6-2.6l7.9-7.9"/></svg>';
function openWrite(){
  if(!companyOpen||writeOpen)return;writeOpen=true;wrRating=0;wrPrev=document.activeElement;
  const c=CO[cur],today=new Date().toISOString().slice(0,10);
  wr.innerHTML=`<div class="wr-panel">
    <a class="logo auth-logo" href="#company/${cur}" aria-label="Back to ${c.name}"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#FFC53D" d="${STAR}"/></svg>Starloom</a>
    <a class="auth-close" href="#company/${cur}" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></a>
    <form id="wrForm" novalidate>
      <p class="wr-for"><span style="background:${c.col}">${c.name[0]}</span>Reviewing <b>${c.name}</b></p>
      <h2 id="wrTitle">How was your experience?</h2>
      <div class="picker" id="picker" role="radiogroup" aria-label="Your rating">${[1,2,3,4,5].map(k=>`<button type="button" role="radio" aria-checked="false" aria-label="${k} star${k>1?'s':''}, ${RLBL[k]}" data-k="${k}" tabindex="${k===1?0:-1}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${STAR}"/></svg></button>`).join('')}</div>
      <p class="pick-label" id="pickLabel">Pick a rating</p>
      <div class="field" id="f-rating" style="margin-top:0"><p class="err" id="e-rating"></p></div>
      <div class="field" id="f-rtitle"><label for="rtitle"><span>Give it a title</span></label><div class="ctrl"><input id="rtitle" maxlength="80" placeholder="What stood out?" autocomplete="off"></div><p class="err" id="e-rtitle"></p></div>
      <div class="field" id="f-rtext"><label for="rtext"><span>Your review</span></label><textarea id="rtext" maxlength="2000" placeholder="What happened, what went well and what didn't? Be specific, it helps others decide."></textarea>
        <div class="counter"><span>Minimum 25 characters</span><b id="rcnt">0</b></div><p class="err" id="e-rtext"></p></div>
      <div class="field" id="f-rdate"><label for="rdate"><span>Date of experience</span></label><div class="ctrl"><input id="rdate" type="date" max="${today}"></div><p class="err" id="e-rdate"></p></div>
      <div class="field"><label class="file" id="fileLbl">${pinI}<span id="fileTxt">Attach a receipt or order screenshot (optional). Reviews with proof get the Verified label.</span><input type="file" id="proof" accept="image/*,.pdf" style="position:absolute;left:-9999px"></label></div>
      <label class="check"><input type="checkbox" id="rconfirm"><span>This is my own experience, and I have not been paid or offered anything for this review.</span></label>
      <div class="field" id="f-rconfirm" style="margin-top:4px"><p class="err" id="e-rconfirm"></p></div>
      <button class="submit" type="submit"><span class="spin"></span><span>Post review</span></button>
    </form></div>`;
  wr.classList.remove('launch');wr.classList.add('open');wr.setAttribute('aria-hidden','false');document.body.classList.add('write-on');
  window.C3D&&C3D.setMode('write');window.C3D&&C3D.setRating(0,false);
  bindWrite();setTimeout(()=>wr.querySelector('#picker button').focus({preventScroll:true}),300);
}
function closeWrite(){
  if(!writeOpen)return;writeOpen=false;wr.classList.remove('open');wr.setAttribute('aria-hidden','true');document.body.classList.remove('write-on');
  if(companyOpen&&window.C3D)C3D.setMode('company');
}
function paint(k,preview){
  wr.querySelectorAll('#picker button').forEach(b=>{const n=+b.dataset.k;b.style.setProperty('--pc',RCOL[k]||'#fff');b.classList.toggle(preview?'pv':'on',n<=k);if(!preview)b.classList.remove('pv')});
  const L=wr.querySelector('#pickLabel');L.textContent=k?RLBL[k]:'Pick a rating';L.style.color=k?RCOL[k]:'';
}
function setRating(k){
  wrRating=k;paint(k,false);
  wr.querySelectorAll('#picker button').forEach(b=>{const n=+b.dataset.k;b.setAttribute('aria-checked',n===k);b.tabIndex=n===k?0:-1;b.classList.remove('pop');if(n<=k){void b.offsetWidth;b.style.animationDelay='';b.querySelector('svg').style.animationDelay=(n-1)*45+'ms';b.classList.add('pop')}});
  setErr('rating','');document.getElementById('f-rating').classList.remove('ok');
  window.C3D&&C3D.setRating(k,true);
}
function bindWrite(){
  const pk=wr.querySelector('#picker');
  pk.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b)setRating(+b.dataset.k)});
  pk.addEventListener('mouseover',e=>{const b=e.target.closest('[data-k]');if(!b)return;pk.querySelectorAll('button').forEach(x=>x.classList.remove('pv'));paint(+b.dataset.k,true);window.C3D&&C3D.setRating(+b.dataset.k,false)});
  pk.addEventListener('mouseleave',()=>{pk.querySelectorAll('button').forEach(x=>x.classList.remove('pv'));paint(wrRating,false);window.C3D&&C3D.setRating(wrRating,false)});
  pk.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();const k=Math.min(5,Math.max(1,(wrRating||0)+(e.key==='ArrowRight'||e.key==='ArrowUp'?1:-1)));setRating(k);pk.querySelector(`[data-k="${k}"]`).focus()});
  const tx=wr.querySelector('#rtext'),cn=wr.querySelector('#rcnt');
  tx.addEventListener('input',()=>{const n=tx.value.trim().length;cn.textContent=n;cn.classList.toggle('met',n>=25);if(document.getElementById('f-rtext').classList.contains('bad'))vW('rtext')});
  ['rtitle','rdate'].forEach(id=>wr.querySelector('#'+id).addEventListener('input',()=>{if(document.getElementById('f-'+id).classList.contains('bad'))vW(id)}));
  wr.querySelector('#rconfirm').addEventListener('change',()=>vW('rconfirm'));
  wr.querySelector('#proof').addEventListener('change',e=>{const f=e.target.files[0];const l=wr.querySelector('#fileLbl');l.classList.toggle('has',!!f);wr.querySelector('#fileTxt').textContent=f?f.name+' attached. Your review will show as Verified.':'Attach a receipt or order screenshot (optional).'});
  wr.querySelector('#wrForm').addEventListener('submit',submitReview);
}
function vW(id){
  let m='';const el=document.getElementById(id);
  if(id==='rating'&&!wrRating)m='Choose from 1 to 5 stars.';
  if(id==='rtitle'&&el.value.trim().length<4)m='Add a short title, at least 4 characters.';
  if(id==='rtext'){const n=el.value.trim().length;if(n<25)m=n?`Add ${25-n} more characters so others get the full picture.`:'Write a few lines about what happened.'}
  if(id==='rdate'){if(!el.value)m='Choose the date of your experience.';else if(new Date(el.value)>new Date())m='The date can\'t be in the future.'}
  if(id==='rconfirm'&&!el.checked)m='Confirm this review is your own experience.';
  setErr(id,m);return !m;
}
function submitReview(e){
  e.preventDefault();
  const ok=['rating','rtitle','rtext','rdate','rconfirm'].map(vW);
  if(!ok.every(Boolean)){const f=wr.querySelector('.field.bad');(f.querySelector('input,textarea')||wr.querySelector('#picker button')).focus();return}
  const btn=wr.querySelector('.submit');btn.classList.add('busy');btn.disabled=true;
  const v={id:list.reduce((a,x)=>Math.max(a,x.id),0)+1,name:user?user+(user.includes(' ')?'':' '):'You',ctry:'PK',n:1,rating:wrRating,title:wr.querySelector('#rtitle').value.trim(),text:wr.querySelector('#rtext').value.trim(),date:new Date(),exp:new Date(wr.querySelector('#rdate').value),helpful:0,verified:!!wr.querySelector('#proof').files[0],reply:null,fresh:true};
  v.name=v.name.trim();
  setTimeout(()=>{
    wr.classList.add('launch');
    const done=()=>{
      list.unshift(v);filt={stars:new Set(),sort:'recent',replies:false,q:''};shown=10;
      history.replaceState(null,'','#company/'+cur);closeWrite();
      const rq=cpage.querySelector('#rq');if(rq)rq.value='';const wrp=cpage.querySelector('#withReplies');if(wrp)wrp.checked=false;cpage.querySelector('#sort').value='recent';
      renderDist();renderList();
      const newScore=scoreOf(list),c=CO[cur];c.total++;
      countTo(document.getElementById('cCount'),countShown,c.total,0);countShown=c.total;
      countTo(document.getElementById('cScore'),scoreShown,newScore,1);scoreShown=newScore;
      document.getElementById('cStars').innerHTML=stars(Math.round(newScore*2)/2);
      const top=cpage.querySelector('.clist').getBoundingClientRect().top+cpage.scrollTop-90;
      cpage.scrollTo({top,behavior:reduce?'auto':'smooth'});
      setTimeout(()=>{const el=cpage.querySelector(`.crv[data-id="${v.id}"]`);if(el)el.focus({preventScroll:true})},700);
      say(`Your review is live. It's star number ${c.total.toLocaleString()} for ${c.name}.`);
    };
    window.C3D?C3D.launch(v.rating,v.id).then(done):setTimeout(done,500);
  },650);
}
function countTo(el,a,b,dec){
  if(!el)return;const t0=performance.now(),d=reduce?1:1200;
  const f=now=>{const p=Math.min(1,(now-t0)/d),e=1-Math.pow(1-p,3),x=a+(b-a)*e;el.textContent=dec?x.toFixed(dec):Math.round(x).toLocaleString();if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f);
}
document.addEventListener('keydown',e=>{if(e.key!=='Escape'||authOpen)return;if(writeOpen){history.replaceState(null,'','#company/'+cur);route()}else if(companyOpen){history.replaceState(null,'',location.pathname+location.search);route()}});

/* ---------- router ---------- */
function route(){
  const h=decodeURIComponent(location.hash.slice(1));
  if(h==='login'||h==='signup'){openAuth(h,pendingReason);pendingReason='';return}
  closeAuthUI();
  const m=h.match(/^company\/([a-z0-9-]+)(\/write)?$/);
  if(m&&CO[m[1]]){openCompany(m[1]);m[2]?openWrite():closeWrite()}
  else{closeWrite();closeCompany()}
}
addEventListener('hashchange',route);
setTimeout(route,30);

/* ================= 3D ================= */
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas=document.getElementById('gl');
if(!window.THREE){return}
let renderer;
try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'})}catch(e){return}
const small=innerWidth<760;
renderer.setPixelRatio(Math.min(devicePixelRatio,small?1.5:2));
renderer.setSize(innerWidth,innerHeight);
renderer.outputEncoding=THREE.sRGBEncoding;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.0;

const scene=new THREE.Scene();
const bg=new THREE.Color('#05061A');
scene.background=bg;
scene.fog=new THREE.FogExp2(bg.getHex(),0.028);
const cam=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,0.1,260);
cam.position.set(0,0,12);

/* lights that ride with the camera */
scene.add(new THREE.AmbientLight(0x8088ff,0.35));
const key=new THREE.PointLight(0xfff0d0,2.2,60);scene.add(key);
const rimB=new THREE.PointLight(0x3b55ff,2.4,50);scene.add(rimB);
const rimP=new THREE.PointLight(0xff3d8b,1.8,50);scene.add(rimP);

/* glow sprite texture */
function glowTex(inner,outer){
  const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');
  const r=g.createRadialGradient(128,128,0,128,128,128);
  r.addColorStop(0,inner);r.addColorStop(.35,outer);r.addColorStop(1,'rgba(0,0,0,0)');
  g.fillStyle=r;g.fillRect(0,0,256,256);const t=new THREE.CanvasTexture(c);return t;
}
function glow(inner,outer,size){
  const m=new THREE.SpriteMaterial({map:glowTex(inner,outer),blending:THREE.AdditiveBlending,depthWrite:false,transparent:true});
  const s=new THREE.Sprite(m);s.scale.set(size,size,1);return s;
}

/* star geometry */
function starGeo(outer,inner,depth){
  const sh=new THREE.Shape();
  for(let i=0;i<10;i++){
    const a=Math.PI/2+i*Math.PI/5,r=i%2?inner:outer;
    const x=Math.cos(a)*r,y=Math.sin(a)*r;i?sh.lineTo(x,y):sh.moveTo(x,y);
  }
  sh.closePath();
  const g=new THREE.ExtrudeGeometry(sh,{depth,bevelEnabled:true,bevelThickness:depth*.55,bevelSize:outer*.09,bevelSegments:6,curveSegments:2});
  g.center();g.computeVertexNormals();return g;
}
const SG=starGeo(1,.46,.32);

/* ---- A: hero star ---- */
const heroGroup=new THREE.Group();scene.add(heroGroup);
const goldMat=new THREE.MeshPhysicalMaterial({color:0xff9d12,metalness:.75,roughness:.2,clearcoat:1,clearcoatRoughness:.1,emissive:0x3a1800,emissiveIntensity:.5});
const hero=new THREE.Mesh(SG,goldMat);hero.scale.setScalar(small?1.8:2.4);
heroGroup.add(hero);
const halo=glow('rgba(255,210,120,.55)','rgba(90,70,255,.18)',small?16:22);halo.position.z=-2;heroGroup.add(halo);
/* rainbow ring like a lens halo */
const ringMat=new THREE.MeshBasicMaterial({color:0x8fa0ff,transparent:true,opacity:.12,blending:THREE.AdditiveBlending,depthWrite:false});
const lensRing=new THREE.Mesh(new THREE.RingGeometry(7.2,7.6,96),ringMat);lensRing.position.z=-3;heroGroup.add(lensRing);
heroGroup.position.set(small?0:5.8,small?2.2:1.2,-1);

/* dust */
const dustN=small?700:1500,dp=new Float32Array(dustN*3);
for(let i=0;i<dustN;i++){dp[i*3]=(Math.random()-.5)*60;dp[i*3+1]=(Math.random()-.5)*40;dp[i*3+2]=12-Math.random()*430}
const dg=new THREE.BufferGeometry();dg.setAttribute('position',new THREE.BufferAttribute(dp,3));
scene.add(new THREE.Points(dg,new THREE.PointsMaterial({color:0xcfd6ff,size:.07,transparent:true,opacity:.7,depthWrite:false})));

/* ---- B: cube corridor (z -45 .. -175) ---- */
const B0=-45,B1=-175;
const boxN=small?900:1800;
const boxGeo=new THREE.BoxGeometry(1,1,1);
const boxMat=new THREE.MeshStandardMaterial({color:0x1b1f3a,metalness:.7,roughness:.35});
const boxes=new THREE.InstancedMesh(boxGeo,boxMat,boxN);
const lit=new THREE.InstancedMesh(boxGeo,new THREE.MeshBasicMaterial({toneMapped:false}),small?260:520);
const dm=new THREE.Object3D(),col=new THREE.Color();
function wallPos(w){
  // w: 0 floor,1 ceiling,2 left,3 right ; corridor half-size 6
  const along=(Math.random()-.5)*16,off=6+Math.random()*3.5;
  if(w===0)return[along,-off];if(w===1)return[along,off];if(w===2)return[-off,along];return[off,along];
}
for(let i=0;i<boxN;i++){
  const w=i%4,[x,y]=wallPos(w);
  dm.position.set(x,y,B0-Math.random()*(B0-B1)*-1);
  dm.position.z=B0+(B1-B0)*Math.random();
  const s=.3+Math.random()*1.8;dm.scale.set(s*(.5+Math.random()),s*(.5+Math.random()),s*(.5+Math.random()*2));
  dm.rotation.set(0,0,0);dm.updateMatrix();boxes.setMatrixAt(i,dm.matrix);
}
const litCols=[0x3fbfa6,0xc9d2ff,0x5f8fe0,0xd9566a];
for(let i=0;i<lit.count;i++){
  const [x,y]=wallPos(i%4);
  dm.position.set(x*.93,y*.93,B0+(B1-B0)*Math.random());
  const s=.08+Math.random()*.35;dm.scale.set(s,s,s*(1+Math.random()*4));dm.updateMatrix();lit.setMatrixAt(i,dm.matrix);
  col.setHex(litCols[Math.random()*litCols.length|0]);lit.setColorAt(i,col);
}
scene.add(boxes,lit);
/* floating small stars in corridor */
const shardMat=new THREE.MeshPhysicalMaterial({color:0xdfe6ff,metalness:.3,roughness:.15,clearcoat:1,emissive:0x1a2255,emissiveIntensity:.4});
const shards=[];
for(let i=0;i<(small?10:18);i++){
  const m=new THREE.Mesh(SG,shardMat);m.scale.setScalar(.25+Math.random()*.4);
  m.position.set((Math.random()-.5)*8,(Math.random()-.5)*6,B0-10-Math.random()*110);
  m.userData.s=Math.random()*2+.5;scene.add(m);shards.push(m);
}

/* ---- C: crystal tunnel (z -185 .. -270) ---- */
const C0=-185,C1=-272;
const crystal=new THREE.Group();scene.add(crystal);
const edge=new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1,0));
const cMats=[0xff3d8b,0xff7ab6,0x8f7dff,0xffffff].map(c=>new THREE.LineBasicMaterial({color:c,transparent:true,opacity:.3,blending:THREE.AdditiveBlending,depthWrite:false}));
const rings=[];
for(let z=C0;z>C1;z-=3.2){
  const ring=new THREE.Group();ring.position.z=z;
  const n=small?9:13;
  for(let k=0;k<n;k++){
    const a=k/n*Math.PI*2,r=5.5+Math.random()*1.5;
    const l=new THREE.LineSegments(edge,cMats[Math.random()*cMats.length|0]);
    l.position.set(Math.cos(a)*r,Math.sin(a)*r,0);l.scale.setScalar(.9+Math.random()*1.6);
    l.rotation.set(Math.random()*3,Math.random()*3,0);ring.add(l);
  }
  ring.userData.v=(Math.random()<.5?-1:1)*(.1+Math.random()*.2);
  crystal.add(ring);rings.push(ring);
}
const core=glow('rgba(255,200,230,.6)','rgba(255,61,139,.22)',22);core.position.z=C1-6;scene.add(core);

/* ---- D: blue portal (z -285 .. -345) ---- */
const D0=-285,D1=-348;
const portal=new THREE.Group();scene.add(portal);
const tori=[];
for(let i=0;i<22;i++){
  const t=new THREE.Mesh(new THREE.TorusGeometry(4.6+Math.sin(i*.6)*1.2+i*.08,.03+Math.random()*.12,12,120),
    new THREE.MeshBasicMaterial({color:i%3?0x3a4cff:0xaab4ff,transparent:true,opacity:i%3?.32:.16,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false}));
  t.position.z=D0-i*2.9;t.userData.v=(i%2?1:-1)*(.2+Math.random()*.4);t.scale.y=.85+Math.random()*.3;
  portal.add(t);tori.push(t);
}
const pGlow=glow('rgba(170,180,255,.35)','rgba(43,59,255,.18)',12);pGlow.position.z=D1-4;scene.add(pGlow);

/* ---- E: CTA sticker field (z -360 .. -410) ---- */
const E=-386;
const fieldCols=[0xffc53d,0xff3d8b,0x2b3bff,0x5ef2d0,0xffffff,0xff7a1a];
const floaters=[];
const sphereG=new THREE.SphereGeometry(1,32,24),torusG=new THREE.TorusGeometry(.8,.32,16,40);
for(let i=0;i<(small?22:40);i++){
  const c=fieldCols[i%fieldCols.length];
  const mat=new THREE.MeshPhysicalMaterial({color:c,metalness:.1,roughness:.2,clearcoat:1,emissive:c,emissiveIntensity:.12});
  const g=i%3===0?sphereG:i%3===1?SG:torusG;
  const m=new THREE.Mesh(g,mat);m.scale.setScalar(.35+Math.random()*.55);
  const a=Math.random()*Math.PI*2,r=5+Math.random()*8;
  m.position.set(Math.cos(a)*r*1.3,Math.sin(a)*r*.8,E-2-Math.random()*14);
  m.userData={s:.3+Math.random(),o:Math.random()*6,y:m.position.y};
  scene.add(m);floaters.push(m);
}

/* ---- Starloom explorer: original mascot that flies out of the last scene ---- */
const suit=new THREE.MeshPhysicalMaterial({color:0xf3f5ff,roughness:.42,metalness:.05,clearcoat:.4,clearcoatRoughness:.3});
const joint=new THREE.MeshPhysicalMaterial({color:0x9aa1c8,roughness:.35,metalness:.4});
const visorM=new THREE.MeshPhysicalMaterial({color:0x080b24,metalness:1,roughness:.06,clearcoat:1,emissive:0x1b2a8a,emissiveIntensity:.35});
const bot=new THREE.Group();
function add(g,m,x,y,z,parent){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);(parent||bot).add(o);return o}
const cyl=(a,b,h)=>new THREE.CylinderGeometry(a,b,h,24),sph=r=>new THREE.SphereGeometry(r,32,20);
add(cyl(.74,.64,1.3),suit,0,0,0);
add(sph(.74),suit,0,.62,0).scale.set(1,.55,.92);
add(sph(.64),suit,0,-.66,0).scale.set(1,.5,.9);
add(new THREE.BoxGeometry(1.15,1.25,.55),joint,0,.2,-.72);
const collar=add(new THREE.TorusGeometry(.48,.11,12,40),joint,0,1.02,0);collar.rotation.x=Math.PI/2;
add(sph(.8),suit,0,1.62,0);
add(sph(.62),visorM,0,1.66,.44).scale.set(1,.8,.75);
add(new THREE.BoxGeometry(.5,.14,.06),joint,-.28,.1,.72).rotation.z=.1;
const badge=add(SG,goldMat,.28,.42,.74);badge.scale.setScalar(.17);
function limb(x,y,len,r,glove){
  const root=new THREE.Group();root.position.set(x,y,0);bot.add(root);
  add(sph(r*1.15),joint,0,0,0,root);
  add(cyl(r,r*.92,len),suit,0,-len/2,0,root);
  const low=new THREE.Group();low.position.y=-len;root.add(low);
  add(sph(r*1.05),joint,0,0,0,low);
  add(cyl(r*.92,r*.85,len*.9),suit,0,-len*.45,0,low);
  const end=add(glove?sph(r*1.25):new THREE.BoxGeometry(r*2.3,r*1.3,r*3),joint,0,-len*.95,glove?0:r*.5,low);
  return{root,low,end};
}
const armR=limb(-.98,.55,.72,.22,true),armL=limb(.98,.55,.72,.22,true);
const legR=limb(-.36,-.85,.8,.27,false),legL=limb(.36,-.85,.8,.27,false);
armR.root.rotation.z=-2.5;armR.low.rotation.z=-.4;
armL.root.rotation.z=.55;armL.low.rotation.x=-1.2;
const held=add(SG,goldMat,0,-.95,.25,armL.low);held.scale.setScalar(.34);
legR.root.rotation.set(.25,0,-.12);legR.low.rotation.x=.5;
legL.root.rotation.set(-.15,0,.1);legL.low.rotation.x=.25;
bot.visible=false;scene.add(bot);
const burst=glow('rgba(210,220,255,.6)','rgba(90,110,255,.25)',14);burst.material.opacity=0;scene.add(burst);
const BOT_END=-389;



/* ---- Company constellation: every review is a star ---- */
const CPOS=new THREE.Vector3(0,0,170);
const cons=new THREE.Group();cons.position.copy(CPOS);scene.add(cons);
const starTex=glowTex('rgba(255,255,255,1)','rgba(255,255,255,.22)');
const ringTex=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=3;g.beginPath();g.arc(64,64,52,0,Math.PI*2);g.stroke();return new THREE.CanvasTexture(c)})();
const RC=[0,0xff5a6e,0xff8a3d,0xe9d9a6,0xffd36b,0xffc53d];
let cStars=new Map(),cLines=null,cNeb=null,hiId=null,cScrollT=0,cScroll=0,dimSet=null;
const hiRing=new THREE.Sprite(new THREE.SpriteMaterial({map:ringTex,color:0xffc53d,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));cons.add(hiRing);
const cDust=(()=>{const n=600,a=new Float32Array(n*3);for(let i=0;i<n;i++){a[i*3]=(Math.random()-.5)*90;a[i*3+1]=(Math.random()-.5)*60;a[i*3+2]=(Math.random()-.5)*40}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(a,3));return new THREE.Points(g,new THREE.PointsMaterial({color:0xaab4ff,size:.08,transparent:true,opacity:.6,depthWrite:false}))})();cons.add(cDust);
function slot(i,n){const g=i*2.39996,r=Math.sqrt((i+.6)/(n+1));return new THREE.Vector3(Math.cos(g)*r*26,Math.sin(g)*r*11+2,(Math.random()-.5)*12)}
function makeStar(r,id,p){
  const m=new THREE.SpriteMaterial({map:starTex,color:RC[r],transparent:true,opacity:.95,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false});
  const s=new THREE.Sprite(m);s.position.copy(p);const base=.55+r*.2;s.userData={base,cur:0,ph:Math.random()*6,id,pop:0};s.scale.setScalar(.01);cons.add(s);cStars.set(id,s);return s;
}
function linkNearest(ids){
  const pts=[];const all=[...cStars.values()];
  ids.forEach(id=>{const a=cStars.get(id);all.filter(b=>b!==a).map(b=>[b,a.position.distanceToSquared(b.position)]).sort((x,y)=>x[1]-y[1]).slice(0,2).forEach(([b])=>pts.push(a.position.x,a.position.y,a.position.z,b.position.x,b.position.y,b.position.z))});
  return new Float32Array(pts);
}
function build(ratings,col,ids){
  cStars.forEach(s=>{cons.remove(s);s.material.dispose()});cStars.clear();
  if(cLines){cons.remove(cLines);cLines.geometry.dispose()}
  if(cNeb){cons.remove(cNeb)}
  ratings.forEach((r,i)=>{const s=makeStar(r,ids[i],slot(i,ratings.length));s.userData.delay=i*.025});
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(linkNearest(ids),3));
  cLines=new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0x8f9bff,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));cons.add(cLines);
  const cc=new THREE.Color(col);cNeb=glow(`rgba(${cc.r*255|0},${cc.g*255|0},${cc.b*255|0},.35)`,`rgba(${cc.r*255|0},${cc.g*255|0},${cc.b*255|0},.08)`,70);cNeb.position.set(0,3,-14);cons.add(cNeb);
  cons.userData.born=clock.getElapsedTime();
}
/* rating star that morphs with the chosen score */
const RS=starGeo(1,.46,.32),RB=starGeo(1,.88,.32);
RS.morphAttributes.position=[RB.attributes.position];RS.morphAttributes.normal=[RB.attributes.normal];
const rMat=new THREE.MeshPhysicalMaterial({color:0x6f74a3,metalness:.55,roughness:.2,clearcoat:1,clearcoatRoughness:.1,emissive:0x000000,morphTargets:true,morphNormals:true});
const rStar=new THREE.Mesh(RS,rMat);rStar.morphTargetInfluences=[.55];rStar.scale.setScalar(.001);scene.add(rStar);
const rHome=()=>CPOS.clone().add(small?new THREE.Vector3(0,3.4,16):new THREE.Vector3(7.2,.8,16));
rStar.position.copy(rHome());
const rS={col:new THREE.Color(0x6f74a3),emi:new THREE.Color(0x000000),inf:.55,scale:0,spin:.4,launching:false};
const INF=[.55,1,.72,.45,.18,0],EMI=[0,.25,.25,.2,.3,.4];
const MC=[0x6f74a3,0xd0314a,0xe0662a,0xb9a36a,0xe8901f,0xf58a00];
const fx=[];
function shock(color){
  const m=new THREE.Mesh(new THREE.RingGeometry(1,1.06,72),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));
  m.position.copy(rStar.position);scene.add(m);fx.push({o:m,t0:clock.getElapsedTime(),d:.9,f:(p,o)=>{o.scale.setScalar(1.2+p*6);o.material.opacity=.9*(1-p)}});
}
function sparkle(color,at,n){
  for(let i=0;i<n;i++){
    const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:starTex,color,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
    sp.position.copy(at);sp.scale.setScalar(.35);scene.add(sp);
    const v=new THREE.Vector3((Math.random()-.5),(Math.random()-.5),(Math.random()-.5)).normalize().multiplyScalar(3+Math.random()*4);
    fx.push({o:sp,t0:clock.getElapsedTime(),d:1+Math.random()*.6,f:(p,o)=>{o.position.copy(at).addScaledVector(v,1-Math.pow(1-p,3));o.material.opacity=1-p;o.scale.setScalar(.35*(1-p)+.05)}});
  }
}
let mode3='home',flying=false,focusW=null;
const camPos=cam.position.clone(),lookCur=new THREE.Vector3(0,0,2),dPos=new THREE.Vector3(),dLook=new THREE.Vector3(),tmp=new THREE.Vector3();
const fogC=new THREE.Color('#05061A');let fogD=.022;
window.C3D={
  build,
  setMode(m){if(m===mode3)return;mode3=m;flying=true;if(m==='home')computeTarget()},
  scroll(y){cScrollT=y},
  highlight(id){hiId=id},
  dim(set){dimSet=set},
  setRating(k,burst){
    rS.col.set(MC[k]);rS.emi.set(k?MC[k]:0);rS.emiI=EMI[k];rS.inf=INF[k];rS.scale=k?.95+k*.12:.9;
    if(burst&&k){rS.spin+=reduce?0:14;shock(RC[k]);if(k===5)sparkle(0xffd36b,rStar.position.clone(),28);else if(k>=4)sparkle(RC[k],rStar.position.clone(),10)}
  },
  screen(id){const s=cStars.get(id);if(!s)return null;s.getWorldPosition(tmp);tmp.project(cam);if(tmp.z>1)return null;return{x:(tmp.x+1)/2*innerWidth,y:(1-tmp.y)/2*innerHeight}},
  launch(r,id){
    return new Promise(res=>{
      rS.launching=true;const t0=clock.getElapsedTime(),D=reduce?.01:1.8;
      const from=rStar.position.clone(),s0=rStar.scale.x;
      const local=new THREE.Vector3((Math.random()-.5)*14,5+Math.random()*3,4);
      const to=cons.localToWorld(local.clone());
      const ctrl=from.clone().lerp(to,.5).add(new THREE.Vector3(0,7,5));
      focusW=to.clone();
      shock(RC[r]);
      fx.push({o:rStar,t0,d:D,f:(p,o)=>{
        const e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2,a=1-e;
        o.position.set(a*a*from.x+2*a*e*ctrl.x+e*e*to.x,a*a*from.y+2*a*e*ctrl.y+e*e*to.y,a*a*from.z+2*a*e*ctrl.z+e*e*to.z);
        const k4=Math.pow(p,4);o.scale.setScalar(s0*(1-k4)*(1+Math.sin(p*Math.PI)*.35)+.14*k4);o.rotation.y+=.35;o.rotation.z=e*3;
        if(!reduce&&Math.random()<.9){const tr=new THREE.Sprite(new THREE.SpriteMaterial({map:starTex,color:RC[r],transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false}));const at=o.position.clone().add(new THREE.Vector3((Math.random()-.5)*.4,(Math.random()-.5)*.4,(Math.random()-.5)*.4));tr.position.copy(at);scene.add(tr);const sz=(.6+Math.random()*.6)*(1-k4*.7);fx.push({o:tr,t0:clock.getElapsedTime(),d:.7+Math.random()*.4,f:(q,oo)=>{oo.scale.setScalar(sz*(1-q));oo.material.opacity=.9*(1-q)}})}
      },done:()=>{
        rStar.scale.setScalar(.001);rS.scale=0;
        const s=makeStar(r,id,local);s.userData.pop=1;s.userData.delay=-1;s.userData.born=clock.getElapsedTime();
        const flash=glow('rgba(255,240,200,1)','rgba(255,197,61,.5)',1);flash.position.copy(to);scene.add(flash);
        fx.push({o:flash,t0:clock.getElapsedTime(),d:1.1,f:(p,o)=>{o.scale.setScalar(2+p*18);o.material.opacity=1-p}});
        sparkle(RC[r],to,22);
        const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(linkNearest([id]),3));
        const ln=new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0xffd36b,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));cons.add(ln);
        fx.push({o:ln,t0:clock.getElapsedTime(),d:2.4,f:(p,o)=>{o.material.opacity=p<.3?p/.3*.9:.9-(p-.3)/.7*.62},done:()=>{}});
        hiId=id;setTimeout(()=>{if(hiId===id)hiId=null;focusW=null},2600);
        setTimeout(()=>{rS.launching=false;res()},reduce?0:900);
      }});
    });
  }
};

/* ---- scroll -> camera path ---- */
const stops=[...document.querySelectorAll('[data-z]')].map(el=>({el,z:+el.dataset.z}));
let targetZ=12,camZ=12,prog=0;
const fogStops=[ // z, color, density
  [12,'#05061A',.022],[-40,'#04050f',.03],[-170,'#07040f',.035],[-190,'#0c0412',.034],[-275,'#0a0620',.034],
  [-290,'#070a2e',.032],[-350,'#0a0f40',.03],[-365,'#05061A',.02],[-420,'#05061A',.02]
];
const cA=new THREE.Color(),cB=new THREE.Color();
function fogAt(z){
  for(let i=0;i<fogStops.length-1;i++){
    const a=fogStops[i],b=fogStops[i+1];
    if(z<=a[0]&&z>=b[0]){const t=(a[0]-z)/(a[0]-b[0]);cA.set(a[1]);cB.set(b[1]);cA.lerp(cB,t);return[cA,a[2]+(b[2]-a[2])*t]}
  }
  cA.set('#05061A');return[cA,.02];
}
function computeTarget(){
  const vc=scrollY+innerHeight/2;
  const pts=stops.map(s=>{const r=s.el.getBoundingClientRect();return{y:r.top+scrollY+Math.min(r.height,innerHeight)/2,z:s.z}});
  pts[0].y=innerHeight/2;
  let z=pts[0].z;
  if(vc<=pts[0].y)z=pts[0].z;
  else if(vc>=pts[pts.length-1].y)z=pts[pts.length-1].z;
  else for(let i=0;i<pts.length-1;i++){if(vc>=pts[i].y&&vc<=pts[i+1].y){const t=(vc-pts[i].y)/(pts[i+1].y-pts[i].y);z=pts[i].z+(pts[i+1].z-pts[i].z)*t;break}}
  targetZ=12+z; // hero sits at z=12
  const max=document.documentElement.scrollHeight-innerHeight;prog=max>0?scrollY/max:0;
  document.getElementById('railDot').style.transform='translateY('+(prog*98)+'px)';
}
addEventListener('scroll',()=>{if(!authOpen)computeTarget()},{passive:true});
const heroHome=heroGroup.position.clone();let heroTarget=heroHome.clone();
window.__camHome=()=>{targetZ=12;heroTarget=new THREE.Vector3(small?0:3.2,small?3.2:1.5,1.5)};
window.__camBack=()=>{heroTarget=heroHome.clone();computeTarget()};
addEventListener('resize',()=>{cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);if(!authOpen)computeTarget()});
computeTarget();camZ=targetZ;

let mx=0,my=0,sx=0,sy=0;
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});

const clock=new THREE.Clock();
let running=true;
document.addEventListener('visibilitychange',()=>{running=!document.hidden;if(running)requestAnimationFrame(loop)});
function loop(){
  if(!running)return;
  const t=clock.getElapsedTime(),m=reduce?0:1;
  camZ+=(targetZ-camZ)*(reduce?1:.075);
  sx+=(mx-sx)*.05;sy+=(my-sy)*.05;
  // gentle drift inside tunnels
  const wob=camZ<-40?Math.sin(camZ*.05)*.8:0;
  if(mode3==='home'){
    dPos.set(sx*2.2+wob*m,-sy*1.6+Math.cos(camZ*.04)*.4*m,camZ);dLook.set(sx*.8+wob*.5*m,-sy*.5,camZ-10);
  }else{
    dPos.copy(CPOS).add(tmp.set(sx*3*m,-sy*2*m,34));
    dLook.copy(CPOS);if(focusW)dLook.lerp(focusW,.35);
    else if(hiId!==null&&cStars.get(hiId)){cStars.get(hiId).getWorldPosition(tmp);dLook.lerp(tmp,.08)}
  }
  const kk=reduce?1:(flying?.05:(mode3==='home'?1:.08));
  camPos.lerp(dPos,kk);lookCur.lerp(dLook,kk);
  if(flying&&camPos.distanceTo(dPos)<.4)flying=false;
  cam.position.copy(camPos);cam.lookAt(lookCur);
  if(mode3==='home'&&!flying)cam.rotation.z+=Math.sin(camZ*.02)*.08*m;
  const cp=cam.position;
  key.position.set(cp.x+4,cp.y+5,cp.z+2);rimB.position.set(cp.x-6,cp.y-2,cp.z-6);rimP.position.set(cp.x+6,cp.y-3,cp.z-10);

  // constellation
  if(cStars.size){
    cScroll+=(cScrollT-cScroll)*(reduce?1:.1);
    cons.position.y=CPOS.y+cScroll*.014;cons.rotation.y=Math.sin(t*.05)*.07*m+sx*.08;
    const age=t-(cons.userData.born||0);
    cStars.forEach(s=>{const u=s.userData;
      let tgt=age>(u.delay<0?0:u.delay)?u.base*(1+Math.sin(t*2+u.ph)*.12*m):.01;
      if(dimSet&&!dimSet.has(u.id))tgt*=.35;
      if(hiId===u.id)tgt*=2.4;
      if(u.pop){const pa=t-u.born;tgt*=1+Math.max(0,2.5-pa*2.2)}
      u.cur+=(tgt-u.cur)*(reduce?1:.12);s.scale.setScalar(u.cur);
      s.material.opacity=dimSet&&!dimSet.has(u.id)?.35:.95;
    });
    if(cLines)cLines.material.opacity+=((dimSet?.06:.16)-cLines.material.opacity)*.04;
    const hs=hiId!==null&&cStars.get(hiId);
    hiRing.material.opacity+=((hs?.9:0)-hiRing.material.opacity)*.15;
    if(hs){hiRing.position.copy(hs.position);hiRing.scale.setScalar(2.4+Math.sin(t*4)*.3)}
  }
  // rating star
  if(!rS.launching){
    const showR=mode3==='write';
    rStar.position.lerp(rHome(),.1);
    const ts=showR?rS.scale:0;const cs=rStar.scale.x+(ts-rStar.scale.x)*(reduce?1:.12);rStar.scale.setScalar(Math.max(cs,.001));
    rS.spin+=(0.5-rS.spin)*.04;rStar.rotation.y+=rS.spin*.016*(reduce?0:1);rStar.rotation.x=Math.sin(t*.9)*.2*m;rStar.rotation.z*=.9;
    rStar.position.y+=Math.sin(t*1.3)*.2*m;
  }
  rMat.color.lerp(rS.col,.1);rMat.emissive.lerp(rS.emi,.1);rMat.emissiveIntensity+=((rS.emiI||0)-rMat.emissiveIntensity)*.1;
  rStar.morphTargetInfluences[0]+=(rS.inf-rStar.morphTargetInfluences[0])*(reduce?1:.1);
  for(let i=fx.length-1;i>=0;i--){const f=fx[i],p=Math.min(1,(t-f.t0)/f.d);f.f(p,f.o);if(p>=1){fx.splice(i,1);if(f.done)f.done();else{scene.remove(f.o);if(f.o.parent)f.o.parent.remove(f.o);f.o.material&&f.o.material.dispose()}}}
  window.__drawTether&&window.__drawTether();

  // hero star
  heroGroup.position.lerp(heroTarget,reduce?1:.06);
  hero.rotation.y=t*.5*m+sx*.8;hero.rotation.x=Math.sin(t*.7)*.18*m-sy*.5;
  hero.position.y=Math.sin(t*1.1)*.25*m;
  const heroFade=THREE.MathUtils.clamp((camZ-(-8))/20,0,1);
  halo.material.opacity=.3+.7*heroFade;lensRing.material.opacity=.12*heroFade;

  shards.forEach((s,i)=>{s.rotation.x=t*s.userData.s*m;s.rotation.y=t*.7*m;s.position.y+=Math.sin(t+i)*.004*m});
  rings.forEach(r=>r.rotation.z+=r.userData.v*.01*m);
  core.material.opacity=THREE.MathUtils.clamp(1-(camZ-C0)/-60,.2,1);
  tori.forEach((tr,i)=>{tr.rotation.z+=tr.userData.v*.012*m;tr.rotation.x=Math.sin(t*.4+i)*.12*m});
  floaters.forEach(f=>{const d=f.userData;f.rotation.x=t*d.s*m;f.rotation.y=t*d.s*.8*m;f.position.y=d.y+Math.sin(t*d.s+d.o)*.5*m});

  // mascot emerges as the camera reaches the last scene
  const e=THREE.MathUtils.clamp((-camZ-328)/52,0,1),k=1-Math.pow(1-e,3);
  bot.visible=e>0;
  if(bot.visible){
    const bz=THREE.MathUtils.lerp(-450,BOT_END,k);
    bot.position.set(Math.sin(t*.6)*.25*m+(1-k)*3,-1.1+Math.sin(t*1.2)*.18*m+(1-k)*2,bz);
    bot.scale.setScalar(THREE.MathUtils.lerp(.12,small?.95:1.25,k));
    bot.rotation.set((1-k)*1.4-sy*.25,(1-k)*Math.PI*4+Math.sin(t*.5)*.25*m+sx*.6,(1-k)*.9+Math.sin(t*.8)*.05*m);
    const waving=k>.92?1:0;
    armR.low.rotation.z=-.4+Math.sin(t*6)*.55*waving*m;
    armR.root.rotation.x=Math.sin(t*6+1)*.12*waving*m;
    legR.root.rotation.x=.25+Math.sin(t*1.1)*.12*m;legL.root.rotation.x=-.15-Math.sin(t*1.1)*.12*m;
    held.rotation.y=t*1.5*m;
    burst.position.set(bot.position.x,bot.position.y+.5,bz-1.5);
    burst.material.opacity=Math.sin(Math.min(e*1.6,1)*Math.PI)*.9;
    burst.scale.setScalar(6+k*14);
  }

  if(mode3==='home'&&!flying){const[fc,fd]=fogAt(camZ);fogC.copy(fc);fogD=fd}else if(mode3!=='home'){fogC.set('#060820');fogD=.011}
  scene.fog.color.lerp(fogC,reduce?1:.08);scene.background.copy(scene.fog.color);scene.fog.density+=(fogD-scene.fog.density)*(reduce?1:.08);
  renderer.render(scene,cam);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
})();
