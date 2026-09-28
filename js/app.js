/* Crystal Maciel — Luxury Nails app */

/* ================= UTILITIES ================= */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=> 'id'+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const pad=n=>String(n).padStart(2,'0');
const ymd=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const parseYMD=s=>{const[a,b,c]=s.split('-').map(Number);return new Date(a,b-1,c);};
function cyrb53(str,seed=0){let h1=0xdeadbeef^seed,h2=0x41c6ce57^seed;for(let i=0;i<str.length;i++){const ch=str.charCodeAt(i);h1=Math.imul(h1^ch,2654435761);h2=Math.imul(h2^ch,1597334677);}h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return (4294967296*(2097151&h2)+(h1>>>0)).toString(16);}
async function sha256hex(str){try{const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(str));return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');}catch(e){return 'fb'+cyrb53(str,7);}}

/* ================= I18N ================= */
const I18N={
en:{
pre_tag:"Luxury Nails",nav_services:"Services",nav_gallery:"Gallery",nav_about:"About",nav_reviews:"Reviews",nav_contact:"Contact",nav_book:"Book Now",nav_book2:"Book Appointment",
hero_kicker:"San Fernando · Luxury Nail Atelier",hero_t1:"Nails as",hero_t2:"art.",hero_t3:"Luxury in",hero_t4:"every detail.",
hero_sub:"Crystal Maciel crafts couture manicures — from glass-perfect Russian technique to hand-painted couture art — in an intimate private studio.",
hero_cta1:"Book Appointment",hero_cta2:"Explore Services",hs1:"Years of artistry",hs2:"Sets perfected",hs3:"Client rating",
hero_quote:"“The most meticulous manicure I've ever had.”",hero_quote_by:"— Sofia R., Client",scroll:"Scroll",
svc_kicker:"The Menu",svc_t1:"Services &",svc_t2:"Pricing",svc_sub:"Every appointment begins with a consultation and ends with cuticle oil, hand massage, and perfection.",
all:"All",book:"Book",min:"min",from:"from",
gal_kicker:"Portfolio",gal_t1:"Recent",gal_t2:"Creations",gal_sub:"A glimpse of the artistry leaving the studio. Tap any piece to view it up close.",
about_badge:"Years of artistry",about_kicker:"Meet the Artist",about_t1:"Hi, I'm",about_t2:"Crystal.",
about_p1:"For nearly a decade I've treated nails as tiny canvases — blending European precision techniques with bold, modern artistry. My private San Fernando studio is designed as a retreat: one client at a time, unhurried, and entirely about you.",
about_p2:"I specialize in Russian e-file manicures, Gel-X extensions, and hand-painted couture nail art. Every set is customized to your hands, your style, and your life.",
about_role:"Founder & Master Nail Artist",
tst_kicker:"Love Notes",tst_t1:"What clients",tst_t2:"say",
bk_kicker:"Reserve Your Chair",bk_t1:"Book your",bk_t2:"appointment",bk_sub:"Choose a service, pick a day and time — you're confirmed in under a minute.",
bs1:"Service",bs2:"Date",bs3:"Time",bs4:"Details",
bk_review:"Review your appointment",bk_f_svc:"Service",bk_f_date:"Date",bk_f_time:"Time",bk_f_price:"Price",
bk_name:"Full name",bk_name_ph:"Jane Doe",bk_phone:"Phone",bk_phone_ph:"(747) 000-0000",bk_notes:"Notes",bk_notes_ph:"Inspo, allergies, special requests…",
bk_done_t1:"You're",bk_done_t2:"booked.",bk_done_p:"Your chair is reserved. Crystal will confirm shortly by text — please arrive 5 minutes early.",
bk_again:"Book another appointment",bk_back:"Back",bk_next:"Continue",bk_confirm:"Confirm Booking",
bk_note:"Free cancellation up to 24h before · A confirmation text will be sent to your phone",
bk_pick_svc:"Select a service to continue",bk_pick_date:"Select a date to continue",bk_pick_time:"Select a time to continue",
bk_need_name:"Please enter your name",bk_need_phone:"Please enter a valid phone number",
bk_no_slots:"No open slots that day — please try another date.",
ct_kicker:"Visit the Studio",ct_t1:"Find",ct_t2:"us",ct_addr_h:"Studio Address",ct_phone_h:"Call or Text",ct_hours_h:"Studio Hours",
ct_why_h:"The Experience",ct_why_p:"One client at a time. Hospital-grade sterilization. Premium products only — no rushed chairs, ever.",
ct_directions:"Get Directions",closed:"Closed",
f_tag:"Couture nails, crafted one client at a time in the heart of San Fernando.",f_explore:"Explore",f_contact:"Contact",f_hours:"Hours",f_rights:"All rights reserved.",f_admin:"Admin",
chat_name:"Crystal's Concierge",chat_online:"Online now",chat_ph:"Ask about services, prices, hours…",
chat_hi:"Hi, I'm Crystal's concierge. Ask me about services, prices, hours, or booking — I can help in English or español.",
chat_fallback:"I want to make sure I get that right — try asking about services, prices, hours, location, or booking. Or tap a topic below.",
chat_topics:["Services & prices","Hours","Book appointment","Location"],
months:["January","February","March","April","May","June","July","August","September","October","November","December"],
dows:["Su","Mo","Tu","We","Th","Fr","Sa"],
toast_lang:"Language switched to English",toast_booked:"Appointment confirmed — see you soon!",
toast_saved:"Saved",toast_deleted:"Deleted",toast_login_bad:"Incorrect password — try again",toast_login_ok:"Welcome back, Crystal",
toast_pass_changed:"Password updated",toast_pass_mismatch:"Passwords don't match",toast_reset:"Demo data reset",
ad_login_t:"Studio Admin",ad_login_p:"Enter your password to manage the site. Demo build — credentials stay in this browser.",
ad_pass:"Password",ad_signin:"Sign In",ad_back_site:"← Back to site",ad_dash:"Admin Dashboard",
ad_view_site:"View site",ad_logout:"Log out",ad_t_dash:"Dashboard",ad_t_book:"Bookings",ad_t_svc:"Services",
ad_t_gal:"Gallery",ad_t_tst:"Reviews",ad_t_content:"Content",ad_t_set:"Settings",
mq:["Gel-X Extensions","Russian Manicure","Couture Nail Art","Acrylic Sculpting","Luxe Pedicure","Chrome & Cat-Eye"],
},
es:{
pre_tag:"Uñas de Lujo",nav_services:"Servicios",nav_gallery:"Galería",nav_about:"Nosotros",nav_reviews:"Reseñas",nav_contact:"Contacto",nav_book:"Reservar",nav_book2:"Reservar Cita",
hero_kicker:"San Fernando · Atelier de Uñas de Lujo",hero_t1:"Uñas como",hero_t2:"arte.",hero_t3:"Lujo en",hero_t4:"cada detalle.",
hero_sub:"Crystal Maciel crea manicuras de alta costura — desde la impecable técnica rusa hasta arte pintado a mano — en un íntimo estudio privado.",
hero_cta1:"Reservar Cita",hero_cta2:"Ver Servicios",hs1:"Años de arte",hs2:"Sets perfeccionados",hs3:"Calificación",
hero_quote:"“La manicura más meticulosa que he tenido.”",hero_quote_by:"— Sofia R., Clienta",scroll:"Desliza",
svc_kicker:"El Menú",svc_t1:"Servicios y",svc_t2:"Precios",svc_sub:"Cada cita comienza con una consulta y termina con aceite de cutícula, masaje de manos y perfección.",
all:"Todos",book:"Reservar",min:"min",from:"desde",
gal_kicker:"Portafolio",gal_t1:"Creaciones",gal_t2:"recientes",gal_sub:"Una muestra del arte que sale del estudio. Toca cualquier pieza para verla de cerca.",
about_badge:"Años de arte",about_kicker:"Conoce a la Artista",about_t1:"Hola, soy",about_t2:"Crystal.",
about_p1:"Durante casi una década he tratado las uñas como pequeños lienzos — combinando técnicas europeas de precisión con un arte moderno y audaz. Mi estudio privado en San Fernando está diseñado como un refugio: una clienta a la vez, sin prisa y todo sobre ti.",
about_p2:"Me especializo en manicura rusa con torno, extensiones Gel-X y arte de uñas de alta costura pintado a mano. Cada set se personaliza según tus manos, tu estilo y tu vida.",
about_role:"Fundadora y Maestra en Uñas",
tst_kicker:"Notas de Amor",tst_t1:"Lo que dicen",tst_t2:"las clientas",
bk_kicker:"Reserva Tu Silla",bk_t1:"Reserva tu",bk_t2:"cita",bk_sub:"Elige un servicio, escoge día y hora — confirmas en menos de un minuto.",
bs1:"Servicio",bs2:"Fecha",bs3:"Hora",bs4:"Datos",
bk_review:"Revisa tu cita",bk_f_svc:"Servicio",bk_f_date:"Fecha",bk_f_time:"Hora",bk_f_price:"Precio",
bk_name:"Nombre completo",bk_name_ph:"María García",bk_phone:"Teléfono",bk_phone_ph:"(747) 000-0000",bk_notes:"Notas",bk_notes_ph:"Inspiración, alergias, peticiones…",
bk_done_t1:"Cita",bk_done_t2:"confirmada.",bk_done_p:"Tu silla está reservada. Crystal te confirmará por mensaje de texto — por favor llega 5 minutos antes.",
bk_again:"Reservar otra cita",bk_back:"Atrás",bk_next:"Continuar",bk_confirm:"Confirmar Cita",
bk_note:"Cancelación gratis hasta 24h antes · Recibirás un texto de confirmación",
bk_pick_svc:"Selecciona un servicio para continuar",bk_pick_date:"Selecciona una fecha para continuar",bk_pick_time:"Selecciona una hora para continuar",
bk_need_name:"Por favor ingresa tu nombre",bk_need_phone:"Por favor ingresa un teléfono válido",
bk_no_slots:"No hay horarios disponibles ese día — prueba con otra fecha.",
ct_kicker:"Visita el Estudio",ct_t1:"Encuéntra",ct_t2:"nos",ct_addr_h:"Dirección del Estudio",ct_phone_h:"Llama o Envía Mensaje",ct_hours_h:"Horario",
ct_why_h:"La Experiencia",ct_why_p:"Una clienta a la vez. Esterilización de grado hospitalario. Solo productos premium — sin prisas, nunca.",
ct_directions:"Cómo Llegar",closed:"Cerrado",
f_tag:"Uñas de alta costura, creadas una clienta a la vez en el corazón de San Fernando.",f_explore:"Explorar",f_contact:"Contacto",f_hours:"Horario",f_rights:"Todos los derechos reservados.",f_admin:"Admin",
chat_name:"Concierge de Crystal",chat_online:"En línea",chat_ph:"Pregunta por servicios, precios, horario…",
chat_hi:"Hola, soy el concierge de Crystal. Pregúntame por servicios, precios, horario o cómo reservar — hablo English y español.",
chat_fallback:"Quiero asegurarme de darte el dato correcto — pregunta por servicios, precios, horario, ubicación o reservas. O toca un tema abajo.",
chat_topics:["Servicios y precios","Horario","Reservar cita","Ubicación"],
months:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
dows:["Do","Lu","Ma","Mi","Ju","Vi","Sá"],
toast_lang:"Idioma cambiado a español",toast_booked:"Cita confirmada — ¡nos vemos pronto!",
toast_saved:"Guardado",toast_deleted:"Eliminado",toast_login_bad:"Contraseña incorrecta — intenta de nuevo",toast_login_ok:"Bienvenida de nuevo, Crystal",
toast_pass_changed:"Contraseña actualizada",toast_pass_mismatch:"Las contraseñas no coinciden",toast_reset:"Datos de demostración restablecidos",
ad_login_t:"Admin del Estudio",ad_login_p:"Ingresa tu contraseña para gestionar el sitio. Versión demo — las credenciales quedan en este navegador.",
ad_pass:"Contraseña",ad_signin:"Entrar",ad_back_site:"← Volver al sitio",ad_dash:"Panel de Control",
ad_view_site:"Ver sitio",ad_logout:"Cerrar sesión",ad_t_dash:"Resumen",ad_t_book:"Reservas",ad_t_svc:"Servicios",
ad_t_gal:"Galería",ad_t_tst:"Reseñas",ad_t_content:"Contenido",ad_t_set:"Ajustes",
mq:["Extensiones Gel-X","Manicura Rusa","Arte de Uñas Couture","Esculpido Acrílico","Pedicura de Lujo","Cromo y Ojo de Gato"],
}};
let LANG=localStorage.getItem('cmn_lang')||'en';
const t=k=>{const v=I18N[LANG][k];return v!==undefined?v:(I18N.en[k]??k);};

/* ================= STORE ================= */
const K={store:'cmn_store_v1',bookings:'cmn_bookings_v1',analytics:'cmn_analytics_v1',auth:'cmn_auth_v1'};
function seedStore(){return {
content:{
 heroKicker:{en:"San Fernando · Luxury Nail Atelier",es:"San Fernando · Atelier de Uñas de Lujo"},
 heroT1:{en:"Nails as",es:"Uñas como"},heroT2:{en:"art.",es:"arte."},heroT3:{en:"Luxury in",es:"Lujo en"},heroT4:{en:"every detail.",es:"cada detalle."},
 heroSub:{en:I18N.en.hero_sub,es:I18N.es.hero_sub},
 heroCta1:{en:"Book Appointment",es:"Reservar Cita"},heroCta2:{en:"Explore Services",es:"Ver Servicios"},
 aboutKicker:{en:"Meet the Artist",es:"Conoce a la Artista"},aboutT1:{en:"Hi, I'm",es:"Hola, soy"},aboutT2:{en:"Crystal.",es:"Crystal."},
 aboutP1:{en:I18N.en.about_p1,es:I18N.es.about_p1},aboutP2:{en:I18N.en.about_p2,es:I18N.es.about_p2},
 aboutRole:{en:"Founder & Master Nail Artist",es:"Fundadora y Maestra en Uñas"},
 aboutBullets:[
  {en:"Russian e-file technique for glass-smooth cuticles",es:"Técnica rusa con torno para cutículas perfectas"},
  {en:"Premium, hypoallergenic products only",es:"Solo productos premium e hipoalergénicos"},
  {en:"Hand-painted art — no stickers, no shortcuts",es:"Arte pintado a mano — sin calcomanías ni atajos"},
  {en:"Private studio — one client at a time",es:"Estudio privado — una clienta a la vez"}],
 address:"811 San Fernando Rd. Ste. 201, San Fernando, CA 91340",phone:"(747) 214-1272",phoneHref:"tel:+17472141272",
 hours:[
  {d_en:"Tuesday – Saturday",d_es:"Martes – Sábado",t:"10:00 AM – 7:00 PM"},
  {d_en:"Sunday",d_es:"Domingo",t:"11:00 AM – 5:00 PM"},
  {d_en:"Monday",d_es:"Lunes",t:"Closed"}],
 stats:{years:"8",sets:"12k+",rating:"5.0"},
 mapUrl:"https://www.google.com/maps/search/?api=1&query=811+San+Fernando+Rd+Ste+201+San+Fernando+CA+91340",
 footerTag:{en:I18N.en.f_tag,es:I18N.es.f_tag}
},
services:[
 {id:'s1',cat:'Manicure',price:55,priceNote:'',dur:60,name:{en:"Signature Manicure",es:"Manicura Signature"},desc:{en:"Precision shaping, cuticle detailing, massage and your choice of premium polish.",es:"Limado de precisión, detalle de cutícula, masaje y tu esmalte premium favorito."}},
 {id:'s2',cat:'Manicure',price:85,priceNote:'',dur:75,name:{en:"Russian Manicure",es:"Manicura Rusa"},desc:{en:"Dry e-file technique for glass-smooth cuticles and weeks of flawless wear.",es:"Técnica en seco con torno para cutículas perfectas y semanas de acabado impecable."}},
 {id:'s3',cat:'Extensions',price:95,priceNote:'from',dur:90,name:{en:"Gel-X Extensions",es:"Extensiones Gel-X"},desc:{en:"Featherlight full-cover extensions with a natural, salon-perfect finish.",es:"Extensiones ultraligeras de cobertura total con acabado natural perfecto."}},
 {id:'s4',cat:'Extensions',price:90,priceNote:'from',dur:105,name:{en:"Acrylic Full Set",es:"Set Completo Acrílico"},desc:{en:"Sculpted to your ideal length and shape — strong, sharp, everlasting.",es:"Esculpidas a tu largo y forma ideal — fuertes, definidas y duraderas."}},
 {id:'s5',cat:'Extensions',price:110,priceNote:'from',dur:120,name:{en:"Sculpted Hard Gel",es:"Gel Duro Esculpido"},desc:{en:"Crystal-clear hard gel architecture for the most natural long-wear set.",es:"Arquitectura en gel duro para el set más natural y duradero."}},
 {id:'s6',cat:'Pedicure',price:75,priceNote:'',dur:75,name:{en:"Luxe Spa Pedicure",es:"Pedicura Spa de Lujo"},desc:{en:"Soak, exfoliation, callus care, massage and polish in a spa ritual.",es:"Remojo, exfoliación, cuidado de callosidades, masaje y esmaltado en un ritual de spa."}},
 {id:'s7',cat:'Nail Art',price:25,priceNote:'add-on',dur:20,name:{en:"Nail Art — Essential",es:"Arte de Uñas — Esencial"},desc:{en:"Minimal lines, dots, French variations and chrome accents.",es:"Líneas minimalistas, puntos, variaciones de francés y acentos cromados."}},
 {id:'s8',cat:'Nail Art',price:60,priceNote:'add-on',dur:45,name:{en:"Nail Art — Couture",es:"Arte de Uñas — Couture"},desc:{en:"Hand-painted miniature art, 3D elements, encapsulated details.",es:"Miniaturas pintadas a mano, elementos 3D y detalles encapsulados."}},
 {id:'s9',cat:'Care',price:35,priceNote:'',dur:30,name:{en:"Soak-Off & Repair",es:"Retiro y Reparación"},desc:{en:"Gentle, damage-free removal plus nail rehab and strengthening.",es:"Retiro suave sin daño, rehabilitación y fortalecimiento de la uña."}}
],
gallery:[
 {id:'g1',img:'g1',tag:{en:"Ombré",es:"Ombré"},title:{en:"Blush Ombré",es:"Ombré Rubor"}},
 {id:'g2',img:'g2',tag:{en:"Marble",es:"Mármol"},title:{en:"Noir Marble & Gold",es:"Mármol Noir y Oro"}},
 {id:'g3',img:'g3',tag:{en:"Chrome",es:"Cromo"},title:{en:"Rosé Chrome",es:"Cromo Rosé"}},
 {id:'g4',img:'g4',tag:{en:"Foil",es:"Foil"},title:{en:"Emerald & Gold Foil",es:"Esmeralda y Foil Dorado"}},
 {id:'g5',img:'g5',tag:{en:"Classic",es:"Clásico"},title:{en:"Rouge Stiletto",es:"Stiletto Rouge"}},
 {id:'g6',img:'g6',tag:{en:"Minimal",es:"Minimalista"},title:{en:"Milky Gold Line",es:"Línea Dorada Láctea"}}
],
testimonials:[
 {id:'t1',name:"Sofia R.",stars:5,text:{en:"The most meticulous manicure I've ever had. Crystal doesn't rush a single cuticle — my Russian manicure still looked fresh three weeks later.",es:"La manicura más meticulosa que he tenido. Crystal no se apresura con nada — mi manicura rusa se veía fresca tres semanas después."}},
 {id:'t2',name:"Daniela M.",stars:5,text:{en:"I showed her a vague idea and she painted actual art on my nails. I've never gotten so many compliments.",es:"Le mostré una idea vaga y pintó arte de verdad en mis uñas. Nunca había recibido tantos cumplidos."}},
 {id:'t3',name:"Priya K.",stars:5,text:{en:"The studio feels like a private retreat. Calm, spotless, and my Gel-X set is the most natural-looking I've ever worn.",es:"El estudio se siente como un refugio privado. Tranquilo, impecable, y mi set Gel-X es el más natural que he usado."}},
 {id:'t4',name:"Ashley T.",stars:5,text:{en:"Worth every penny. Booking online took a minute and she confirmed by text right away. I'm a client for life.",es:"Vale cada centavo. Reservar en línea tomó un minuto y me confirmó por texto de inmediato. Soy clienta de por vida."}}
],
settings:{chatbot:true,booking:true,gallery:true,testimonials:true}
};}
function loadJSON(k,f){try{const v=localStorage.getItem(k);return v?JSON.parse(v):f;}catch(e){return f;}}
let STORE=loadJSON(K.store,null);
if(!STORE){STORE=seedStore();localStorage.setItem(K.store,JSON.stringify(STORE));}
const saveStore=()=>localStorage.setItem(K.store,JSON.stringify(STORE));
let BOOKINGS=loadJSON(K.bookings,[]);
const saveBookings=()=>localStorage.setItem(K.bookings,JSON.stringify(BOOKINGS));
let ANALYTICS=loadJSON(K.analytics,{visits:0,visitsByDay:{},bookingsTotal:0,bookingsByService:{},chatOpens:0});
const saveAnalytics=()=>localStorage.setItem(K.analytics,JSON.stringify(ANALYTICS));
/* seed demo auth on first run (async) */
(async()=>{if(!localStorage.getItem(K.auth)){const salt=cyrb53('cmn'+Date.now(),3);const hash=await sha256hex(salt+'::crystal2026');localStorage.setItem(K.auth,JSON.stringify({salt,hash}));}})();
async function checkPassword(pw){try{const{salt,hash}=JSON.parse(localStorage.getItem(K.auth));return (await sha256hex(salt+'::'+pw))===hash;}catch(e){return false;}}
async function setPassword(pw){const salt=cyrb53('cmn'+Date.now()+pw,11);const hash=await sha256hex(salt+'::'+pw);localStorage.setItem(K.auth,JSON.stringify({salt,hash}));}
const isAuthed=()=>sessionStorage.getItem('cmn_admin_auth')==='1';
const L2=o=>o?(o[LANG]??o.en):'';


/* ---------------- block ---------------- */

/* ================= LANGUAGE ================= */
function applyLang(){
  LANG=localStorage.getItem('cmn_lang')||'en';
  document.documentElement.lang=LANG;
  $$('[data-i18n]').forEach(el=>{const v=t(el.dataset.i18n);if(typeof v==='string')el.innerHTML=v;});
  $$('[data-i18n-ph]').forEach(el=>el.placeholder=t(el.dataset.i18nPh));
  ['langEn','langEnM'].forEach(id=>{const b=$('#'+id);if(b)b.classList.toggle('on',LANG==='en');});
  ['langEs','langEsM'].forEach(id=>{const b=$('#'+id);if(b)b.classList.toggle('on',LANG==='es');});
  const c=STORE.content;
  $('#hero h1').innerHTML=`${esc(L2(c.heroT1))} <em>${esc(L2(c.heroT2))}</em><br>${esc(L2(c.heroT3))} <em>${esc(L2(c.heroT4))}</em>`;
  applyFeatures(); renderMarquee(); renderServices(); renderGallery(); renderTestimonials(); renderHours(); renderAboutList(); renderBookingServices(); drawCalendar(); drawSlots(); updateSummary();
  if($('#chatPanel').classList.contains('open')&&!chatStarted)startChat();
}
function setLang(l){localStorage.setItem('cmn_lang',l);applyLang();toast(t('toast_lang'));}
['langEn','langEnM'].forEach(id=>$('#'+id).addEventListener('click',()=>setLang('en')));
['langEs','langEsM'].forEach(id=>$('#'+id).addEventListener('click',()=>setLang('es')));

/* ================= FEATURE TOGGLES ================= */
function applyFeatures(){
  const f=STORE.settings;
  $$('[data-feat]').forEach(el=>{const k=el.dataset.feat;el.style.display=(f[k]===false)?'none':'';});
  const bkOn=f.booking!==false;
  const heroCta=$('.hero-cta');
  if(heroCta){const first=heroCta.querySelector('a');if(first){if(bkOn){first.href='#booking';first.innerHTML=esc(L2(STORE.content.heroCta1));}else{first.href=STORE.content.phoneHref;first.innerHTML=esc(STORE.content.phone);}}}
}

/* ================= RENDERERS ================= */
let svcFilter='all';
function renderMarquee(){
  const items=t('mq');const half=items.map(x=>`<span>${esc(x)}<i>✦</i></span>`).join('');
  $('#mqTrack').innerHTML=half+half;
}
function renderServices(){
  const cats=['all',...new Set(STORE.services.map(s=>s.cat))];
  $('#svcFilters').innerHTML=cats.map(c=>`<button class="chip${svcFilter===c?' on':''}" data-cat="${esc(c)}">${c==='all'?t('all'):esc(c)}</button>`).join('');
  $$('#svcFilters .chip').forEach(b=>b.onclick=()=>{svcFilter=b.dataset.cat;renderServices();});
  const list=STORE.services.filter(s=>svcFilter==='all'||s.cat===svcFilter);
  $('#svcGrid').innerHTML=list.map((s,i)=>`
   <article class="svc rv in" style="transition-delay:${(i%2)*0.1}s">
    <span class="svc-cat">${esc(s.cat)}</span>
    <div class="svc-top"><h3>${esc(L2(s.name))}</h3><div class="price">${s.priceNote?`<small>${t('from')} </small>`:''}$${s.price}</div></div>
    <p>${esc(L2(s.desc))}</p>
    <div class="svc-meta">
      <span class="dur"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>${s.dur} ${t('min')}</span>
      ${STORE.settings.booking!==false?`<button class="svc-book" data-book="${s.id}">${t('book')} →</button>`:''}
    </div>
   </article>`).join('')||`<p class="ad-empty">${t('all')}</p>`;
  $$('#svcGrid [data-book]').forEach(b=>b.onclick=()=>{bk.serviceId=b.dataset.book;bkStep(1);renderBookingServices();document.getElementById('booking').scrollIntoView({behavior:'smooth'});});
}
const IMGS={hero:"assets/hero.jpg",about:"assets/about.jpg",g1:"assets/g-ombre.jpg",g2:"assets/g-marble.jpg",g3:"assets/g-rosechome.jpg",g4:"assets/g-emerald.jpg",g5:"assets/g-red.jpg",g6:"assets/g-milky.jpg"};
function gimg(g){return g.imgUrl||IMGS[g.img]||IMGS.g1;}
function renderGallery(){
  $('#galGrid').innerHTML=STORE.gallery.map((g,i)=>`
   <figure class="gal rv in" data-gal="${g.id}" style="transition-delay:${(i%3)*0.1}s">
     <img src="${gimg(g)}" alt="${esc(L2(g.title))}" loading="lazy">
     <span class="gal-frame"></span>
     <figcaption class="gal-cap"><span>${esc(L2(g.tag))}</span><h4>${esc(L2(g.title))}</h4></figcaption>
   </figure>`).join('');
  $$('#galGrid .gal').forEach(el=>el.onclick=()=>{
    const g=STORE.gallery.find(x=>x.id===el.dataset.gal);if(!g)return;
    $('#lbImg').src=gimg(g);$('#lbCap').textContent=L2(g.title);$('#lightbox').classList.add('open');});
}
$('#lbClose').onclick=()=>$('#lightbox').classList.remove('open');
$('#lightbox').onclick=e=>{if(e.target.id==='lightbox')$('#lightbox').classList.remove('open');};
function renderHours(){
  const h=STORE.content.hours;
  $('#ctHours').innerHTML=h.map(r=>{const closed=/closed|cerrado/i.test(r.t);return `<li class="${closed?'closed':''}"><span>${esc(LANG==='es'?r.d_es:r.d_en)}</span><span>${closed?t('closed'):esc(r.t)}</span></li>`;}).join('');
  $('#fHours').innerHTML=h.map(r=>`<li>${esc(LANG==='es'?r.d_es:r.d_en)} · ${/closed|cerrado/i.test(r.t)?t('closed'):esc(r.t)}</li>`).join('');
}
function renderAboutList(){
  $('#aboutList').innerHTML=STORE.content.aboutBullets.map(b=>`<li><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M20 6L9 17l-5-5"/></svg><span>${esc(L2(b))}</span></li>`).join('');
}
/* testimonials carousel */
let tstIdx=0,tstTimer=null;
function renderTestimonials(){
  const arr=STORE.testimonials;
  $('#tstStrip').innerHTML=arr.map(x=>`<div class="tst"><span class="qmark">“</span><blockquote>${esc(L2(x.text))}</blockquote><div class="stars">${'★'.repeat(x.stars||5)}</div><div class="who">${esc(x.name)}</div></div>`).join('');
  $('#tstDots').innerHTML=arr.map((_,i)=>`<button data-i="${i}" aria-label="Review ${i+1}"></button>`).join('');
  tstIdx=0;tstGo(0);
  $$('#tstDots button').forEach(b=>b.onclick=()=>tstGo(+b.dataset.i));
  clearInterval(tstTimer);tstTimer=setInterval(()=>tstGo((tstIdx+1)%arr.length),7000);
}
function tstGo(i){tstIdx=i;$('#tstStrip').style.transform=`translateX(-${i*100}%)`;$$('#tstDots button').forEach((b,j)=>b.classList.toggle('on',j===i));}
$('#tstPrev').onclick=()=>tstGo((tstIdx-1+STORE.testimonials.length)%STORE.testimonials.length);
$('#tstNext').onclick=()=>tstGo((tstIdx+1)%STORE.testimonials.length);

/* ================= BOOKING ================= */
const bk={step:1,serviceId:null,date:null,time:null,calCursor:new Date()};
function hoursFor(date){
  const d=date.getDay();
  if(d===1)return null;
  if(d===0)return {open:11,close:17};
  return {open:10,close:19};
}
function slotsFor(dateStr){
  const h=hoursFor(parseYMD(dateStr));if(!h)return [];
  const out=[];const now=new Date();const today=ymd(now);
  for(let hr=h.open;hr<h.close;hr++){
    const label=(hr%12===0?12:hr%12)+':00 '+(hr<12?'AM':'PM');
    let taken=BOOKINGS.some(b=>b.date===dateStr&&b.time===label&&b.status!=='cancelled');
    if(dateStr===today){const cutoff=new Date();cutoff.setHours(hr,0,0,0);if(cutoff<now)taken=true;}
    out.push({label,taken});
  }
  return out;
}
function renderBookingServices(){
  $('#bkSvcList').innerHTML=STORE.services.map(s=>`
   <div class="bk-svc${bk.serviceId===s.id?' sel':''}" data-svc="${s.id}">
     <div><h4>${esc(L2(s.name))}</h4><small>${s.dur} ${t('min')} · ${esc(s.cat)}</small></div>
     <div class="p">$${s.price}</div>
   </div>`).join('');
  $$('#bkSvcList .bk-svc').forEach(el=>el.onclick=()=>{bk.serviceId=el.dataset.svc;renderBookingServices();});
}
function bkStep(n){
  bk.step=n;
  $$('#bkSteps .bk-step').forEach(s=>{const k=+s.dataset.s;s.classList.toggle('on',k===n);s.classList.toggle('done',k<n);});
  $$('.bk-pane').forEach(p=>p.classList.remove('on'));$('#pane'+n).classList.add('on');
  $('#bkBack').style.visibility=n===1?'hidden':'visible';
  $('#bkNext').innerHTML=n===4?t('bk_confirm'):t('bk_next');
  const done=n===4&&$('#bkDone').style.display!=='none';
  $('#bkFoot').style.display=done?'none':'flex';
  if(n===2)drawCalendar();if(n===3)drawSlots();if(n===4)updateSummary();
}
function drawCalendar(){
  const cur=new Date(bk.calCursor.getFullYear(),bk.calCursor.getMonth(),1);
  const ms=t('months');
  $('#calTitle').textContent=`${ms[cur.getMonth()].charAt(0).toUpperCase()+ms[cur.getMonth()].slice(1)} ${cur.getFullYear()}`;
  const dows=t('dows');
  let html=dows.map(d=>`<div class="cal-dow">${d}</div>`).join('');
  const startDay=cur.getDay();const dim=new Date(cur.getFullYear(),cur.getMonth()+1,0).getDate();
  const today=ymd(new Date());const maxD=new Date();maxD.setDate(maxD.getDate()+60);const maxS=ymd(maxD);
  for(let i=0;i<startDay;i++)html+=`<div></div>`;
  for(let d=1;d<=dim;d++){
    const dt=new Date(cur.getFullYear(),cur.getMonth(),d);const s=ymd(dt);
    const closed=!hoursFor(dt);const dis=closed||s<today||s>maxS;
    html+=`<button class="cal-day${s===bk.date?' sel':''}${s===today?' today':''}" data-d="${s}" ${dis?'disabled':''}>${d}</button>`;
  }
  $('#calGrid').innerHTML=html;
  $$('#calGrid .cal-day:not(:disabled)').forEach(b=>b.onclick=()=>{bk.date=b.dataset.d;bk.time=null;drawCalendar();});
}
$('#calPrev').onclick=()=>{bk.calCursor.setMonth(bk.calCursor.getMonth()-1);drawCalendar();};
$('#calNext').onclick=()=>{bk.calCursor.setMonth(bk.calCursor.getMonth()+1);drawCalendar();};
function drawSlots(){
  if(!bk.date){$('#slotGrid').innerHTML=`<p class="ad-empty">${t('bk_pick_date')}</p>`;return;}
  const slots=slotsFor(bk.date);
  $('#slotGrid').innerHTML=slots.length?slots.map(s=>`<button class="slot${bk.time===s.label?' sel':''}" ${s.taken?'disabled':''}>${s.label}</button>`).join('')
    :`<p class="ad-empty">${t('bk_no_slots')}</p>`;
  $$('#slotGrid .slot:not(:disabled)').forEach(b=>b.onclick=()=>{bk.time=b.textContent;drawSlots();});
}
function fmtDateLong(s){
  const d=parseYMD(s);const ms=t('months');
  if(LANG==='es')return `${d.getDate()} de ${ms[d.getMonth()]} de ${d.getFullYear()}`;
  return `${ms[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
function updateSummary(){
  const s=STORE.services.find(x=>x.id===bk.serviceId);
  $('#sumSvc').textContent=s?L2(s.name):'—';
  $('#sumDate').textContent=bk.date?fmtDateLong(bk.date):'—';
  $('#sumTime').textContent=bk.time||'—';
  $('#sumPrice').textContent=s?('$'+s.price):'—';
}
$('#bkBack').onclick=()=>{if(bk.step>1)bkStep(bk.step-1);};
$('#bkNext').onclick=()=>{
  if(bk.step===1){if(!bk.serviceId)return toast(t('bk_pick_svc'));bkStep(2);}
  else if(bk.step===2){if(!bk.date)return toast(t('bk_pick_date'));bkStep(3);}
  else if(bk.step===3){if(!bk.time)return toast(t('bk_pick_time'));bkStep(4);}
  else confirmBooking();
};
function confirmBooking(){
  const name=$('#bkName').value.trim(),phone=$('#bkPhone').value.trim();
  if(name.length<2)return toast(t('bk_need_name'));
  if(phone.replace(/\D/g,'').length<7)return toast(t('bk_need_phone'));
  const s=STORE.services.find(x=>x.id===bk.serviceId);
  const code='CM-'+Math.random().toString(36).slice(2,6).toUpperCase();
  BOOKINGS.push({id:uid(),code,serviceId:s.id,serviceName:L2(s.name),price:s.price,date:bk.date,time:bk.time,name,phone,notes:$('#bkNotes').value.trim(),status:'pending',createdAt:new Date().toISOString()});
  saveBookings();
  ANALYTICS.bookingsTotal++;ANALYTICS.bookingsByService[s.id]=(ANALYTICS.bookingsByService[s.id]||0)+1;saveAnalytics();
  $('#bkCode').textContent=code;
  $('#bkFormWrap').style.display='none';$('#bkDone').style.display='block';$('#bkFoot').style.display='none';
  toast(t('toast_booked'));
}
$('#bkAgain').onclick=()=>{bk.serviceId=null;bk.date=null;bk.time=null;$('#bkName').value='';$('#bkPhone').value='';$('#bkNotes').value='';
  $('#bkFormWrap').style.display='block';$('#bkDone').style.display='none';$('#bkFoot').style.display='flex';bkStep(1);renderBookingServices();};


/* ---------------- block ---------------- */

/* ================= TOAST & MODAL ================= */
let toastT=null;
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>el.classList.remove('show'),2800);}
function openModal(title,bodyHTML,saveLabel,onSave){
  $('#modalCard').innerHTML=`<h3>${title}</h3><div class="ad-form">${bodyHTML}</div>
   <div class="modal-foot"><button class="btn ghost sm" id="mCancel">${LANG==='es'?'Cancelar':'Cancel'}</button>
   <button class="btn sm" id="mSave">${esc(saveLabel||t('toast_saved'))}</button></div>`;
  $('#modal').classList.add('open');
  $('#mCancel').onclick=closeModal;
  $('#mSave').onclick=()=>{if(onSave()!==false)closeModal();};
}
function closeModal(){$('#modal').classList.remove('open');}
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal();});
const fld=(id,label,val,type='text')=>`<div class="field"><label for="${id}">${label}</label><input id="${id}" type="${type}" value="${esc(val??'')}"></div>`;
const fldTA=(id,label,val)=>`<div class="field"><label for="${id}">${label}</label><textarea id="${id}">${esc(val??'')}</textarea></div>`;
const biField=(base,label,obj,key)=>`<div class="field"><label>${label} — EN</label><input id="${base}_en" value="${esc(obj[key]?.en??'')}"></div><div class="field"><label>${label} — ES</label><input id="${base}_es" value="${esc(obj[key]?.es??'')}"></div>`;
const biTA=(base,label,obj,key)=>`<div class="field"><label>${label} — EN</label><textarea id="${base}_en">${esc(obj[key]?.en??'')}</textarea></div><div class="field"><label>${label} — ES</label><textarea id="${base}_es">${esc(obj[key]?.es??'')}</textarea></div>`;

/* ================= CHATBOT ================= */
let chatStarted=false;
const R=(en,es)=>LANG==='es'?es:en;
function botHours(){return STORE.content.hours.map(r=>`• ${LANG==='es'?r.d_es:r.d_en}: ${/closed|cerrado/i.test(r.t)?t('closed'):r.t}`).join('\n');}
function botServices(){return STORE.services.map(s=>`• ${L2(s.name)} — $${s.price}${s.priceNote?' ('+t('from')+')':''}`).join('\n');}
const INTENTS=[
 {k:['hello','hi','hey','good morning','good evening','hola','buenas','buenos dias','buenas tardes','hey '],a:()=>R("Hello! Great to see you. I can share services & prices, hours, location, or help you book.","¡Hola! Qué bueno verte. Puedo contarte de servicios y precios, horario, ubicación o ayudarte a reservar.")},
 {k:['hour','open','close','schedule','when are you','horario','abierto','abre','cierra','cierran','a que hora'],a:()=>R("We're open:\n"+botHours()+"\nMondays we're closed.", "Nuestro horario:\n"+botHours()+"\nLos lunes cerramos.")},
 {k:['where','address','located','location','direction','map','donde','ubicaci','direcci','llegar','encuentran'],a:()=>R(`You'll find us at ${STORE.content.address}. Tap "Get Directions" in the Contact section and it'll guide you right here.`,"Nos encuentras en "+STORE.content.address+". Toca «Cómo Llegar» en la sección de Contacto y te guiará hasta aquí.")},
 {k:['phone','call','text','number','contact','tel','telefono','llamar','llamada','numero','contacto'],a:()=>R(`Call or text us anytime at ${STORE.content.phone} — we reply fast.`,"Llámanos o escríbenos al "+STORE.content.phone+" — respondemos rápido.")},
 {k:['russian','rusa','rusas'],a:()=>{const s=STORE.services.find(x=>/russian|rusa/i.test(x.name.en));return R(`The Russian manicure ($${s?s.price:85}) uses a dry e-file technique for glass-smooth cuticles and weeks of flawless wear. It's our most requested service.`,"La manicura rusa ($"+(s?s.price:85)+") usa torno en seco para cutículas perfectas y semanas de acabado impecable. Es nuestro servicio más pedido.");}},
 {k:['gel-x','gelx','gel x'],a:()=>{const s=STORE.services.find(x=>/gel-x/i.test(x.name.en));return R(`Gel-X extensions (${t('from')} $${s?s.price:95}) are featherlight full-cover tips with a beautifully natural finish — no harsh drills, no damage.`,"Las extensiones Gel-X ("+t('from')+" $"+(s?s.price:95)+") son tips ultraligeros de cobertura total con un acabado hermoso y natural.");}},
 {k:['acrylic','acrilic'],a:()=>{const s=STORE.services.find(x=>/acrylic/i.test(x.name.en));return R(`Acrylic full sets (${t('from')} $${s?s.price:90}) are sculpted to your ideal length and shape — strong and long-lasting.`,"El set acrílico ("+t('from')+" $"+(s?s.price:90)+") se esculpe a tu largo y forma ideal — fuerte y duradero.");}},
 {k:['pedicure','pedicura','pedia'],a:()=>{const s=STORE.services.find(x=>/pedicure/i.test(x.name.en));return R(`Our Luxe Spa Pedicure ($${s?s.price:75}) is a full ritual: soak, exfoliation, callus care, massage and polish.`,"Nuestra pedicura spa de lujo ($"+(s?s.price:75)+") es un ritual completo: remojo, exfoliación, cuidado de callosidades, masaje y esmaltado.");}},
 {k:['nail art','arte','diseño','diseno','design','dibujo'],a:()=>R("We offer two art tiers: Essential (from $25 — minimal lines, French variations, chrome) and Couture (from $60 — hand-painted miniature art, 3D elements).","Ofrecemos dos niveles: Esencial (desde $25 — líneas minimalistas, francés, cromo) y Couture (desde $60 — miniaturas pintadas a mano, 3D).")},
 {k:['price','cost','much','pricing','menu','precio','cuesta','cuanto','cuánto','costo','tarifa','lista'],a:()=>R("Here's our menu:\n"+botServices()+"\nNail art add-ons start at $25.","Este es nuestro menú:\n"+botServices()+"\nLos diseños adicionales desde $25.")},
 {k:['service','servicio','servicios','manicura','manicure'],a:()=>R("Our specialties: Signature & Russian manicures, Gel-X and acrylic extensions, luxe pedicures, and hand-painted couture nail art. Want the full price list? Just ask for 'prices'.","Nuestras especialidades: manicuras signature y rusa, extensiones Gel-X y acrílicas, pedicura de lujo y arte couture pintado a mano. ¿Quieres la lista de precios? Pide «precios».")},
 {k:['book','appointment','reserve','reservation','slot','available','reservar','cita','reservacion','reservación','apartar','disponible'],a:()=>R("Booking is easy: tap 'Book Appointment' up top, choose your service, pick a day and time, and you're confirmed in under a minute. Anything else I can clarify first?","Reservar es fácil: toca «Reservar Cita» arriba, elige tu servicio, escoge día y hora, y confirmas en menos de un minuto. ¿Algo más que te aclare?")},
 {k:['cancel','reschedule','change my','cancelar','reprogramar','cambiar mi'],a:()=>R("No problem — cancellation is free up to 24 hours before. Just call or text "+STORE.content.phone+" and we'll move it.","Sin problema — la cancelación es gratis hasta 24 horas antes. Llama o escribe al "+STORE.content.phone+" y la movemos.")},
 {k:['who','crystal','about','owner','artist','quien','quién','acerca','dueña','artista'],a:()=>R("Crystal is a master nail artist with 8+ years of experience, known for Russian e-file precision and hand-painted couture art — in a private one-client-at-a-time studio.","Crystal es maestra en uñas con más de 8 años de experiencia, reconocida por la precisión rusa con torno y el arte couture pintado a mano — en un estudio privado, una clienta a la vez.")},
 {k:['thank','gracias','thanks'],a:()=>R("Anytime! It's going to look amazing.","¡Cuando quieras! Va a quedar increíble.")},
 {k:['bye','adios','adiós','chao','nos vemos','see you'],a:()=>R("See you soon — your nails will thank you.","Nos vemos pronto — tus uñas te lo agradecerán.")},
];
function botReply(text){
  const q=' '+text.toLowerCase().trim()+' ';
  for(const it of INTENTS){if(it.k.some(k=>q.includes(k)))return it.a;}
  return null;
}
function addMsg(txt,who){
  const d=document.createElement('div');d.className='msg '+who;d.style.whiteSpace='pre-line';d.textContent=txt;
  $('#chatBody').appendChild(d);$('#chatBody').scrollTop=1e6;return d;
}
function addChips(){
  const c=document.createElement('div');c.className='chips';
  t('chat_topics').forEach(x=>{const b=document.createElement('button');b.textContent=x;b.onclick=()=>sendChat(x);c.appendChild(b);});
  $('#chatBody').appendChild(c);$('#chatBody').scrollTop=1e6;
}
function startChat(){
  chatStarted=true;$('#chatBody').innerHTML='';
  const tp=document.createElement('div');tp.className='msg bot typing';tp.innerHTML='<i></i><i></i><i></i>';
  $('#chatBody').appendChild(tp);
  setTimeout(()=>{tp.remove();addMsg(t('chat_hi'),'bot');addChips();},900);
}
function sendChat(text){
  text=(text??$('#chatText').value).trim();if(!text)return;
  $('#chatText').value='';addMsg(text,'user');
  const tp=document.createElement('div');tp.className='msg bot typing';tp.innerHTML='<i></i><i></i><i></i>';
  setTimeout(()=>$('#chatBody').appendChild(tp),150);
  setTimeout(()=>{tp.remove();const r=botReply(text);addMsg(r?r():t('chat_fallback'),'bot');if(!r)addChips();},900+Math.random()*700);
}
$('#chatSend').onclick=()=>sendChat();
$('#chatText').addEventListener('keydown',e=>{if(e.key==='Enter')sendChat();});
$('#chatFab').onclick=()=>{
  const p=$('#chatPanel');const willOpen=!p.classList.contains('open');p.classList.toggle('open');
  if(willOpen){ANALYTICS.chatOpens++;saveAnalytics();if(!chatStarted)startChat();setTimeout(()=>$('#chatText').focus(),400);}
};
$('#chatClose').onclick=()=>$('#chatPanel').classList.remove('open');

/* ================= SITE INIT ================= */
function trackVisit(){ANALYTICS.visits++;const d=ymd(new Date());ANALYTICS.visitsByDay[d]=(ANALYTICS.visitsByDay[d]||0)+1;saveAnalytics();}
function initSite(){
  trackVisit();
  $('#yr').textContent=new Date().getFullYear();
  $('#ctAddress').textContent=STORE.content.address;
  $('#fAddress').textContent=STORE.content.address;
  const ph=$('#ctPhone');ph.textContent=STORE.content.phone;ph.href=STORE.content.phoneHref;
  $('#mapBtn').href=STORE.content.mapUrl;
  // nav scroll
  addEventListener('scroll',()=>$('#nav').classList.toggle('scrolled',scrollY>40),{passive:true});
  // burger
  const mm=$('#mobileMenu');
  $('#burger').onclick=()=>mm.classList.toggle('open');
  $$('#mobileMenu a').forEach(a=>a.onclick=()=>mm.classList.remove('open'));
  // reveal
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});
  $$('.rv').forEach(el=>io.observe(el));
  // counters
  const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);
    const el=e.target,raw=el.dataset.count;if(!raw)return;
    if(/k/i.test(raw)){el.textContent=raw;return;}
    const target=+raw;let cur=0;const step=Math.max(1,Math.round(target/40));
    const tm=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(tm);}el.textContent=cur;},40);
  }),{threshold:.5});
  $$('[data-count]').forEach(el=>cio.observe(el));
  applyLang();renderBookingServices();bkStep(1);
  // preloader
  addEventListener('load',()=>setTimeout(()=>$('#preloader').classList.add('done'),1400));
  setTimeout(()=>$('#preloader').classList.add('done'),3200);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#lightbox').classList.remove('open');$('#chatPanel').classList.remove('open');closeModal();}});
}


