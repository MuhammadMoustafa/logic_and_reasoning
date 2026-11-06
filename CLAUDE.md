# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

An offline, Arabic (RTL) introductory course in logic and scientific reasoning, with English terms given on first use. Plain static HTML/CSS/JS: the files in the repo *are* the site, there is no build step and no framework, and learners open `index.html` directly (including over `file://`). Node is only for dev tooling and tests. Before changing content, read `README.md`, `docs/LESSON_GUIDELINES.md`, `docs/CURRICULUM.md` and `docs/REVIEW.md` (all in Arabic). Only lessons 1–5 exist; units 6–12 in `docs/CURRICULUM.md` are planned, not done.

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
- In each lesson, `tools/update-references.cjs` rewrites term occurrences (matched by `aliases` in `assets/terms.js`, longest first, skipping headings/labels/legends/buttons/links/nav) into `<button class="term-link" data-term popovertarget>` elements. It also adds `<p class="concept-links">` after each `<h2>` that a term's `lesson` anchor points to, and regenerates the native popover `<aside>` frames between `<!-- definitions:start -->` / `<!-- definitions:end -->`. To add or change a definition, edit `assets/terms.js` and re-run `npm run references:sync`.
- `dist/course.html`, produced by `tools/export-single.cjs`. It concatenates every lesson's `<article>` plus the glossary, inlines CSS and the four scripts, sets `window.COURSE_SINGLE_FILE = true`, and rewrites local links to in-page anchors (`#lesson-N`, `#term-x`). An unresolvable local link makes it throw. It also renames `id="progress"` / `id="mastery"` to classes, so `course.js` queries both forms.

**Scripts (no modules; loaded as classic `<script>` tags in this order: `terms.js`, `logic.js`, `course.js`, `reference.js`):**
- `assets/logic.js` holds the pure two-valued logic (`implies`, `classify`, connectives, `compound(mode,p,q,r)`). It is a UMD-style file: `window.CourseLogic` in the browser, `module.exports` for the node tests. Lab outputs and tests both depend on it.
- `assets/course.js` handles grading, progress, the dark theme, storage fallback and lab wiring. `setupLabs()` finds each lab by element id; a lesson without that id just skips it.
- `assets/reference.js` runs the JS definition dialog (focus trap, Escape, returns focus to the opener) on top of the native popover fallback, plus glossary search with Arabic normalisation (strips diacritics, unifies alef forms).
- `assets/terms.js` is the single source for definitions (UMD like `logic.js`).

**Quiz contract.** Each exercise is `<section class="quiz" data-quiz="<id>" data-correct="<value>" data-explanation="...">` containing a `<fieldset><legend>`, radio inputs, a `[data-check]` button and an output `#<id>-result`. `tests/content.test.cjs` parses this with a regex in exactly that attribute order. When adding a quiz, update all of these together:
1. `quizIds` in `assets/course.js`.
2. The `max` on `#course-mastery` and the text counts in `index.html`.
3. The `assert.equal(ids.size, N)` total in `tests/content.test.cjs`.
4. The independent answer keys in `tests/browser/course.spec.cjs`.
5. The counts in `README.md`, `exercises/README.md` and `docs/`.

**Progress semantics.** Answers persist as `localStorage['logic-course-v2-<id>'] = {value, correct}`. Mastery depends on the last *checked* answer: changing a radio without checking doesn't change progress, and a wrong check is never stored as a pass. Feedback is restored on reload. Storage access is wrapped so blocked storage falls back to an in-memory `Map` and shows a notice. Never reuse a quiz id with a different meaning or answer without bumping the `v2` key prefix or migrating.

**Inline symbols.** Formulas inside Arabic text use `<bdi dir="ltr">` (or U+2066/U+2069 isolates in JS-built strings). `→` is the conditional and `↔` is equivalence.
