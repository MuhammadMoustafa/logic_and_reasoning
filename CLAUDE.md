# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

An offline, Arabic (RTL) introductory course in logic and scientific reasoning, with English terms given on first use. Plain static HTML/CSS/JS: the files in the repo *are* the site, there is no build step and no framework, and learners open `index.html` directly (including over `file://`). Node is only for dev tooling and tests. Before changing content, read `README.md`, `docs/LESSON_GUIDELINES.md`, `docs/CURRICULUM.md` and `docs/REVIEW.md` (all in Arabic). Lessons 1–13 cover every unit in `docs/CURRICULUM.md` (13, on controls and lab reasoning, was added at the user's request); lessons 7–13 are first drafts awaiting the user's review.

## Commands

Node 22+.

```sh
npm ci
npm start                      # dev server on http://127.0.0.1:4173 (tools/serve.cjs)
npm test                       # node:test: tests/logic.test.cjs + tests/content.test.cjs
npm run test:browser           # runs export:single first, then Playwright (tests/browser/course.spec.cjs)
npm run references:sync        # regenerate glossary.html + term links/popovers inside lessons
npm run export:single          # references:sync, then build dist/course.html (gitignored)
```

Single tests:

```sh
node --test --test-name-pattern="compound" tests/logic.test.cjs
npx playwright test -g "lesson five"
```

`npx playwright test` alone skips the export step, so the share-file test may run against a stale `dist/course.html`. `playwright.config.cjs` hard-codes the Windows Chrome path in `executablePath`; on another machine remove it and run `npx playwright install chromium`. The Playwright `webServer` reuses an already-running `npm start`. Screenshots go to `work/screenshots/` (gitignored).

## Architecture

**Content pages.** `lessons/NN-*.html` are standalone pages, each with one `<article data-lesson>`. Section ids are permanent bookmarks prefixed by lesson number (`l3-...`); don't rename them. The export tool, the link check and term linking all assume this one-article-per-page shape.

**Generated regions — never hand-edit:**
- `glossary.html` is fully generated from `assets/terms.js`.
- In each lesson, `tools/update-references.cjs` rewrites term occurrences (matched by `aliases` in `assets/terms.js`, ignoring Arabic diacritics, longest first, also with the attached Arabic prefixes و ف ب ك ل kept inside the button, minus a short `notTerms` list of ordinary words; skipping headings/labels/legends/buttons/links/nav; only the first mention of each term in each `section.lesson-section` is linked) into `<button class="term-link" data-term popovertarget>` elements. It also adds `<p class="concept-links">` after each `<h2>` that a term's `lesson` anchor points to, and regenerates the native popover `<aside>` frames between `<!-- definitions:start -->` / `<!-- definitions:end -->`. To add or change a definition, edit `assets/terms.js` and re-run `npm run references:sync`.
- The header `<nav aria-label="التنقل الرئيسي">` in every lesson and in the glossary is rebuilt by the same sync. It holds a `<details class="lesson-menu">` dropdown that lists each lesson by its `<h1>` and marks the current one. A new `lessons/NN-*.html` therefore appears in every menu after one sync.
- Also from the lesson pages: the lesson list in `index.html` (between `<!-- lessons:start/end -->`), the `max` on `#course-mastery`, and `quizIds` in `assets/course.js` (between `/* quiz-ids:start/end */`). The theme button in every page comes from `tools/site.cjs`.
- `tools/site.cjs` is the single source both tools share: paths, lesson titles and quiz ids read from the pages, the theme button, the lesson menu and `replaceBetween`. Put any new shared page chrome there, not in either tool.
- `dist/course.html`, produced by `tools/export-single.cjs`. It concatenates every lesson's `<article>` plus the glossary, inlines CSS and the four scripts, sets `window.COURSE_SINGLE_FILE = true`, and rewrites local links to in-page anchors (`#lesson-N`, `#term-x`). An unresolvable local link makes it throw. It also renames `id="progress"` / `id="mastery"` to classes, so `course.js` queries both forms.

**Scripts (no modules; loaded as classic `<script>` tags in this order: `terms.js`, `logic.js`, `course.js`, `reference.js`):**
- `assets/logic.js` holds the pure two-valued logic (`implies`, `classify`, connectives, `compound(mode,p,q,r)`). It is a UMD-style file: `window.CourseLogic` in the browser, `module.exports` for the node tests. Lab outputs and tests both depend on it.
- `assets/course.js` handles grading, progress, the dark theme, storage fallback and lab wiring. `setupLabs()` finds each lab by element id; a lesson without that id just skips it. `setupSections()` turns each `section.lesson-section > h2` into a disclosure button and moves the rest of the section into `.section-body`. It also adds collapse-all/expand-all buttons to `.lesson-toc` and reopens a collapsed section before any same-page link or hash points into it. Without JS, everything stays visible; print CSS shows collapsed bodies.
- `assets/reference.js` runs the JS definition dialog (focus trap, Escape, returns focus to the opener) on top of the native popover fallback, plus glossary search with Arabic normalisation (strips diacritics, unifies alef forms).
- `assets/terms.js` is the single source for definitions (UMD like `logic.js`).

**Quiz contract.** Each exercise is `<section class="quiz" data-quiz="<id>" data-correct="<value>" data-explanation="...">` containing a `<fieldset><legend>`, radio inputs, a `[data-check]` button and an output `#<id>-result`. `tests/content.test.cjs` parses this with a regex in exactly that attribute order. When adding a quiz:
1. Run `npm run references:sync`. It regenerates `quizIds`, the index total and the lesson list; `tests/content.test.cjs` fails if you forget. The browser tests derive pages and totals from `tools/site.cjs`.
2. Add its answer to the independent answer keys in `tests/browser/course.spec.cjs`.
3. Update the prose counts in `README.md`, `exercises/README.md` and `docs/`.

**Progress semantics.** Answers persist as `localStorage['logic-course-v2-<id>'] = {value, correct}`. Mastery depends on the last *checked* answer: changing a radio without checking doesn't change progress, and a wrong check is never stored as a pass. Feedback is restored on reload. Storage access is wrapped so blocked storage falls back to an in-memory `Map` and shows a notice. Never reuse a quiz id with a different meaning or answer without bumping the `v2` key prefix or migrating.

**Inline symbols.** Formulas and variables inside Arabic text use `<bdi class="math" dir="ltr">`, which renders as a code-like chip (`tests/content.test.cjs` fails on a formula in a plain `<bdi dir="ltr">`); plain `<bdi dir="ltr">` is for English words, names and units. JS-built strings use U+2066/U+2069 isolates. `→` is the conditional and `↔` is equivalence.
