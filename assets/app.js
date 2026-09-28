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
  {c:'Northwind Couriers',t:'Couriers',col:'#2B3BFF',r:5,h:'Parcel arrived a day early',p:'Tracking was accurate to the hour and the rider called before arriving. Packaging was intact.',a:'Ayesha K.',d:'2 days ago'},
  {c:'Lumen Dental',t:'Dentists',col:'#0FA37F',r:4,h:'Painless, but the wait was long',p:'Dr. Imran explained every step. I waited 40 minutes past my slot, which is the only reason for four stars.',a:'Daniel R.',d:'3 days ago'},
  {c:'Parcel & Pine',t:'Online stores',col:'#C2410C',r:5,h:'Exactly like the photos',p:'The side table matched the listing, the wood is solid and assembly took ten minutes.',a:'Mehwish A.',d:'4 days ago'},
  {c:'Orbit Telecom',t:'Mobile networks',col:'#9333EA',r:2,h:'Signal drops every evening',p:'Support was polite and logged a ticket, but three weeks later the evening drops are still there.',a:'Usman T.',d:'5 days ago'},
  {c:'Halo Travel',t:'Travel agents',col:'#DB2777',r:4.5,h:'Visa file handled properly',p:'They caught a missing document before submission, which saved me a second appointment.',a:'Sara J.',d:'6 days ago'}
];
const tick='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
document.getElementById('rvGrid').innerHTML=reviews.map(v=>`
<article class="rv">
  <div class="rv-top"><div class="co"><b style="background:${v.col}">${v.c[0]}</b><div>${v.c}<small>${v.t}</small></div></div>${stars(v.r)}</div>
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
  const hits=reviews.filter(r=>(r.c+' '+r.t).toLowerCase().includes(v.toLowerCase()));
  msg.textContent=hits.length?`${hits.length} match${hits.length>1?'es':''}: ${hits.map(h=>h.c).join(', ')}`:`No businesses match "${v}" in this demo. Try Couriers or Dentists.`;
});

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
function openAuth(m,r){
  mode=m;reason=r||'';lastFocus=document.activeElement;authOpen=true;
  render();auth.classList.add('open');auth.setAttribute('aria-hidden','false');document.body.classList.add('auth-on');
  if(window.__camHome)window.__camHome();
}
function closeAuth(){
  if(!authOpen)return;authOpen=false;auth.classList.remove('open');auth.setAttribute('aria-hidden','true');document.body.classList.remove('auth-on');
  if(location.hash==='#login'||location.hash==='#signup')history.replaceState(null,'',location.pathname+location.search);
  if(window.__camBack)window.__camBack();
  if(lastFocus)lastFocus.focus({preventScroll:true});
}
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href="#login"],a[href="#signup"]');if(!a||auth.contains(a))return;
  e.preventDefault();history.pushState(null,'',a.getAttribute('href'));openAuth(a.getAttribute('href').slice(1),a.dataset.reason);
});
addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(h==='login'||h==='signup')openAuth(h);else closeAuth()});
addEventListener('popstate',()=>{const h=location.hash.slice(1);if(h!=='login'&&h!=='signup')closeAuth()});
document.getElementById('authClose').onclick=closeAuth;document.getElementById('authLogo').onclick=e=>{e.preventDefault();closeAuth();scrollTo({top:0})};
document.addEventListener('keydown',e=>{
  if(!authOpen)return;
  if(e.key==='Escape')closeAuth();
  if(e.key==='Tab'){const f=[...auth.querySelectorAll('button,input,a[href]')].filter(x=>x.offsetParent);const a=f[0],z=f[f.length-1];
    if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
});
if(location.hash==='#login'||location.hash==='#signup')setTimeout(()=>openAuth(location.hash.slice(1)),50);

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
  cam.position.set(sx*2.2+wob*m,-sy*1.6+Math.cos(camZ*.04)*.4*m,camZ);
  cam.lookAt(sx*.8+wob*.5*m,-sy*.5,camZ-10);
  cam.rotation.z+=Math.sin(camZ*.02)*.08*m;

  key.position.set(4,5,camZ+2);rimB.position.set(-6,-2,camZ-6);rimP.position.set(6,-3,camZ-10);

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

  const[fc,fd]=fogAt(camZ);scene.fog.color.copy(fc);scene.background.copy(fc);scene.fog.density=fd;
  renderer.render(scene,cam);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
})();
