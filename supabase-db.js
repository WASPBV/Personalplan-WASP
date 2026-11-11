/* Personalplan WASP – Speicherung in Supabase (EU) mit Login */
(function(){
const CFG=window.PP_SUPABASE||{};const ON=!!(CFG.url&&CFG.anonKey);
const SDK=['https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js','https://unpkg.com/@supabase/supabase-js@2.45.4/dist/umd/supabase.js'];
const T='pp_docs';let sb=null;const cache={},docL={},colL={};
const load=()=>new Promise((res,rej)=>{if(window.supabase&&window.supabase.createClient)return res();const t=i=>{if(i>=SDK.length)return rej(new Error('Supabase konnte nicht geladen werden (Internet/Firewall?)'));const s=document.createElement('script');s.src=SDK[i];s.onload=()=>res();s.onerror=()=>t(i+1);document.head.appendChild(s)};t(0)});
function box(html){let o=document.getElementById('sbov');if(!o){o=document.createElement('div');o.id='sbov';o.style.cssText='position:fixed;inset:0;z-index:999;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;font:15px system-ui,Segoe UI,sans-serif;padding:16px';document.body.appendChild(o)}
  o.innerHTML=`<div style="background:#fff;color:#111;border-radius:14px;padding:22px 24px;width:100%;max-width:380px;box-shadow:0 10px 40px rgba(0,0,0,.3)">${html}</div>`;return o}
const inp='width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #cbd5e1;border-radius:9px;font-size:15px;margin:4px 0 10px';
const btn='width:100%;background:#2563eb;color:#fff;border:0;border-radius:9px;padding:11px;font-size:15px;font-weight:700;cursor:pointer';
function loginForm(){return new Promise(resolve=>{const o=box(`<div style="font-size:18px;font-weight:700;margin-bottom:4px">WASP Personalplan</div><div style="color:#64748b;font-size:13px;margin-bottom:14px">Bitte anmelden</div>
  <label style="font-size:13px">E-Mail<input id="sbe" type="email" autocomplete="username" style="${inp}"></label><label style="font-size:13px">Passwort<input id="sbp" type="password" autocomplete="current-password" style="${inp}"></label>
  <div id="sbm" style="color:#dc2626;font-size:13px;min-height:18px"></div><button id="sbgo" style="${btn}">Anmelden</button>
  <div style="display:flex;justify-content:space-between;gap:8px;margin-top:12px;font-size:12px"><a href="#" id="sbfg" style="color:#2563eb">Passwort vergessen?</a><a href="#" id="sbloc" style="color:#64748b;text-align:right">ohne Anmeldung (nur dieser Browser)</a></div>`);
  const m=o.querySelector('#sbm'),go=async()=>{const email=o.querySelector('#sbe').value.trim(),password=o.querySelector('#sbp').value;if(!email||!password){m.textContent='E-Mail und Passwort eingeben.';return}
    m.style.color='#64748b';m.textContent='Anmelden …';const {error}=await sb.auth.signInWithPassword({email,password});
    if(error){m.style.color='#dc2626';m.textContent=/invalid/i.test(error.message)?'E-Mail oder Passwort falsch.':'Anmeldung fehlgeschlagen: '+error.message;return}o.remove();resolve(true)};
  o.querySelector('#sbgo').onclick=go;o.querySelector('#sbp').onkeydown=e=>{if(e.key==='Enter')go()};
  o.querySelector('#sbfg').onclick=async e=>{e.preventDefault();const email=o.querySelector('#sbe').value.trim();if(!email){m.style.color='#dc2626';m.textContent='Zuerst E-Mail eingeben.';return}
    const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});m.style.color=error?'#dc2626':'#16a34a';m.textContent=error?'Senden nicht möglich: '+error.message:'E-Mail zum Zurücksetzen wurde gesendet.'};
  o.querySelector('#sbloc').onclick=e=>{e.preventDefault();o.remove();resolve(false)}})}
function newPwForm(){return new Promise(resolve=>{const o=box(`<div style="font-size:18px;font-weight:700;margin-bottom:10px">Neues Passwort festlegen</div><input id="sbn" type="password" placeholder="Neues Passwort (mind. 8 Zeichen)" style="${inp}"><div id="sbm2" style="color:#dc2626;font-size:13px;min-height:18px"></div><button id="sbsv" style="${btn}">Speichern</button>`);
  o.querySelector('#sbsv').onclick=async()=>{const pw=o.querySelector('#sbn').value;if(pw.length<8){o.querySelector('#sbm2').textContent='Mindestens 8 Zeichen.';return}const {error}=await sb.auth.updateUser({password:pw});if(error){o.querySelector('#sbm2').textContent=error.message;return}o.remove();resolve()}})}
