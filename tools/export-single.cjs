'use strict';
// Generated output only: edit lessons/, assets/ and the shared glossary source.
const fs=require('node:fs');const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const pages=fs.readdirSync(path.join(root,'lessons')).filter(p=>p.endsWith('.html')).sort();
const article=html=>html.match(/<article[\s\S]*?<\/article>/)[0];
const titles=pages.map(file=>read('lessons/'+file).match(/<h1>([\s\S]*?)<\/h1>/)[1].replace(/<[^>]+>/g,'').trim());
const content=pages.map((file,i)=>article(read('lessons/'+file))
  .replace('<article ',`<article id="lesson-${i+1}" `)
  .replace('id="progress"','class="lesson-progress"')
  .replace('id="mastery"','class="lesson-mastery"')
  .replace(/<p class="interaction-warning"[\s\S]*?<\/p>/,'<p class="interaction-warning" role="status">لم تعمل التفاعلات في هذه المعاينة. نزّل الملف وافتحه في متصفح بدل معاينة الشات. ويمكنك فتح الحل اليدوي أسفل كل تمرين.</p>'))
  .join('\n')+article(read('glossary.html'));
const linked=content.replace(/href="([^"]+)"/g,(all,url)=>{
  if(url.startsWith('#')||/^https?:/.test(url))return all;
  const [file,hash]=url.split('#');const base=path.basename(file);
  const index=pages.indexOf(base);
  if(index>=0)return `href="#${hash||'lesson-'+(index+1)}"`;
  if(base==='glossary.html')return `href="#${hash||'glossary'}"`;
  if(base==='index.html')return 'href="#main"';
  throw new Error('Unresolved local link in export: '+url);
});
const scripts=['terms.js','logic.js','course.js','reference.js'].map(file=>`<script>\n${read('assets/'+file).replace(/<\/script/gi,'<\\/script')}\n</script>`).join('\n');
const html=`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>المنطق والاستدلال — نسخة للمشاركة</title><style>${read('assets/style.css')}</style></head><body><a class="skip-link" href="#main">انتقل إلى المحتوى</a><header><button class="toolbar" type="button" onclick="toggleTheme()">فاتح / داكن</button><p class="brand">المنطق والاستدلال العلمي</p><nav aria-label="التنقل الرئيسي"><details class="lesson-menu"><summary>الدروس</summary><ol>${titles.map((title,i)=>`<li><a href="#lesson-${i+1}">${title}</a></li>`).join('')}</ol></details> <a href="#glossary">قاموس المصطلحات</a></nav></header><main id="main"><p class="callout">نسخة للمشاركة، مولّدة من صفحات الدروس الأصلية. تعمل دون ملفات إضافية عند فتحها في المتصفح. للاحتفاظ بموضع المراجعة، اختر القسم من فهرس الدرس ثم احفظ الرابط.</p>${linked}</main><script>window.COURSE_SINGLE_FILE=true;</script>${scripts}</body></html>\n`;
fs.mkdirSync(path.join(root,'dist'),{recursive:true});
fs.writeFileSync(path.join(root,'dist/course.html'),html);
console.log('Generated dist/course.html from the separate source files.');
