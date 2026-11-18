(()=>{'use strict';
const BASE='/docs/';
const $=(s,r=document)=>r.querySelector(s);
const all=(s,r=document)=>Array.from(r.querySelectorAll(s));
const pages=[
{title:'Home',url:BASE+'home/',desc:'Project archive and featured work',icon:'⌂',group:'Explore'},
{title:'Projects',url:BASE+'projects/',desc:'Minecraft mods, plugins and resource packs',icon:'▦',group:'Explore'},
{title:'Updates',url:BASE+'updates/',desc:'Development notes and release updates',icon:'↗',group:'Explore'},
{title:'Documentation',url:BASE+'docs/',desc:'Guides, references and installation help',icon:'▤',group:'Documentation'},
{title:'Carpet Fake Players',url:BASE+'carpet-fake-players/',desc:'Paper and Purpur server plugin documentation',icon:'▣',group:'Project guides'},
{title:"Zyn's Better Teams",url:BASE+'zyns-better-teams/',desc:'Fabric server-side team management guide',icon:'◇',group:'Project guides'},
{title:'ZeroXFog',url:BASE+'zeroxfog/',desc:'Minecraft resource pack guide',icon:'◌',group:'Project guides'},
{title:'Netherite Stones & Ores',url:BASE+'netherite-stones-ores/',desc:'Minecraft resource pack guide',icon:'◆',group:'Project guides'},
{title:'Smooth Fonts 32x',url:BASE+'smooth-fonts-32x/',desc:'Minecraft font resource pack guide',icon:'Aa',group:'Project guides'},
{title:'Installation guide',url:BASE+'guides/installation.html',desc:'Install and check compatibility',icon:'⇩',group:'Documentation'},
{title:'Troubleshooting',url:BASE+'guides/troubleshooting.html',desc:'Common fixes and bug reports',icon:'⚙',group:'Documentation'},
{title:'About Me',url:BASE+'about/',desc:'About the creator and development focus',icon:'◉',group:'Community'},
{title:'Community',url:BASE+'community/',desc:'Discord hub and community links',icon:'◎',group:'Community'},
{title:'FAQ',url:BASE+'faq/',desc:'Frequently asked questions',icon:'?',group:'Community'},
{title:'Journal',url:BASE+'journal.html',desc:'Project notes and development journal',icon:'✎',group:'Community'}
];
const body=document.body;body.classList.add('docs-theme');
const main=$('main'),sidebar=$('#site-sidebar'),oldHeader=$('.site-header');
const closeButton=sidebar&&$('[data-sidebar-close]',sidebar);
const menuButton=oldHeader&&$('[data-sidebar-open]',oldHeader);
const themeButton=oldHeader&&$('[data-theme-toggle]',oldHeader);
const languageBar=$('.site-language-bar');
const pageHeading=(main&&$('h1',main)?.textContent.trim())||document.title.replace(/\s*[—|]\s*ZynAyush.*$/i,'').trim()||'Documentation';
const top=document.querySelector('.docs-topline')||document.createElement('div');
top.className='docs-topline';
top.innerHTML='<div class="docs-topline-inner"><a class="docs-brand" href="'+BASE+'home/"><img src="https://mc-heads.net/avatar/ZynAyush/64" alt=""><span>ZYNAYUSH<small>PROJECT ARCHIVE</small></span></a><span class="docs-crumb"><span class="crumb-dot"></span><span>Documentation</span><span aria-hidden="true">/</span><span class="docs-crumb-current"></span></span><div class="docs-topline-links"><a href="'+BASE+'projects/">Projects</a><a href="'+BASE+'docs/">Guides</a><a href="'+BASE+'community/">Community</a><a href="'+BASE+'about/">About</a></div><div class="docs-toolbar-actions"><button class="docs-search-trigger" type="button" data-docs-search-open>⌕ <span>Search</span><kbd>Ctrl K</kbd></button></div></div>';
$('.docs-crumb-current',top).textContent=pageHeading;
if(menuButton){menuButton.classList.add('docs-menu-trigger');menuButton.textContent='☰';$('.docs-topline-inner',top).prepend(menuButton)}
else{
 const mb=document.createElement('button');mb.className='sidebar-open docs-menu-trigger';mb.type='button';mb.setAttribute('aria-label','Open navigation');mb.textContent='☰';
 mb.addEventListener('click',()=>{if(sidebar){sidebar.classList.add('is-open');sidebar.setAttribute('aria-hidden','false')}const back=$('[data-sidebar-backdrop]');if(back)back.hidden=false});
 $('.docs-topline-inner',top).prepend(mb);
}
const actions=$('.docs-toolbar-actions',top);
if(themeButton)actions.append(themeButton);
if(languageBar)actions.append(languageBar);
body.insertBefore(top,body.firstChild);
if(oldHeader)oldHeader.hidden=true;
if(sidebar){
 const oldClose=closeButton;
 sidebar.innerHTML='<div class="sidebar-head"><a class="sidebar-brand" href="'+BASE+'home/"><img src="https://mc-heads.net/avatar/ZynAyush/64" alt=""><span class="sidebar-brand-copy">ZYNAYUSH<small>PROJECT ARCHIVE</small></span></a></div><label class="docs-side-search"><span aria-hidden="true">⌕</span><input id="docs-nav-search" type="search" placeholder="Search navigation…" aria-label="Search navigation"></label><nav aria-label="Documentation navigation" class="docs-side-nav"></nav><div class="sidebar-divider"></div><a class="sidebar-link" href="https://github.com/ZynAyush" target="_blank" rel="noopener noreferrer"><span class="sidebar-icon">↗</span><span class="sidebar-label">GitHub</span></a>';
 if(oldClose){$('.sidebar-head',sidebar).append(oldClose)}
 else{
  const c=document.createElement('button');c.className='sidebar-close';c.type='button';c.textContent='×';c.setAttribute('aria-label','Close navigation');
  c.addEventListener('click',()=>{sidebar.classList.remove('is-open');sidebar.setAttribute('aria-hidden','true');const b=$('[data-sidebar-backdrop]');if(b)b.hidden=true});
  $('.sidebar-head',sidebar).append(c);
 }
 const nav=$('.docs-side-nav',sidebar);
 ['Explore','Documentation','Project guides','Community'].forEach(group=>{
  const section=pages.filter(p=>p.group===group);if(!section.length)return;
  const label=document.createElement('div');label.className='sidebar-section-label';label.textContent=group.toUpperCase();nav.append(label);
  section.forEach(p=>{
   const a=document.createElement('a');a.className='sidebar-link';a.href=p.url;
   a.innerHTML='<span class="sidebar-icon">'+p.icon+'</span><span class="sidebar-label"></span>';
   $('.sidebar-label',a).textContent=p.title;
   let path=location.pathname.replace(/index\.html?$/,'').replace(/\/+$/,'/');
   const urlPath=new URL(p.url,location.origin).pathname.replace(/\/+$/,'/');
   const aliases={'about.html':'/docs/about/','faq.html':'/docs/faq/','journal.html':'/docs/journal.html'};
   const alias=aliases[path.split('/').pop()];
   if(path===urlPath||(alias&&alias===urlPath)||(p.url===BASE+'home/'&&(path===BASE||path===BASE+'index.html')))a.setAttribute('aria-current','page');
   nav.append(a);a.addEventListener('click',()=>{if(oldClose)oldClose.click()});
  });
  const div=document.createElement('div');div.className='sidebar-divider';nav.append(div);
 });
 const sideInput=$('#docs-nav-search',sidebar);
 if(sideInput)sideInput.addEventListener('input',()=>{const q=sideInput.value.toLowerCase().trim();all('.sidebar-link',sidebar).forEach(a=>{a.hidden=!!q&&!a.textContent.toLowerCase().includes(q)})});
}
if(main){
 main.classList.add('docs-content-frame');
 const oldOutline=$('.docs-page-outline');if(oldOutline)oldOutline.hidden=true;
 let outline=$('#docs-auto-outline');
 if(!outline){outline=document.createElement('aside');outline.id='docs-auto-outline';outline.setAttribute('aria-label','On this page');body.append(outline)}
 const headings=all('h2,h3',main).filter(h=>h.textContent.trim()&&!h.closest('[hidden]'));
 const used=new Set();
 headings.forEach(h=>{
  if(!h.id){let id=h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'section';let n=id,i=2;while(used.has(n)||document.getElementById(n)){n=id+'-'+i++;}h.id=n;}
  used.add(h.id);
 });
 outline.innerHTML='';
 if(headings.length){
  const label=document.createElement('div');label.className='outline-title';label.textContent='ON THIS PAGE';outline.append(label);
  headings.forEach(h=>{
   const a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent.trim().replace(/^\d+\s*\/\s*/,'');if(h.tagName==='H3')a.className='outline-h3';outline.append(a);
  });
 }
}
let overlay=$('#docs-search-overlay');
if(!overlay){overlay=document.createElement('div');overlay.id='docs-search-overlay';body.append(overlay)}
overlay.className='docs-search-overlay';overlay.hidden=true;
overlay.innerHTML='<div class="docs-search-box"><div class="docs-search-row"><span aria-hidden="true">⌕</span><input id="docs-global-search" type="search" placeholder="Search projects, guides, FAQs and updates…" aria-label="Search this website"><button type="button" data-docs-search-close aria-label="Close search">×</button></div><div id="docs-search-results" class="docs-search-results"></div></div>';
const input=$('#docs-global-search',overlay),results=$('#docs-search-results',overlay);
const render=query=>{
 const q=(query||'').trim().toLowerCase();
 const hits=pages.filter(p=>!q||(p.title+' '+p.desc+' '+p.group).toLowerCase().includes(q));
 results.innerHTML='';
 if(!hits.length){const p=document.createElement('p');p.textContent='No matching pages. Try a project name or installation.';results.append(p);return;}
 hits.forEach(p=>{const a=document.createElement('a');a.href=p.url;const b=document.createElement('b');b.textContent=p.title;const sm=document.createElement('small');sm.textContent=p.desc;a.append(b,sm);results.append(a)});
};
const open=()=>{overlay.hidden=false;render(input.value);input.focus()};
const close=()=>{overlay.hidden=true};
all('[data-docs-search-open]').forEach(b=>b.addEventListener('click',open));
$('[data-docs-search-close]',overlay).addEventListener('click',close);
overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
input.addEventListener('input',()=>render(input.value));
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open()}if(e.key==='Escape')close()});
render('');
})();