const snap=(p,d)=>({exists:d!==undefined,id:p.split('/').pop(),data:()=>d===undefined?undefined:JSON.parse(JSON.stringify(d)),metadata:{hasPendingWrites:false}});
const colSnap=(n,rem)=>{const c=cache[n]||{},docs=Object.keys(c).map(k=>snap(n+'/'+k,c[k]));return {docs,size:docs.length,docChanges:()=>rem||[],metadata:{hasPendingWrites:false}}};
const fireDoc=p=>(docL[p]||[]).forEach(f=>{try{f(snap(p,(cache[p.split('/')[0]]||{})[p.split('/')[1]]))}catch(e){}});
const fireCol=(n,rem)=>(colL[n]||[]).forEach(f=>{try{f(colSnap(n,rem))}catch(e){}});
async function loadCol(n){const {data,error}=await sb.from(T).select('path,data').eq('coll',n);if(error)throw error;const prev=cache[n]||{},c={};(data||[]).forEach(r=>{c[r.path.split('/')[1]]=r.data});cache[n]=c;
  return Object.keys(prev).filter(k=>!(k in c)).map(k=>({type:'removed',doc:snap(n+'/'+k,prev[k])}))}
async function refreshAll(){for(const n of Object.keys(colL).concat(Object.keys(docL).map(p=>p.split('/')[0]))){try{const rem=await loadCol(n);fireCol(n,rem);Object.keys(docL).filter(p=>p.startsWith(n+'/')).forEach(fireDoc)}catch(e){}}}
function realtime(){sb.channel('pp-live').on('postgres_changes',{event:'*',schema:'public',table:T},pl=>{const r=pl.new&&pl.new.path?pl.new:pl.old;if(!r||!r.path)return;const [n,k]=r.path.split('/');cache[n]=cache[n]||{};let rem=[];
    if(pl.eventType==='DELETE'){if(k in cache[n])rem=[{type:'removed',doc:snap(r.path,cache[n][k])}];delete cache[n][k]}else cache[n][k]=pl.new.data;fireCol(n,rem);fireDoc(r.path)}).subscribe();
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshAll()});setInterval(refreshAll,120000)}
const DB={doc:p=>{const [n,k]=p.split('/');return {
    get:async()=>{const {data,error}=await sb.from(T).select('data').eq('path',p).maybeSingle();if(error)throw error;if(data){(cache[n]=cache[n]||{})[k]=data.data}return snap(p,data?data.data:undefined)},
    set:async d=>{(cache[n]=cache[n]||{})[k]=d;const {error}=await sb.from(T).upsert({path:p,coll:n,data:d,updated_at:new Date().toISOString()});if(error)throw error},
    update:async d=>{const v={...((cache[n]||{})[k]||{}),...d};return DB.doc(p).set(v)},
    delete:async()=>{if(cache[n])delete cache[n][k];const {error}=await sb.from(T).delete().eq('path',p);if(error)throw error},
    onSnapshot:(f,err)=>{(docL[p]=docL[p]||[]).push(f);return()=>{}}}},
  collection:n=>({get:async()=>{await loadCol(n);return colSnap(n)},onSnapshot:(f,err)=>{(colL[n]=colL[n]||[]).push(f);return()=>{}}})};
async function init(){
  await load();sb=window.supabase.createClient(CFG.url,CFG.anonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  let recovery=/type=recovery/.test(location.hash);
  sb.auth.onAuthStateChange(ev=>{if(ev==='PASSWORD_RECOVERY')recovery=true});
  let {data:{session}}=await sb.auth.getSession();
  if(recovery&&session){await newPwForm();history.replaceState(null,'',location.pathname)}
  if(!session){const ok=await loginForm();if(!ok)throw new Error('nicht angemeldet');session=(await sb.auth.getSession()).data.session}
  const email=session.user.email;
  const {data:ok,error}=await sb.from('pp_users').select('email').limit(1);
  if(error||!ok||!ok.length){await sb.auth.signOut();box(`<b>Kein Zugriff</b><div style="margin:10px 0;color:#475569">${email} ist nicht freigeschaltet. Bitte beim Administrator des Personalplans melden.</div><button onclick="this.closest('#sbov').remove()" style="padding:8px 14px;border-radius:8px;border:1px solid #cbd5e1;background:#fff">OK</button>`);throw new Error('kein Zugriff')}
  window.__ppUser=email;window.ppLogout=async()=>{await sb.auth.signOut();try{localStorage.removeItem('pp6')}catch(e){}location.reload()};
  realtime();return DB}
window.__sbDB={on:ON,DB,cache};
const prev=window.claude;
window.claude={use:async n=>{if(n==='db'){if(!ON)throw new Error('Supabase nicht eingerichtet');try{return await init()}catch(e){if(!/nicht angemeldet|kein Zugriff/.test(e.message||''))box(`<b>Verbindung fehlgeschlagen</b><div style="margin:10px 0;color:#475569">${String(e.message||e)}</div><div style="font-size:13px;color:#64748b">Die App arbeitet jetzt nur in diesem Browser.</div><button onclick="this.closest('#sbov').remove()" style="margin-top:10px;padding:8px 14px;border-radius:8px;border:1px solid #cbd5e1;background:#fff">OK</button>`);throw e}}
  if(prev&&prev.use)return prev.use(n);throw new Error('nicht verfügbar: '+n)}};
})();
