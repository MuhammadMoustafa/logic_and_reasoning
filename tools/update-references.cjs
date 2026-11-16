'use strict';
// Regenerates every derived copy from its single source:
//   assets/terms.js  → glossary.html, term buttons and definition frames in lessons
//   lesson <h1>s     → the header lesson menu everywhere, and the lesson list in index.html
//   lesson quizzes   → quizIds in assets/course.js and the course total in index.html
//   tools/site.cjs   → the theme button in every page
const terms = require('../assets/terms.js');
const {read, write, lessons, quizIds, themeButton, themeButtonPattern, lessonMenu, replaceBetween} = require('./site.cjs');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const setThemeButton = (html, label) => {
  if (!themeButtonPattern.test(html)) throw new Error('Missing theme button in ' + label);
  return html.replace(themeButtonPattern, () => themeButton);
};

// Add ordinary fallback links in the saved HTML, not only after JavaScript starts.
// Arabic writes و ف ب ك ل as part of the next word («والشرط»، «بالعطف»), so each Arabic alias also matches with them.
// ل before ال drops the alef («للشرط»). The prefix stays inside the button: ف ب ك ل join the next letter, and splitting would break the word's shape.
const prefixes = ['و', 'ف', 'ب', 'ك', 'ل', 'وب', 'فب', 'وك', 'فك', 'ول', 'فل'];
const withPrefixes = alias => /^\p{Script=Arabic}/u.test(alias)
  ? [alias, ...prefixes.map(p => p.endsWith('ل') && alias.startsWith('ال') ? p + alias.slice(1) : p + alias)]
  : [alias];
// Prefixed forms that are ordinary words, not the term: «بالضرورة» is "necessarily", «بالعكس» is "conversely".
const notTerms = new Set(['بالضرورة', 'وبالضرورة', 'بالعكس', 'وبالعكس', 'فبالعكس']);
// Matching ignores Arabic diacritics, so «المقدَّم» in a lesson matches the alias «المقدّم» and vice versa.
const plain = s => s.replace(/[ً-ْٰ]/g, '');
const aliases = Object.entries(terms).flatMap(([id, t]) => t.aliases.map(plain).flatMap(withPrefixes).filter(alias => !notTerms.has(alias)).map(alias => ({id, alias}))).sort((a, b) => b.alias.length - a.alias.length);
const termByAlias = new Map(aliases.map(x => [x.alias, x.id]));
const pattern = new RegExp('(?<![\\p{L}\\p{N}_])(' + aliases.map(x => [...x.alias].map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\u064B-\\u0652\\u0670]*').join('')).join('|') + ')(?![\\p{L}\\p{N}_])', 'gu');
// Only a term's first mention in each lesson section (and in the part before the first section) is linked:
// every mention would bury the page in dotted underlines, and a reader who lands on a section still finds the link near the top.
function linkTerms(html) {
  const skip = ['a', 'nav', 'script', 'style', 'button', 'label', 'legend', 'option', 'summary', 'h1', 'h2', 'head', 'svg'];
  const stack = [];
  let linked = new Set();
  return html.split(/(<[^>]+>)/g).map(token => {
    if (token.startsWith('<')) {
      if (/^<(article|section class="lesson-section")[\s>]/.test(token)) linked = new Set();
      const end = token.match(/^<\/([a-z0-9]+)/i), start = token.match(/^<([a-z0-9]+)/i);
      if (end) { const index = stack.lastIndexOf(end[1].toLowerCase()); if (index >= 0) stack.splice(index); }
      else if (start && !/\/$/.test(token) && !['input', 'br', 'hr', 'meta', 'link', 'img'].includes(start[1].toLowerCase())) stack.push(start[1].toLowerCase());
      return token;
    }
    if (!stack.includes('article') || stack.some(tag => skip.includes(tag))) return token;
    return token.replace(pattern, alias => {
      const key = termByAlias.get(plain(alias));
      if (linked.has(key)) return alias;
      linked.add(key);
      return `<a class="term-link" data-term="${key}" href="../glossary.html#term-${key}">${alias}</a>`;
    });
  }).join('');
}

const headerNav = (rootPath, lessonPath, current) => `<nav aria-label="التنقل الرئيسي"><a href="${rootPath}index.html">الفهرس</a> ${lessonMenu(lesson => lessonPath + lesson.file, current)} <a href="${rootPath}glossary.html">قاموس المصطلحات</a></nav>`;
const headerNavPattern = /<nav aria-label="التنقل الرئيسي">[\s\S]*?<\/nav>/;

