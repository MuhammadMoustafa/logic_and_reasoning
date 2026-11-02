const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const terms=require('../assets/terms.js');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const write=(p,s)=>fs.writeFileSync(path.join(root,p),s.trimEnd()+'\n');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const pages=fs.readdirSync(path.join(root,'lessons')).filter(f=>f.endsWith('.html')).sort();
// Add ordinary fallback links in the saved HTML, not only after JavaScript starts.
const aliases=Object.entries(terms).flatMap(([id,t])=>t.aliases.map(alias=>({id,alias}))).sort((a,b)=>b.alias.length-a.alias.length);
const termByAlias=new Map(aliases.map(x=>[x.alias,x.id]));
const pattern=new RegExp('(?<![\\p{L}\\p{N}_])('+aliases.map(x=>x.alias.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')(?![\\p{L}\\p{N}_])','gu');
function linkTerms(html){
  const skip=['a','nav','script','style','button','label','legend','option','summary','h1','h2','head'];
  const stack=[];
  return html.split(/(<[^>]+>)/g).map(token=>{
    if(token.startsWith('<')){
      const end=token.match(/^<\/([a-z0-9]+)/i),start=token.match(/^<([a-z0-9]+)/i);
      if(end){const index=stack.lastIndexOf(end[1].toLowerCase());if(index>=0)stack.splice(index);}
      else if(start&&!/\/$/.test(token)&&!['input','br','hr','meta','link','img'].includes(start[1].toLowerCase()))stack.push(start[1].toLowerCase());
      return token;
    }
    if(!stack.includes('article')||stack.some(tag=>skip.includes(tag)))return token;
    return token.replace(pattern,alias=>`<a class="term-link" data-term="${termByAlias.get(alias)}" href="../glossary.html#term-${termByAlias.get(alias)}">${alias}</a>`);
  }).join('');
}
for(const file of pages){
  let html=read('lessons/'+file).replace(/<!-- definitions:start -->[\s\S]*?<!-- definitions:end -->/g,'');
  if(!html.includes('class="concept-links"')){
    html=html.replace(/(<h2 id="([^"]+)"[\s\S]*?<\/h2>)/g,(all,heading,id)=>{
      const concepts=Object.entries(terms).filter(([,term])=>term.lesson===`lessons/${file}#${id}`);
      if(!concepts.length)return all;
      return heading+'<p class="concept-links">'+concepts.map(([key,term])=>`<a class="term-link" data-term="${key}" href="../glossary.html#term-${key}">${esc(term.ar)} <bdi dir="ltr">${esc(term.en)}</bdi></a>`).join(' · ')+'</p>';
    });
  }
  html=linkTerms(html);
  const prefix=file.slice(0,2),used=new Set();
  html=html.replace(/<(a|button)\b([^>]*data-term="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g,(all,tag,attrs,key,label)=>{
    used.add(key);
    return `<button type="button" class="term-link" data-term="${key}" popovertarget="definition-${prefix}-${key}" aria-haspopup="dialog">${label}</button>`;
  });
  const frames=[...used].map(key=>{
    const t=terms[key],id=`definition-${prefix}-${key}`;
    return `<aside class="native-definition" id="${id}" popover role="dialog" aria-labelledby="${id}-title"><button type="button" class="term-close" popovertarget="${id}" popovertargetaction="hide" aria-label="إغلاق التعريف">إغلاق ×</button><h2 id="${id}-title">${esc(t.ar)}</h2><p lang="en" dir="ltr">${esc(t.en)}</p><p>${esc(t.definition)}</p><p><a href="${t.lesson.replace('lessons/','')}">عرض الشرح الكامل في الدرس</a> · <a href="../glossary.html#term-${key}">عرض صفحة المصطلح في القاموس</a></p></aside>`;
  }).join('\n');
  html=html.replace(/\s*<\/article>/,`\n<!-- definitions:start -->\n${frames}\n<!-- definitions:end -->\n</article>`);
  write('lessons/'+file,html);
}
const glossaryContent=`<h1 id="glossary">قاموس المصطلحات</h1><p>تعريف مختصر بالعربية، والاسم الإنجليزي، ورابط يعود بك إلى الشرح في الدرس.</p><label for="glossary-search">ابحث بالعربية أو الإنجليزية</label><input type="search" id="glossary-search" placeholder="مثل: الاستنباط أو Deduction"><p id="glossary-count" role="status">عدد المصطلحات: ${Object.keys(terms).length}</p>`+Object.entries(terms).map(([id,t])=>`<section class="glossary-entry" id="term-${id}" aria-labelledby="title-${id}"><h2 id="title-${id}">${esc(t.ar)} <a class="permalink" href="#term-${id}" aria-label="رابط المصطلح: ${esc(t.ar)}">#</a></h2><p lang="en" dir="ltr">${esc(t.en)}</p><p>${esc(t.definition)}</p><a href="${t.lesson}">الشرح والأمثلة في الدرس</a></section>`).join('\n');
write('glossary.html',`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>قاموس المصطلحات</title><link rel="stylesheet" href="assets/style.css"></head><body><a class="skip-link" href="#main">انتقل إلى المحتوى</a><header><button class="toolbar" type="button" onclick="toggleTheme()">فاتح / داكن</button><p class="brand">قاموس المنطق والاستدلال</p><nav aria-label="التنقل الرئيسي"><a href="index.html">الفهرس</a></nav></header><main id="main"><article>${glossaryContent}</article></main><script src="assets/terms.js"></script><script src="assets/course.js"></script><script src="assets/reference.js"></script></body></html>`);
console.log('Updated glossary and term links');
