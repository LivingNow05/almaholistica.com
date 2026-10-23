// Reading layout. Diary storage keys and saved-entry schema remain unchanged.
let currentSection='portada';
const chapterIds=Array.from(document.querySelectorAll('.chapter')).map(s=>s.id);
function showChapter(id,moveFocus=false){
 if(id==='reader'){document.getElementById('reader').focus();return;}
 if(!chapterIds.includes(id))id='portada';
 currentSection=id;
 document.querySelectorAll('.chapter').forEach(s=>{const active=s.id===id;s.classList.toggle('active',active);s.hidden=!active;});
 document.querySelectorAll('.toc-link').forEach(a=>{a.classList.toggle('active',a.dataset.sec===id);if(a.dataset.sec===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 const i=chapterIds.indexOf(id),prev=document.getElementById('previous-chapter'),next=document.getElementById('next-chapter');
 prev.href='#'+chapterIds[Math.max(0,i-1)];prev.style.visibility=i?'visible':'hidden';next.href='#'+chapterIds[(i+1)%chapterIds.length];next.textContent=i===12?'Volver a la portada ↗':'Siguiente capítulo →';
 document.getElementById('chapter-position').textContent=i?`Capítulo ${String(i).padStart(2,'0')} de 12`:'Tu cuaderno de noche';
 document.getElementById('reading-progress').style.width=(i/12*100)+'%';
 closeMobileToc();window.scrollTo({top:0,behavior:'instant'});
 if(moveFocus){document.getElementById('reader').focus({preventScroll:true});}
 if(hasStorageConsent&&id!=='portada'){try{localStorage.setItem(STORAGE_KEYS.LAST_SEC,id)}catch(e){}}
}
function syncDrawer(){document.getElementById('toc-sidebar').inert=window.matchMedia('(max-width:800px)').matches&&!document.body.classList.contains('menu-open');}
window.addEventListener('resize',syncDrawer);
function toggleMobileToc(){const open=!document.body.classList.contains('menu-open');document.body.classList.toggle('menu-open',open);document.getElementById('toc-sidebar').classList.toggle('mobile-open',open);document.getElementById('menu-toggle').setAttribute('aria-expanded',String(open));syncDrawer();if(open)document.querySelector('#toc-sidebar .active').focus();}
function closeMobileToc(){document.body.classList.remove('menu-open');document.getElementById('toc-sidebar').classList.remove('mobile-open');document.getElementById('menu-toggle').setAttribute('aria-expanded','false');syncDrawer();}
function resumeLastSection(){const target=document.getElementById('resume-reading-btn').dataset.target;if(target)location.hash=target;}
function setupScrollObserver(){showChapter(location.hash.slice(1));window.addEventListener('hashchange',()=>showChapter(location.hash.slice(1),true));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open')){closeMobileToc();document.getElementById('menu-toggle').focus();}});document.getElementById('text-size-btn').addEventListener('click',e=>{const large=document.documentElement.classList.toggle('reader-large');e.currentTarget.setAttribute('aria-pressed',String(large));e.currentTarget.setAttribute('aria-label',large?'Restablecer tamaño del texto':'Aumentar tamaño del texto');});}
function refreshThemeLabels(){const dark=document.documentElement.dataset.theme==='night';document.getElementById('theme-toggle-btn').setAttribute('aria-pressed',String(dark));document.getElementById('theme-label-desktop').textContent=dark?'Modo claro':'Modo oscuro';document.getElementById('theme-label-mobile').textContent=dark?'Claro':'Oscuro';}
function toggleNightMode(){document.documentElement.dataset.theme=document.documentElement.dataset.theme==='night'?'day':'night';refreshThemeLabels();if(hasStorageConsent){try{localStorage.setItem(STORAGE_KEYS.THEME,document.documentElement.dataset.theme)}catch(e){}}}
const originalLoad=loadPersistedState;
loadPersistedState=function(){originalLoad();try{const theme=localStorage.getItem(STORAGE_KEYS.THEME);if(theme==='day'||theme==='night')document.documentElement.dataset.theme=theme;}catch(e){}refreshThemeLabels();};
// Preserve existing notes when enabling storage after opting out.
const originalConsent=toggleStorageConsent;
toggleStorageConsent=function(checked){if(checked){try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEYS.ENTRIES)||'[]');const known=new Set(memoryEntries.map(e=>e.id));memoryEntries=[...memoryEntries,...saved.filter(e=>!known.has(e.id))];}catch(e){}}originalConsent(checked);renderJournalEntries();if(!checked)document.getElementById('journal-feedback').textContent='Guardado desactivado. Las notas guardadas antes siguen en este navegador hasta que las borres.';};
// Reversible deletion of the latest entry in this session.
let lastRemovedEntry=null;
const originalDelete=deleteJournalEntry;
deleteJournalEntry=function(id){lastRemovedEntry=memoryEntries.find(e=>e.id===id);originalDelete(id);const fb=document.getElementById('journal-feedback');const undo=document.createElement('button');undo.type='button';undo.className='quiet-link';undo.textContent=' Deshacer';undo.onclick=()=>{if(!lastRemovedEntry)return;memoryEntries.unshift(lastRemovedEntry);lastRemovedEntry=null;if(hasStorageConsent){try{localStorage.setItem(STORAGE_KEYS.ENTRIES,JSON.stringify(memoryEntries))}catch(e){}}renderJournalEntries();fb.textContent='Nota restaurada.';};fb.appendChild(undo);};
const originalClear=clearOnlyUserJournalData;
clearOnlyUserJournalData=function(){if(confirm('¿Borrar tus notas y tu plan guardados en este navegador? Antes puedes descargarlos como respaldo.'))originalClear();};
const originalToggleAudio=toggleAudio;
toggleAudio=async function(num){const a=document.getElementById('audio-track-'+num),other=document.getElementById('audio-track-'+(num===1?2:1)),btn=document.getElementById('btn-play-'+num);if(a.paused){other.pause();document.getElementById('btn-play-'+(num===1?2:1)).textContent='▶ Reproducir';try{await a.play();btn.textContent='⏸ Pausar';}catch(e){btn.textContent='Reintentar audio';}}else{a.pause();btn.textContent='▶ Reproducir';}};
window.addEventListener('beforeprint',()=>document.querySelectorAll('.chapter').forEach(s=>s.hidden=false));
window.addEventListener('afterprint',()=>showChapter(currentSection));
