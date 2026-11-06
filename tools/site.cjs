'use strict';
// Single source for what the sync and export tools share: paths, lesson titles, quiz ids and the page chrome
// (theme button, lesson menu). Lesson pages and index.html carry generated copies; never hand-edit those copies.
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, text) => fs.writeFileSync(path.join(root, file), text.trimEnd() + '\n');
const lessonFiles = fs.readdirSync(path.join(root, 'lessons')).filter(file => file.endsWith('.html')).sort();
const stripTags = html => html.replace(/<[^>]+>/g, '').trim();

// Each lesson's menu title is its <h1>, so adding a lesson file is enough to list it everywhere.
const lessons = lessonFiles.map(file => {
  const html = read('lessons/' + file);
  return {
    file,
    title: stripTags(html.match(/<h1>([\s\S]*?)<\/h1>/)[1]),
    quizIds: [...html.matchAll(/<section class="quiz" data-quiz="([^"]+)"/g)].map(match => match[1])
  };
});
const quizIds = lessons.flatMap(lesson => lesson.quizIds);

const moon = '<svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" fill="currentColor"/></svg>';
const sun = '<svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const themeButton = `<button class="toolbar theme-toggle" type="button" onclick="toggleTheme()" aria-label="الوضع الداكن" title="الوضع الداكن" aria-pressed="false">${moon}${sun}</button>`;
const themeButtonPattern = /<button class="toolbar theme-toggle"[\s\S]*?<\/button>/;

// hrefFor(lesson, index) lets the separate pages link to files and the share file link to in-page anchors.
const lessonMenu = (hrefFor, current) => `<details class="lesson-menu"><summary>الدروس</summary><ol>${lessons.map((lesson, i) =>
  `<li><a href="${hrefFor(lesson, i)}"${lesson.file === current ? ' aria-current="page"' : ''}>${lesson.title}</a></li>`).join('')}</ol></details>`;

// Replace the text between two markers; throws if the markers are missing so a page cannot silently drift.
function replaceBetween(text, start, end, content, label) {
  const from = text.indexOf(start), to = text.indexOf(end);
  if (from < 0 || to < from) throw new Error(`Missing ${start} … ${end} in ${label}`);
  return text.slice(0, from + start.length) + content + text.slice(to);
}

module.exports = {root, read, write, lessonFiles, lessons, quizIds, stripTags, themeButton, themeButtonPattern, lessonMenu, replaceBetween};
