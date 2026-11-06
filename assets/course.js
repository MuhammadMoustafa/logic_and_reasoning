'use strict';
// Storage may be blocked by browser privacy settings or file:// policies.
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); return true; } catch { return false; } }
};
const answers = new Map();
const quizIds = ['l1q1','l1q2','l1q3','l2q1','l2q2','l2q3','l2q4','l2q5','l3q1','l3q2','l3q3','l4q1','l4q2','l4q3','l4q4','l4q5','l4q6','l5q1','l5q2','l5q3','l5q4','l5q5','l5q6','l5q7','l5q8','l5q9','l6q1','l6q2','l6q3','l6q4','l6q5','l6q6','l6q7','l6q8','l7q1','l7q2','l7q3','l7q4','l7q5','l7q6','l7q7','l7q8','l8q1','l8q2','l8q3','l8q4','l8q5','l8q6','l8q7','l8q8','l9q1','l9q2','l9q3','l9q4','l9q5','l9q6','l9q7','l9q8'];
function readAnswer(id) {
  if (answers.has(id)) return answers.get(id);
  try {
    const saved = JSON.parse(storage.get('logic-course-v2-' + id));
    return saved && typeof saved.value === 'string' && typeof saved.correct === 'boolean' ? saved : null;
  } catch { return null; }
}
function toggleTheme() {
  const dark = document.body.classList.toggle('dark');
  storage.set('course-theme', dark ? 'dark' : 'light');
  document.querySelector('.toolbar')?.setAttribute('aria-pressed', String(dark));
}
if (storage.get('course-theme') === 'dark') document.body.classList.add('dark');
function showFeedback(quiz, value) {
  const correct = value === quiz.dataset.correct;
  const output = document.getElementById(quiz.dataset.quiz + '-result');
  output.className = 'feedback ' + (correct ? 'good' : 'bad');
  output.textContent = (correct ? 'إجابة صحيحة. ' : 'راجع المحاولة. ') + quiz.dataset.explanation;
  return correct;
}
function checkQuiz(quiz) {
  const chosen = quiz.querySelector('input:checked');
  const output = document.getElementById(quiz.dataset.quiz + '-result');
  if (!chosen) {
    output.className = 'feedback';
    output.textContent = 'اختر إجابة أولًا.';
    quiz.querySelector('input')?.focus();
    return;
  }
  const answer = {value: chosen.value, correct: showFeedback(quiz, chosen.value)};
  answers.set(quiz.dataset.quiz, answer);
  if (!storage.set('logic-course-v2-' + quiz.dataset.quiz, JSON.stringify(answer))) {
    document.getElementById('storage-notice').hidden = false;
  }
  updateProgress();
}
// Arabic counted noun agrees with the total: 3–10 take the plural, 11+ the singular accusative.
function exerciseCount(n) {
  if (n === 1) return 'تمرين واحد';
  if (n === 2) return 'تمرينين';
  return n >= 3 && n <= 10 ? `${n} تمارين` : `${n} تمرينًا`;
}
const progressText = (attempted, total, mastered) => `حاولت ${attempted} من ${exerciseCount(total)}؛ وأتقنت ${mastered} منها.`;
// Lesson and index both count the stored result of the last checked answer, so they always agree.
function updateProgress() {
  document.querySelectorAll('article[data-lesson]').forEach(article => {
    const quizzes = [...article.querySelectorAll('[data-quiz]')];
    const attempted = quizzes.filter(q => readAnswer(q.dataset.quiz)).length;
    const mastered = quizzes.filter(q => readAnswer(q.dataset.quiz)?.correct).length;
    const progress = article.querySelector('#progress, .lesson-progress');
    if (progress) progress.textContent = progressText(attempted, quizzes.length, mastered);
    const meter = article.querySelector('#mastery, .lesson-mastery');
    if (meter) { meter.max = quizzes.length; meter.value = mastered; }
  });
  const total = document.getElementById('course-progress');
  if (total) {
    const attempted = quizIds.filter(id => readAnswer(id)).length;
    const mastered = quizIds.filter(id => readAnswer(id)?.correct).length;
    total.textContent = progressText(attempted, quizIds.length, mastered);
    document.getElementById('course-mastery').value = mastered;
  }
}
function setupLabs() {
  const compoundMode=document.getElementById('compound-mode');
  if(compoundMode){
    const configs={
      'grouped-or':{step:'P ∨ Q',formula:'(P ∨ Q) ∧ R'},
      'grouped-and':{step:'Q ∧ R',formula:'P ∨ (Q ∧ R)'},
      'conditional-and':{step:'P ∧ Q',formula:'(P ∧ Q) → R'}
    };
    const word=value=>value?'صادقة':'كاذبة';
    const update=()=>{
      const mode=compoundMode.value,config=configs[mode];
      const selected=['compound-p','compound-q','compound-r'].map(id=>document.getElementById(id).checked);
      const current=CourseLogic.compound(mode,...selected);
      document.getElementById('compound-output').textContent=`P: ${word(selected[0])}، Q: ${word(selected[1])}، R: ${word(selected[2])}. نحسب أولًا ⁦${config.step}⁩: ${word(current.step)}. ثم نحسب ⁦${config.formula}⁩: ${word(current.result)}.`;
      document.getElementById('compound-caption').innerHTML='حساب <bdi dir="ltr">'+config.formula+'</bdi>';
      document.getElementById('compound-step-heading').innerHTML='<bdi dir="ltr">'+config.step+'</bdi>';
      document.getElementById('compound-result-heading').innerHTML='<bdi dir="ltr">'+config.formula+'</bdi>';
      const body=document.getElementById('compound-rows');body.replaceChildren();
      for(const p of [true,false])for(const q of [true,false])for(const r of [true,false]){
        const values=CourseLogic.compound(mode,p,q,r),row=document.createElement('tr');
        row.dataset.assignment=`${+p}${+q}${+r}`;
        if(p===selected[0]&&q===selected[1]&&r===selected[2]){row.className='selected-row';row.setAttribute('aria-current','true');}
        for(const value of [p,q,r,values.step,values.result]){const td=document.createElement('td');td.textContent=word(value);row.appendChild(td);}
        body.appendChild(row);
      }
    };
    [compoundMode,...['compound-p','compound-q','compound-r'].map(id=>document.getElementById(id))].forEach(el=>el.addEventListener('change',update));
    update();
  }
  const quantifierResults = document.getElementById('quantifier-results');
  if (quantifierResults) {
    const tubes = [1,2,3,4].map(n => ({t:document.getElementById(`tube-${n}-t`), c:document.getElementById(`tube-${n}-c`)}));
    const name = i => `الأنبوب ${i + 1}`;
    const reasons = {
      all: (r, anyTreated) => r.value
        ? (anyTreated ? 'لا يوجد أنبوب عولج ولم يتغير لونه.' : 'صادقة بلا مضمون: لا يوجد أنبوب معالج، فلا يوجد مثال مضاد.')
        : `مثال مضاد: ${name(r.index)} عولج ولم يتغير لونه.`,
      some: (r, anyTreated) => r.value
        ? `شاهد: ${name(r.index)} عولج وتغير لونه.`
        : (anyTreated ? 'لا يوجد أنبوب عولج وتغير لونه.' : 'لا يوجد أنبوب معالج أصلًا، فلا يوجد شاهد.'),
      none: (r, anyTreated) => r.value
        ? (anyTreated ? 'لا يوجد أنبوب عولج وتغير لونه.' : 'صادقة بلا مضمون: لا يوجد أنبوب معالج.')
        : `مثال مضاد: ${name(r.index)} عولج وتغير لونه.`,
      notall: (r, anyTreated) => r.value
        ? `شاهد: ${name(r.index)} عولج ولم يتغير لونه.`
        : (anyTreated ? 'كل أنبوب معالج تغير لونه.' : 'لا يوجد أنبوب معالج، فلا يوجد أنبوب معالج لم يتغير لونه.')
    };
    const update = () => {
      const domain = tubes.map(x => ({a:x.t.checked, b:x.c.checked}));
      const anyTreated = domain.some(x => x.a);
      quantifierResults.querySelectorAll('[data-statement]').forEach(item => {
        const result = CourseLogic.quantify(item.dataset.statement, domain);
        item.querySelector('.verdict').textContent = result.value ? 'صادقة' : 'كاذبة';
        item.querySelector('.reason').textContent = reasons[item.dataset.statement](result, anyTreated);
        item.dataset.value = String(result.value);
      });
    };
    tubes.forEach(x => [x.t, x.c].forEach(input => input.addEventListener('change', update)));
    update();
  }
  const formChoice = document.getElementById('form-choice');
  if (formChoice) {
    const display = {
      mp:'P → Q, P ∴ Q', mt:'P → Q, ¬Q ∴ ¬P', hs:'P → Q, Q → R ∴ P → R', ds:'P ∨ Q, ¬P ∴ Q',
      ac:'P → Q, Q ∴ P', da:'P → Q, ¬P ∴ ¬Q', ad:'P ∨ Q, P ∴ ¬Q'
    };
    const word = value => value ? 'صادقة' : 'كاذبة';
    const update = () => {
      const result = CourseLogic.checkForm(formChoice.value);
      document.getElementById('form-display').textContent = display[formChoice.value];
      const output = document.getElementById('form-output');
      output.dataset.valid = String(result.valid);
      output.textContent = result.valid
        ? `صالح: فحصنا كل الحالات الممكنة، وعددها ${result.rows}، ولا توجد حالة تصدق فيها المقدمات وتكذب النتيجة.`
        : `غير صالح: مثال مضاد عندما تكون ${Object.entries(result.counterexample).map(([name, value]) => `${name} ${word(value)}`).join(' و')}؛ عندها تصدق المقدمات كلها وتكذب النتيجة. هذه مغالطة شكلية: الخطأ في الشكل نفسه، أيًّا كان المحتوى.`;
    };
    formChoice.addEventListener('change', update);
    update();
  }
  const knowledgeCase = document.getElementById('knowledge-case');
  if (knowledgeCase) {
    const names = ['belief', 'truth', 'justified', 'luck'];
    const boxes = Object.fromEntries(names.map(name => [name, document.getElementById('k-' + name)]));
    const presets = {broken:[1,1,1,1], calibrated:[1,1,1,0], guess:[1,1,0,0], wrong:[1,0,1,0]};
    const label = {belief:'الاعتقاد', truth:'الصدق', justified:'التبرير'};
    const output = document.getElementById('knowledge-output');
    const update = () => {
      const result = CourseLogic.knowledgeCheck(Object.fromEntries(names.map(name => [name, boxes[name].checked])));
      output.dataset.verdict = result.knowledge ? 'knowledge' : result.gettier ? 'gettier' : 'missing';
      output.textContent = result.knowledge
        ? 'معرفة بحسب هذا التحليل: الشروط الثلاثة متحققة، وصدق الاعتقاد ليس مصادفة.'
        : result.gettier
          ? 'ليست معرفة عند أغلب الفلاسفة: الاعتقاد صادق ومبرَّر، لكن صدقه جاء مصادفة. هذه حالة من نوع غيتييه، وتبيّن أن الشروط الثلاثة لا تكفي.'
          : `ليست معرفة: ينقصها ${result.missing.map(name => label[name]).join(' و')}.${result.missing.includes('truth') ? ' لا نعرف ما ليس صادقًا، مهما كان المبرر قويًا.' : ''}`;
    };
    knowledgeCase.addEventListener('change', () => {
      const preset = presets[knowledgeCase.value];
      if (preset) names.forEach((name, i) => { boxes[name].checked = Boolean(preset[i]); });
      update();
    });
    names.forEach(name => boxes[name].addEventListener('change', () => { knowledgeCase.value = 'custom'; update(); }));
    update();
  }
  const testObserved = document.getElementById('test-observed');
  if (testObserved) {
    const checks = [1, 2, 3].map(i => document.getElementById('t-a' + i));
    const names = ['حجب الدواء للقنوات', 'ضبط جهد الغشاء عند ⁦−80 mV⁩', 'معايرة جهاز التسجيل'];
    const update = () => {
      const result = CourseLogic.testOutcome(testObserved.value === 'yes', checks.map(box => box.checked));
      const output = document.getElementById('test-output');
      output.dataset.verdict = result.verdict;
      document.getElementById('test-formula').textContent = result.verdict === 'passed'
        ? 'O ⊬ H'
        : ['¬H', ...result.suspects.map(i => '¬A' + (i + 1))].join(' ∨ ');
      output.textContent = result.verdict === 'passed'
        ? 'تحقق التنبؤ. هذا لا يثبت الفرضية؛ فاستنتاجها من التنبؤ إثبات للتالي. لكنها اجتازت اختبارًا كان يمكن أن تفشل فيه، فتزداد الثقة بها.'
        : result.verdict === 'against-h'
          ? 'لم يتحقق التنبؤ، والافتراضات المساعدة الثلاثة فُحصت بطرق مستقلة. يتجه الشك الآن إلى الفرضية نفسها. ويبقى احتمال خطأ في الفحوص المستقلة، فهي قابلة للخطأ أيضًا.'
          : `لم يتحقق التنبؤ. المنطق يخبرنا فقط أن واحدًا على الأقل كاذب: الفرضية، أو ${result.suspects.map(i => names[i]).join('، أو ')}. افحص ما لم تفحصه قبل أن تحكم على الفرضية.`;
    };
    [testObserved, ...checks].forEach(control => control.addEventListener('change', update));
    update();
  }
  const evidence = document.getElementById('evidence-case');
  if (evidence) {
    const descriptions = {
      none: 'لا تكفي للمفاضلة: قد تغيب الإشارة بسبب البطارية، أو الكابل، أو عطل آخر.',
      power: 'يدعم تفسير البطارية: عودة الإشارة بعد استبدالها ترجّح أنها كانت سبب المشكلة، بشرط ثبات العوامل الأخرى. لكنها لا تثبت أن هذا هو السبب الوحيد الممكن.',
      cable: 'يدعم تفسير الكابل: عودة الإشارة بعد توصيله ترجّح أنه كان سبب المشكلة، بشرط ثبات العوامل الأخرى. لكنها لا تثبت أن هذا هو السبب الوحيد الممكن.',
      both: 'تغيير عاملين معًا لا يعزل أثر كل منهما؛ نحتاج اختبارًا يغير عاملًا واحدًا مع ضوابط مناسبة.'
    };
    const update = () => { document.getElementById('evidence-output').textContent = descriptions[evidence.value]; };
    evidence.addEventListener('change', update);
    update();
  }
  const bind = (ids, update) => {
    if (!document.getElementById(ids[0])) return;
    ids.forEach(id => document.getElementById(id).addEventListener('change', update));
    update();
  };
  const on = id => document.getElementById(id).checked;
  bind(['ahmad-scientist'], () => {
    document.getElementById('argument-badge').textContent = on('ahmad-scientist') ? 'النتيجة صادقة' : 'النتيجة كاذبة';
    document.getElementById('argument-output').textContent = on('ahmad-scientist')
      ? 'هذه الحالة تصدق فيها المقدمات والنتيجة؛ لكنها لا تثبت صلاحية الحجة. ألغِ الاختيار للبحث عن مثال مضاد.'
      : 'مثال مضاد: أحمد جامعي غير عالم. المقدمتان تظلان صادقتين والنتيجة كاذبة؛ إذن الحجة غير صالحة.';
  });
  bind(['truth-p', 'truth-q'], () => {
    const p = on('truth-p'), q = on('truth-q');
    document.getElementById('truth-output').textContent = `P = ${p ? 'T' : 'F'}   |   Q = ${q ? 'T' : 'F'}   |   P → Q = ${CourseLogic.implies(p,q) ? 'T (صادقة)' : 'F (كاذبة)'}`;
    document.querySelectorAll('[data-truth]').forEach(row => {
      const selected = row.dataset.truth === `${+p}${+q}`;
      row.classList.toggle('selected-row', selected);
      if (selected) row.setAttribute('aria-current', 'true');
      else row.removeAttribute('aria-current');
    });
  });
  bind(['condition-p','condition-q'], () => {
    const state = CourseLogic.classify(on('condition-p'), on('condition-q'));
    document.getElementById('condition-output').textContent = state.violatesNecessity
      ? 'تنقض الضرورة: Q متحققة رغم غياب P. لا تنقض الكفاية.'
      : state.violatesSufficiency ? 'تنقض الكفاية: P متحققة دون Q. لا تنقض الضرورة.'
      : 'هذه الحالة لا تنقض الضرورة ولا الكفاية. توافق الفرضية في حالة واحدة لا يثبتها كليًا.';
  });
}
function initializeCourse() {
  const notice = document.createElement('p');
  notice.id = 'storage-notice'; notice.className = 'callout'; notice.hidden = true;
  notice.setAttribute('role','status');
  notice.textContent = 'التخزين المحلي غير متاح؛ التمارين تعمل، لكن الإجابات الجديدة ستبقى لهذه الزيارة فقط.';
  document.querySelector('main').prepend(notice);
  // Probe storage without overwriting user answers.
  try { localStorage.setItem('logic-storage-probe','1'); localStorage.removeItem('logic-storage-probe'); }
  catch { notice.hidden = false; }
  document.querySelector('.toolbar')?.setAttribute('aria-pressed', String(document.body.classList.contains('dark')));
  // Only page links in the header mark the current page; in-page section links are not "the current page".
  document.querySelectorAll('header nav a:not([href^="#"])').forEach(link => {
    if (new URL(link.href).pathname === location.pathname) link.setAttribute('aria-current','page');
  });
  document.querySelectorAll('[data-quiz]').forEach(quiz => {
    const saved = readAnswer(quiz.dataset.quiz);
    const input = saved && [...quiz.querySelectorAll('input')].find(el => el.value === saved.value);
    if (input) { input.checked = true; showFeedback(quiz, input.value); }
    quiz.querySelector('[data-check]').addEventListener('click', () => checkQuiz(quiz));
    quiz.querySelectorAll('input').forEach(input => input.addEventListener('change', () => {
      const output = document.getElementById(quiz.dataset.quiz + '-result');
      output.className = 'feedback';
      output.textContent = 'غيّرت اختيارك. اضغط «تحقق من الإجابة» لتصحيحه؛ يظل التقدم محسوبًا على آخر إجابة صححتها.';
    }));
  });
  updateProgress();
  document.body.classList.add('interactions-ready');
  try { setupLabs(); } catch (error) { console.warn('A lesson activity could not initialize:', error); }
  try { setupLessonMenu(); setupSections(); } catch (error) { console.warn('Navigation enhancements could not initialize:', error); }
}
// The header lesson menu is a native <details>; scripts only add outside-click, Escape and close-on-choice.
function setupLessonMenu() {
  document.querySelectorAll('.lesson-menu').forEach(menu => {
    const summary = menu.querySelector('summary');
    document.addEventListener('click', event => { if (menu.open && !menu.contains(event.target)) menu.open = false; });
    menu.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.open) { event.preventDefault(); menu.open = false; summary.focus(); }
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  });
}
// Collapsible sections are a progressive enhancement: without JavaScript every section stays visible.
function setSectionOpen(section, open) {
  const button = section.querySelector(':scope > h2 > .section-toggle');
  const body = section.querySelector(':scope > .section-body');
  if (!button || !body) return;
  button.setAttribute('aria-expanded', String(open));
  section.classList.toggle('collapsed', !open);
  if (open) body.hidden = false;
  else if ('onbeforematch' in document.body) body.setAttribute('hidden', 'until-found'); // find-in-page can still reveal it
  else body.hidden = true;
}
function revealTarget(id) {
  const target = id && document.getElementById(id);
  const section = target?.closest('section.lesson-section');
  if (section?.classList.contains('collapsed')) setSectionOpen(section, true);
}
function setupSections() {
  document.querySelectorAll('section.lesson-section').forEach(section => {
    const heading = section.querySelector(':scope > h2');
    if (!heading || heading.querySelector('.section-toggle')) return;
    const body = document.createElement('div');
    body.className = 'section-body'; body.id = heading.id + '-body';
    while (heading.nextSibling) body.appendChild(heading.nextSibling);
    section.appendChild(body);
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'section-toggle';
    button.setAttribute('aria-controls', body.id); button.setAttribute('aria-expanded', 'true');
    while (heading.firstChild) button.appendChild(heading.firstChild);
    heading.appendChild(button);
    button.addEventListener('click', () => setSectionOpen(section, button.getAttribute('aria-expanded') !== 'true'));
    body.addEventListener('beforematch', () => setSectionOpen(section, true));
  });
  document.querySelectorAll('.lesson-toc').forEach(toc => {
    const article = toc.closest('article');
    const controls = document.createElement('p');
    controls.className = 'section-controls';
    for (const [label, open] of [['فتح كل الأقسام', true], ['طي كل الأقسام', false]]) {
      const button = document.createElement('button');
      button.type = 'button'; button.textContent = label;
      button.addEventListener('click', () => article.querySelectorAll('section.lesson-section').forEach(section => setSectionOpen(section, open)));
      controls.appendChild(button);
    }
    toc.appendChild(controls);
  });
  // Open a collapsed section before following any link to it on this page (TOC, definition frames, bookmarks).
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.hash && url.pathname === location.pathname) revealTarget(decodeURIComponent(url.hash.slice(1)));
  }, true);
  const fromHash = () => { if (location.hash) revealTarget(decodeURIComponent(location.hash.slice(1))); };
  window.addEventListener('hashchange', fromHash);
  fromHash();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeCourse, {once:true});
else initializeCourse();