for (const {file} of lessons) {
  // Start from plain text every time, so renamed or removed terms and aliases leave nothing stale behind.
  let html = read('lessons/' + file)
    .replace(/<!-- definitions:start -->[\s\S]*?<!-- definitions:end -->/g, '')
    .replace(/<p class="concept-links">[\s\S]*?<\/p>/g, '')
    .replace(/<span class="term-wrap">([\s\S]*?)<\/span>/g, '$1')
    .replace(/<button type="button" class="term-link"[^>]*>([\s\S]*?)<\/button>/g, '$1');
  if (!headerNavPattern.test(html)) throw new Error('Missing header nav in ' + file);
  html = setThemeButton(html.replace(headerNavPattern, () => headerNav('../', '', file)), file);
  html = html.replace(/(<h2 id="([^"]+)"[\s\S]*?<\/h2>)/g, (all, heading, id) => {
    const concepts = Object.entries(terms).filter(([, term]) => term.lesson === `lessons/${file}#${id}`);
    if (!concepts.length) return all;
    return heading + '<p class="concept-links">' + concepts.map(([key, term]) => `<a class="term-link" data-term="${key}" href="../glossary.html#term-${key}">${esc(term.ar)} <bdi dir="ltr">${esc(term.en)}</bdi></a>`).join(' · ') + '</p>';
  });
  html = linkTerms(html);
  const prefix = file.slice(0, 2), used = new Set();
  // A button is an atomic inline box, so a line may break between it and adjacent punctuation; .term-wrap prevents that.
  html = html.replace(/([«(]?)<(a|button)\b([^>]*data-term="([^"]+)"[^>]*)>([\s\S]*?)<\/\2>([،؛:.,!?»)]*)/g, (all, before, tag, attrs, key, label, after) => {
    used.add(key);
    const button = `<button type="button" class="term-link" data-term="${key}" popovertarget="definition-${prefix}-${key}" aria-haspopup="dialog">${label}</button>`;
    return before || after ? `<span class="term-wrap">${before}${button}${after}</span>` : button;
  });
  const frames = [...used].map(key => {
    const t = terms[key], id = `definition-${prefix}-${key}`;
    return `<aside class="native-definition" id="${id}" popover role="dialog" aria-labelledby="${id}-title"><button type="button" class="term-close" popovertarget="${id}" popovertargetaction="hide" aria-label="إغلاق التعريف">إغلاق ×</button><h2 id="${id}-title">${esc(t.ar)}</h2><p lang="en" dir="ltr">${esc(t.en)}</p><p>${esc(t.definition)}</p><p><a href="${t.lesson.replace('lessons/', '')}">عرض الشرح الكامل في الدرس</a> · <a href="../glossary.html#term-${key}">عرض صفحة المصطلح في القاموس</a></p></aside>`;
  }).join('\n');
  html = html.replace(/\s*<\/article>/, `\n<!-- definitions:start -->\n${frames}\n<!-- definitions:end -->\n</article>`);
  write('lessons/' + file, html);
}

// index.html: theme button, lesson list and the course total (the progress line itself is computed in course.js).
let index = setThemeButton(read('index.html'), 'index.html');
index = replaceBetween(index, '<!-- lessons:start -->', '<!-- lessons:end -->', '\n' + lessons.map(l => `<li><a href="lessons/${l.file}">${l.title}</a></li>`).join('\n') + '\n', 'index.html');
if (!/(<progress id="course-mastery" max=")\d+/.test(index)) throw new Error('Missing #course-mastery in index.html');
index = index.replace(/(<progress id="course-mastery" max=")\d+/, `$1${quizIds.length}`);
write('index.html', index);

// assets/course.js needs every id on the index page, where no lesson markup is present.
write('assets/course.js', replaceBetween(read('assets/course.js'), '/* quiz-ids:start */', '/* quiz-ids:end */', `[${quizIds.map(id => `'${id}'`).join(',')}]`, 'assets/course.js'));

const glossaryContent = `<h1 id="glossary">قاموس المصطلحات</h1><p>تعريف مختصر بالعربية، والاسم الإنجليزي، ورابط يعود بك إلى الشرح في الدرس.</p><label for="glossary-search">ابحث بالعربية أو الإنجليزية</label><input type="search" id="glossary-search" placeholder="مثل: الاستنباط أو Deduction"><p id="glossary-count" role="status">عدد المصطلحات: ${Object.keys(terms).length}</p>` + Object.entries(terms).map(([id, t]) => `<section class="glossary-entry" id="term-${id}" aria-labelledby="title-${id}"><h2 id="title-${id}">${esc(t.ar)} <a class="permalink" href="#term-${id}" aria-label="رابط المصطلح: ${esc(t.ar)}">#</a></h2><p lang="en" dir="ltr">${esc(t.en)}</p><p>${esc(t.definition)}</p><a href="${t.lesson}">الشرح والأمثلة في الدرس</a></section>`).join('\n');
write('glossary.html', `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>قاموس المصطلحات</title><link rel="stylesheet" href="assets/style.css"></head><body><a class="skip-link" href="#main">انتقل إلى المحتوى</a><header>${themeButton}<p class="brand">قاموس المنطق والاستدلال</p>${headerNav('', 'lessons/', null)}</header><main id="main"><article>${glossaryContent}</article></main><script src="assets/terms.js"></script><script src="assets/course.js"></script><script src="assets/reference.js"></script></body></html>`);
console.log(`Updated ${lessons.length} lessons, ${quizIds.length} quiz ids, ${Object.keys(terms).length} glossary terms`);