/* ---------------- block ---------------- */

/* ================= ADMIN ================= */
const AD={tab:'dash',bkFilter:'all',galEdit:null};
function adOpen(){
  $('#admin').classList.add('open');$('#admin').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  if(isAuthed()){adShowShell();}else{$('#adLogin').style.display='grid';$('#adShell').classList.remove('open');}
}
function adClose(){$('#admin').classList.remove('open');document.body.style.overflow='';if(location.hash==='#/admin')history.replaceState(null,'',location.pathname+location.search);}
function adShowShell(){$('#adLogin').style.display='none';$('#adShell').classList.add('open');adTab('dash');}
$('#adLoginForm').addEventListener('submit',async e=>{
  e.preventDefault();const pw=$('#adPass').value;
  if(await checkPassword(pw)){sessionStorage.setItem('cmn_admin_auth','1');$('#adPass').value='';toast(t('toast_login_ok'));adShowShell();}
  else toast(t('toast_login_bad'));
});
$('#adBackSite').onclick=()=>{location.hash='#hero';adClose();};
$('#adViewSite').onclick=()=>{adClose();};
$('#adLogout').onclick=()=>{sessionStorage.removeItem('cmn_admin_auth');adClose();};
$('#adBrand').onclick=e=>{e.preventDefault();adClose();};
$$('#adTabs .ad-tab').forEach(b=>b.onclick=()=>adTab(b.dataset.tab));
function adTab(name){
  AD.tab=name;
  $$('#adTabs .ad-tab').forEach(b=>b.classList.toggle('on',b.dataset.tab===name));
  $$('.ad-pane').forEach(p=>p.classList.remove('on'));$('#adp-'+name).classList.add('on');
  ({dash:adDash,bookings:adBookings,services:adServices,gallery:adGallery,testimonials:adTestimonials,content:adContent,settings:adSettings})[name]();
}
function statCard(label,val){return `<div class="stat"><small>${label}</small><b>${val}</b></div>`;}
function adDash(){
  const pend=BOOKINGS.filter(b=>b.status==='pending').length;
  const days=[];for(let i=13;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push(ymd(d));}
  const max=Math.max(1,...days.map(d=>ANALYTICS.visitsByDay[d]||0));
  const top=Object.entries(ANALYTICS.bookingsByService).sort((a,b)=>b[1]-a[1]).slice(0,5)
    .map(([id,n])=>{const s=STORE.services.find(x=>x.id===id);return {name:s?L2(s.name):id,n};});
  const recent=[...BOOKINGS].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,5);
  $('#adp-dash').innerHTML=`
   <div class="stat-grid">
    ${statCard(LANG==='es'?'Visitas':'Visits',ANALYTICS.visits)}
    ${statCard(LANG==='es'?'Citas totales':'Total bookings',ANALYTICS.bookingsTotal)}
    ${statCard(LANG==='es'?'Pendientes':'Pending',pend)}
    ${statCard(LANG==='es'?'Chats abiertos':'Chat opens',ANALYTICS.chatOpens)}
   </div>
   <div class="ad-row2">
    <div class="panel"><h3>${LANG==='es'?'Visitas · últimos 14 días':'Visits · last 14 days'}</h3>
      <div class="bars">${days.map(d=>{const v=ANALYTICS.visitsByDay[d]||0;return `<div class="bar-row"><span>${d.slice(5)}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.round(v/max*100)}%"></div></div><span>${v}</span></div>`;}).join('')}</div></div>
    <div class="panel"><h3>${LANG==='es'?'Servicios más reservados':'Most-booked services'}</h3>
      ${top.length?`<div class="bars">${top.map(x=>`<div class="bar-row"><span style="grid-column:1/3">${esc(x.name)}</span><span>${x.n}</span></div>`).join('')}</div>`:`<p class="ad-empty">${LANG==='es'?'Aún no hay reservas':'No bookings yet'}</p>`}
      <h3 style="margin-top:28px">${LANG==='es'?'Reservas recientes':'Recent bookings'}</h3>
      ${recent.length?recent.map(b=>`<div class="toggle-row"><div><b>${esc(b.name)} · ${esc(b.serviceName)}</b><small>${b.date} · ${b.time} · <span class="pill ${b.status}">${b.status}</span></small></div></div>`).join(''):`<p class="ad-empty">—</p>`}
    </div>
   </div>`;
}
function adBookings(){
  const f=AD.bkFilter;
  const list=[...BOOKINGS].sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)).filter(b=>f==='all'||b.status===f);
  $('#adp-bookings').innerHTML=`
   <div class="panel">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px">
      <h3 style="margin:0">${LANG==='es'?'Reservas':'Bookings'} (${BOOKINGS.length})</h3>
      <div style="display:flex;gap:8px;align-items:center">
        <select id="bkFilterSel" class="icon-btn" style="padding:10px 14px">
          ${['all','pending','confirmed','cancelled'].map(x=>`<option value="${x}"${f===x?' selected':''}>${x}</option>`).join('')}
        </select>
        <button class="icon-btn" id="bkCsv">${LANG==='es'?'Exportar CSV':'Export CSV'}</button>
      </div>
    </div>
    ${list.length?`<div style="overflow-x:auto"><table class="ad-table"><thead><tr><th>${LANG==='es'?'Código':'Code'}</th><th>${LANG==='es'?'Clienta':'Client'}</th><th>${LANG==='es'?'Servicio':'Service'}</th><th>${LANG==='es'?'Fecha':'Date'}</th><th>${LANG==='es'?'Hora':'Time'}</th><th>${LANG==='es'?'Teléfono':'Phone'}</th><th>${LANG==='es'?'Estado':'Status'}</th><th></th></tr></thead><tbody>
      ${list.map(b=>`<tr><td style="letter-spacing:.1em">${esc(b.code)}</td><td>${esc(b.name)}${b.notes?`<br><small style="color:var(--dim)">${esc(b.notes)}</small>`:''}</td><td>${esc(b.serviceName)}</td><td>${esc(b.date)}</td><td>${esc(b.time)}</td><td>${esc(b.phone)}</td>
      <td><span class="pill ${b.status}">${b.status}</span></td>
      <td><div class="row-actions">
        ${b.status!=='confirmed'?`<button class="icon-btn ok" data-act="confirm" data-id="${b.id}">✓</button>`:''}
        ${b.status!=='cancelled'?`<button class="icon-btn" data-act="cancel" data-id="${b.id}">✕</button>`:''}
        <button class="icon-btn danger" data-act="del" data-id="${b.id}">🗑</button>
      </div></td></tr>`).join('')}</tbody></table></div>`
    :`<p class="ad-empty">${LANG==='es'?'Sin reservas':'No bookings'}</p>`}
   </div>`;
  $('#bkFilterSel').onchange=e=>{AD.bkFilter=e.target.value;adBookings();};
  $('#bkCsv').onclick=exportCSV;
  $$('#adp-bookings [data-act]').forEach(btn=>btn.onclick=()=>{
    const b=BOOKINGS.find(x=>x.id===btn.dataset.id);if(!b)return;
    const act=btn.dataset.act;
    if(act==='del'){if(!confirm(LANG==='es'?'¿Eliminar esta reserva?':'Delete this booking?'))return;BOOKINGS=BOOKINGS.filter(x=>x.id!==b.id);toast(t('toast_deleted'));}
    else{b.status=act==='confirm'?'confirmed':'cancelled';toast(t('toast_saved'));}
    saveBookings();adBookings();
  });
}
function exportCSV(){
  const rows=[['code','name','phone','service','date','time','status','notes'],...BOOKINGS.map(b=>[b.code,b.name,b.phone,b.serviceName,b.date,b.time,b.status,(b.notes||'').replace(/;/g,',')])];
  const blob=new Blob([rows.map(r=>r.join(';')).join('\n')],{type:'text/csv'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='bookings.csv';a.click();
}
function adServices(){
  $('#adp-services').innerHTML=`<div class="panel">
   <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px"><h3 style="margin:0">Services (${STORE.services.length})</h3>
   <button class="btn sm" id="svcAdd">+ ${LANG==='es'?'Añadir':'Add'}</button></div>
   <div style="overflow-x:auto"><table class="ad-table"><thead><tr><th>EN / ES</th><th>Cat.</th><th>$</th><th>Min</th><th></th></tr></thead><tbody>
   ${STORE.services.map(s=>`<tr><td><b style="color:var(--text)">${esc(s.name.en)}</b><br><small>${esc(s.name.es)}</small></td><td>${esc(s.cat)}</td><td>$${s.price}</td><td>${s.dur}</td>
    <td><div class="row-actions"><button class="icon-btn" data-edit="${s.id}">${LANG==='es'?'Editar':'Edit'}</button><button class="icon-btn danger" data-del="${s.id}">🗑</button></div></td></tr>`).join('')}
   </tbody></table></div></div>`;
  $('#svcAdd').onclick=()=>svcModal(null);
  $$('#adp-services [data-edit]').forEach(b=>b.onclick=()=>svcModal(STORE.services.find(x=>x.id===b.dataset.edit)));
  $$('#adp-services [data-del]').forEach(b=>b.onclick=()=>{if(!confirm('Delete?'))return;STORE.services=STORE.services.filter(x=>x.id!==b.dataset.del);saveStore();applyLang();adServices();toast(t('toast_deleted'));});
}
function svcModal(s){
  const isNew=!s;s=s||{name:{en:'',es:''},desc:{en:'',es:''},cat:'Manicure',price:50,priceNote:'',dur:60};
  openModal(isNew?(LANG==='es'?'Añadir servicio':'Add service'):(LANG==='es'?'Editar servicio':'Edit service'),`
   ${biField('sn','Name / Nombre',s,'name')}
   ${biTA('sd','Description / Descripción',s,'desc')}
   <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
    ${fld('sprice','Price ($) — number only',s.price,'number')}
    ${fld('sdur','Duration (min)',s.dur,'number')}
   </div>
   <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
    ${fld('scat','Category',s.cat)}
    ${fld('snote','Price note (e.g. from / add-on)',s.priceNote)}
   </div>`,LANG==='es'?'Guardar':'Save',()=>{
    const name={en:$('#sn_en').value.trim(),es:$('#sn_es').value.trim()};
    if(!name.en)return toast(LANG==='es'?'El nombre en inglés es obligatorio':'English name required'),false;
    Object.assign(s,{name,desc:{en:$('#sd_en').value.trim(),es:$('#sd_es').value.trim()},cat:$('#scat').value.trim()||'General',
      price:+$('#sprice').value||0,priceNote:$('#snote').value.trim(),dur:+$('#sdur').value||60});
    if(isNew){s.id=uid();STORE.services.push(s);}
    saveStore();applyLang();adServices();toast(t('toast_saved'));
  });
}
function adGallery(){
  const bundled=['g1','g2','g3','g4','g5','g6'];
  $('#adp-gallery').innerHTML=`<div class="panel">
   <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px"><h3 style="margin:0">Gallery (${STORE.gallery.length})</h3>
   <button class="btn sm" id="galAdd">+ ${LANG==='es'?'Añadir':'Add'}</button></div>
   <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px">
   ${STORE.gallery.map(g=>`<div style="border:1px solid var(--line);border-radius:14px;overflow:hidden">
     <img src="${gimg(g)}" style="aspect-ratio:1;object-fit:cover;width:100%">
     <div style="padding:12px 14px"><b style="font-size:13px;color:var(--text)">${esc(g.title.en)}</b>
     <div class="row-actions" style="margin-top:10px"><button class="icon-btn" data-edit="${g.id}">${LANG==='es'?'Editar':'Edit'}</button><button class="icon-btn danger" data-del="${g.id}">🗑</button></div></div></div>`).join('')}
   </div></div>`;
  $('#galAdd').onclick=()=>galModal(null);
  $$('#adp-gallery [data-edit]').forEach(b=>b.onclick=()=>galModal(STORE.gallery.find(x=>x.id===b.dataset.edit)));
  $$('#adp-gallery [data-del]').forEach(b=>b.onclick=()=>{if(!confirm('Delete?'))return;STORE.gallery=STORE.gallery.filter(x=>x.id!==b.dataset.del);saveStore();applyLang();adGallery();toast(t('toast_deleted'));});
  function galModal(g){
    const isNew=!g;g=g||{img:'g1',tag:{en:'',es:''},title:{en:'',es:''}};
    openModal(isNew?'Add piece':'Edit piece',`
     ${biField('gt','Title',g,'title')}
     ${biField('gg','Tag',g,'tag')}
     <div class="field"><label>${LANG==='es'?'Imagen de la colección':'Bundled image'}</label>
      <select id="gimg" style="background:rgba(0,0,0,.35);border:1px solid var(--line);border-radius:12px;color:var(--text);padding:15px 18px">
       ${bundled.map(k=>`<option value="${k}"${g.img===k?' selected':''}>${k.toUpperCase()} — bundled</option>`).join('')}
      </select></div>
     <div class="field"><label>${LANG==='es'?'O sube tu propia foto':'Or upload your own photo'}</label><input type="file" id="gfile" accept="image/*" style="color:var(--muted)"></div>
     <img id="gprev" src="${gimg(g)}" style="border-radius:12px;max-height:180px;border:1px solid var(--line)">`,
     LANG==='es'?'Guardar':'Save',()=>{
      const title={en:$('#gt_en').value.trim(),es:$('#gt_es').value.trim()||$('#gt_en').value.trim()};
      if(!title.en)return toast('Title required'),false;
      const file=$('#gfile').files[0];
      const done=(imgUrl,imgKey)=>{Object.assign(g,{title,tag:{en:$('#gg_en').value.trim(),es:$('#gg_es').value.trim()},img:imgKey||g.img,imgUrl});if(isNew){g.id=uid();STORE.gallery.push(g);}saveStore();applyLang();adGallery();toast(t('toast_saved'));};
      if(file){
        const rd=new FileReader();
        rd.onload=()=>{const im=new Image();im.onload=()=>{const cv=document.createElement('canvas');const w=Math.min(900,im.width);cv.width=w;cv.height=Math.round(im.height*w/im.width);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);done(cv.toDataURL('image/jpeg',.72),null);};im.src=rd.result;};
        rd.readAsDataURL(file);
      }else done(null,$('#gimg').value);
    });
    $('#gimg').onchange=e=>{$('#gprev').src=IMGS[e.target.value];};
    $('#gfile').onchange=e=>{const f=e.target.files[0];if(f)$('#gprev').src=URL.createObjectURL(f);};
  }
}
function adTestimonials(){
  $('#adp-testimonials').innerHTML=`<div class="panel">
   <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px"><h3 style="margin:0">${LANG==='es'?'Reseñas':'Reviews'} (${STORE.testimonials.length})</h3>
   <button class="btn sm" id="tstAdd">+ ${LANG==='es'?'Añadir':'Add'}</button></div>
   ${STORE.testimonials.map(x=>`<div class="toggle-row"><div><b>${esc(x.name)} <span style="color:var(--gold)">${'★'.repeat(x.stars||5)}</span></b><small>${esc(x.text.en.slice(0,90))}…</small></div>
    <div class="row-actions"><button class="icon-btn" data-edit="${x.id}">${LANG==='es'?'Editar':'Edit'}</button><button class="icon-btn danger" data-del="${x.id}">🗑</button></div></div>`).join('')}
  </div>`;
  $('#tstAdd').onclick=()=>tstModal(null);
  $$('#adp-testimonials [data-edit]').forEach(b=>b.onclick=()=>tstModal(STORE.testimonials.find(x=>x.id===b.dataset.edit)));
  $$('#adp-testimonials [data-del]').forEach(b=>b.onclick=()=>{if(!confirm('Delete?'))return;STORE.testimonials=STORE.testimonials.filter(x=>x.id!==b.dataset.del);saveStore();applyLang();adTestimonials();toast(t('toast_deleted'));});
  function tstModal(x){
    const isNew=!x;x=x||{name:'',stars:5,text:{en:'',es:''}};
    openModal(isNew?'Add review':'Edit review',`
     <div style="display:grid;grid-template-columns:1fr 120px;gap:16px">${fld('tname','Client name',x.name)}${fld('tstars','Stars (1-5)',x.stars,'number')}</div>
     ${biTA('tt','Review text',x,'text')}`,LANG==='es'?'Guardar':'Save',()=>{
      const text={en:$('#tt_en').value.trim(),es:$('#tt_es').value.trim()||$('#tt_en').value.trim()};
      if(!$('#tname').value.trim()||!text.en)return toast('Name + text required'),false;
      Object.assign(x,{name:$('#tname').value.trim(),stars:Math.min(5,Math.max(1,+$('#tstars').value||5)),text});
      if(isNew){x.id=uid();STORE.testimonials.push(x);}
      saveStore();applyLang();adTestimonials();toast(t('toast_saved'));
    });
  }
}
function adContent(){
  const c=STORE.content;
  $('#adp-content').innerHTML=`<div class="panel"><h3>Hero</h3><div class="ad-form">
   ${biField('ck','Kicker',c,'heroKicker')}${biField('c1','Title line 1',c,'heroT1')}${biField('c2','Title accent 1',c,'heroT2')}
   ${biField('c3','Title line 2',c,'heroT3')}${biField('c4','Title accent 2',c,'heroT4')}${biTA('cs','Subtitle',c,'heroSub')}
   ${biField('cb1','CTA primary',c,'heroCta1')}${biField('cb2','CTA secondary',c,'heroCta2')}
  </div></div>
  <div class="panel" style="margin-top:18px"><h3>About</h3><div class="ad-form">
   ${biField('ak','Kicker',c,'aboutKicker')}${biField('at1','Title',c,'aboutT1')}${biField('at2','Title accent',c,'aboutT2')}
   ${biTA('ap1','Paragraph 1',c,'aboutP1')}${biTA('ap2','Paragraph 2',c,'aboutP2')}${biField('ar','Role line',c,'aboutRole')}
   <div class="field"><label>Checklist bullets (EN | ES per line)</label>
    <textarea id="cbullets" rows="5">${c.aboutBullets.map(b=>esc(b.en+' | '+b.es)).join('\n')}</textarea></div>
  </div></div>
  <div class="panel" style="margin-top:18px"><h3>${LANG==='es'?'Contacto y horario':'Contact & hours'}</h3><div class="ad-form">
   ${fld('caddr','Address',c.address)}${fld('cphone','Phone display',c.phone)}${fld('cphonehref','Phone link (tel:)',c.phoneHref)}${fld('cmap','Google Maps URL',c.mapUrl)}
   <div class="field"><label>Hours — one per line: Day EN | Day ES | Time  (use "Closed" for closed days)</label>
    <textarea id="chours" rows="4">${c.hours.map(h=>esc(h.d_en+' | '+h.d_es+' | '+h.t)).join('\n')}</textarea></div>
   <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">${fld('stY','Stat: years',c.stats.years)}${fld('stS','Stat: sets',c.stats.sets)}${fld('stR','Stat: rating',c.stats.rating)}</div>
   ${biTA('cft','Footer tagline',c,'footerTag')}
  </div></div>
  <div style="margin-top:22px"><button class="btn" id="cSave">${LANG==='es'?'Guardar Todo':'Save All'}</button></div>`;
  $('#cSave').onclick=()=>{
    const g=id=>$('#'+id).value.trim();
    const B=(base,obj,key)=>{obj[key]={en:g(base+'_en'),es:g(base+'_es')||g(base+'_en')};};
    ['ck|heroKicker','c1|heroT1','c2|heroT2','c3|heroT3','c4|heroT4','cb1|heroCta1','cb2|heroCta2','ak|aboutKicker','at1|aboutT1','at2|aboutT2','ar|aboutRole'].forEach(p=>{const[b,k]=p.split('|');B(b,c,k);});
    const TA=(base,obj,key)=>{obj[key]={en:$('#'+base+'_en').value.trim(),es:$('#'+base+'_es').value.trim()||$('#'+base+'_en').value.trim()};};
    TA('cs',c,'heroSub');TA('ap1',c,'aboutP1');TA('ap2',c,'aboutP2');TA('cft',c,'footerTag');
    c.aboutBullets=$('#cbullets').value.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{const[a,b]=l.split('|');return{en:(a||'').trim(),es:(b||a||'').trim()};});
    c.hours=$('#chours').value.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{const[a,b,tm]=l.split('|');return{d_en:(a||'').trim(),d_es:(b||a||'').trim(),t:(tm||'').trim()};});
    c.address=g('caddr');c.phone=g('cphone');c.phoneHref=g('cphonehref');c.mapUrl=g('cmap');
    c.stats={years:g('stY'),sets:g('stS'),rating:g('stR')};
    saveStore();applyLang();initContactBits();toast(t('toast_saved'));
  };
}
function initContactBits(){
  $('#ctAddress').textContent=STORE.content.address;$('#fAddress').textContent=STORE.content.address;
  const ph=$('#ctPhone');ph.textContent=STORE.content.phone;ph.href=STORE.content.phoneHref;$('#mapBtn').href=STORE.content.mapUrl;
}
function adSettings(){
  const s=STORE.settings;
  const tg=(k,label,sub)=>`<div class="toggle-row"><div><b>${label}</b><small>${sub}</small></div><label class="switch"><input type="checkbox" data-tg="${k}"${s[k]!==false?' checked':''}><span class="tr"></span></label></div>`;
  $('#adp-settings').innerHTML=`
   <div class="ad-row2">
    <div class="panel"><h3>${LANG==='es'?'Funciones del sitio':'Site features'}</h3>
     ${tg('chatbot',LANG==='es'?'Asistente de chat':'Chat assistant',LANG==='es'?'Widget flotante de preguntas frecuentes':'Floating FAQ widget')}
     ${tg('booking',LANG==='es'?'Reservas en línea':'Online booking',LANG==='es'?'Calendario y wizard de citas':'Calendar & booking wizard')}
     ${tg('gallery',LANG==='es'?'Galería':'Gallery',LANG==='es'?'Sección de portafolio':'Portfolio section')}
     ${tg('testimonials',LANG==='es'?'Reseñas':'Reviews',LANG==='es'?'Carrusel de testimonios':'Testimonials carousel')}
    </div>
    <div class="panel"><h3>${LANG==='es'?'Cambiar contraseña':'Change password'}</h3>
     <div class="ad-form">${fld('pwCur',LANG==='es'?'Contraseña actual':'Current password','','password')}${fld('pwNew',LANG==='es'?'Nueva contraseña':'New password','','password')}${fld('pwNew2',LANG==='es'?'Confirmar nueva':'Confirm new','','password')}
     <button class="btn sm" id="pwSave">${LANG==='es'?'Actualizar':'Update'}</button></div>
    </div>
   </div>
   <div class="panel" style="margin-top:18px"><h3>${LANG==='es'?'Datos':'Data'}</h3>
    <div class="toggle-row"><div><b>${LANG==='es'?'Exportar respaldo':'Export backup'}</b><small>JSON</small></div><button class="icon-btn" id="dlBackup">↓ JSON</button></div>
    <div class="toggle-row"><div><b style="color:var(--rose)">${LANG==='es'?'Restablecer demo':'Reset demo data'}</b><small>${LANG==='es'?'Restaura servicios, galería y contenido original':'Restore original services, gallery & content'}</small></div><button class="icon-btn danger" id="resetAll">${LANG==='es'?'Restablecer':'Reset'}</button></div>
   </div>`;
  $$('#adp-settings [data-tg]').forEach(sw=>sw.onchange=()=>{STORE.settings[sw.dataset.tg]=sw.checked;saveStore();applyFeatures();toast(t('toast_saved'));});
  $('#pwSave').onclick=async()=>{
    const cur=$('#pwCur').value,nw=$('#pwNew').value,nw2=$('#pwNew2').value;
    if(!(await checkPassword(cur)))return toast(t('toast_login_bad'));
    if(nw.length<6)return toast(LANG==='es'?'Mínimo 6 caracteres':'Minimum 6 characters');
    if(nw!==nw2)return toast(t('toast_pass_mismatch'));
    await setPassword(nw);$('#pwCur').value=$('#pwNew').value=$('#pwNew2').value='';toast(t('toast_pass_changed'));
  };
  $('#dlBackup').onclick=()=>{
    const blob=new Blob([JSON.stringify({store:STORE,bookings:BOOKINGS,analytics:ANALYTICS},null,2)],{type:'application/json'});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='crystal-maciel-backup.json';a.click();
  };
  $('#resetAll').onclick=()=>{if(!confirm(LANG==='es'?'¿Segura? Se restaurará el contenido original.':'Sure? Original content will be restored.'))return;
    STORE=seedStore();saveStore();applyLang();initContactBits();adDash();toast(t('toast_reset'));};
}
/* hash router */
function route(){if(location.hash==='#/admin')adOpen();else if($('#admin').classList.contains('open'))adClose();}
addEventListener('hashchange',route);
/* testimonials toggle also hides section */
const _applyFeatures=applyFeatures;
applyFeatures=function(){_applyFeatures();const f=STORE.settings;const ts=$('#testimonials');if(ts)ts.style.display=f.testimonials===false?'none':'';};
/* boot */
initSite();route();
