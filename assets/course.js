'use strict';
// Storage may be blocked by browser privacy settings or file:// policies.
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); return true; } catch { return false; } }
};
const answers = new Map();
const quizIds = ['l1q1','l1q2','l1q3','l2q1','l2q2','l2q3','l2q4','l3q1','l3q2','l3q3','l4q1','l4q2','l4q3','l4q4','l4q5','l4q6'];
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
function updateProgress() {
  const quizzes = [...document.querySelectorAll('[data-quiz]')];
  if (quizzes.length) {
    const attempted = quizzes.filter(q => readAnswer(q.dataset.quiz)).length;
    const mastered = quizzes.filter(q => {
      const a = readAnswer(q.dataset.quiz);
      return a && a.value === q.dataset.correct;
    }).length;
    document.getElementById('progress').textContent = `حاولت ${attempted} من ${quizzes.length} تمارين؛ وأتقنت ${mastered} منها.`;
    const meter = document.getElementById('mastery');
    meter.max = quizzes.length;
    meter.value = mastered;
  }
  const total = document.getElementById('course-progress');
  if (total) {
    const attempted = quizIds.filter(id => readAnswer(id)).length;
    const mastered = quizIds.filter(id => readAnswer(id)?.correct).length;
    total.textContent = `حاولت ${attempted} من ${quizIds.length} تمارين؛ وأتقنت ${mastered} منها.`;
    document.getElementById('course-mastery').value = mastered;
  }
}
function setupLabs() {
  const evidence = document.getElementById('evidence-case');
  if (evidence) {
    const descriptions = {
      none: 'لا تكفي للمفاضلة: غياب الإشارة متوافق مع أكثر من تفسير.',
      power: 'يدعم تفسير البطارية مقارنة بالكابل، بشرط ثبات العوامل الأخرى؛ لا يثبت الحصرية أو الضرورة.',
      cable: 'يدعم تفسير الكابل مقارنة بالبطارية، بشرط ثبات العوامل الأخرى؛ لا يثبت الحصرية أو الضرورة.',
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
    document.getElementById('truth-output').textContent = `P = ${p ? 'T' : 'F'}   |   Q = ${q ? 'T' : 'F'}   |   P → Q = ${CourseLogic.implies(p,q) ? 'T (صادق)' : 'F (كاذب)'}`;
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
document.addEventListener('DOMContentLoaded', () => {
  const notice = document.createElement('p');
  notice.id = 'storage-notice'; notice.className = 'callout'; notice.hidden = true;
  notice.setAttribute('role','status');
  notice.textContent = 'التخزين المحلي غير متاح؛ التمارين تعمل، لكن الإجابات الجديدة ستبقى لهذه الزيارة فقط.';
  document.querySelector('main').prepend(notice);
  // Probe storage without overwriting user answers.
  try { localStorage.setItem('logic-storage-probe','1'); localStorage.removeItem('logic-storage-probe'); }
  catch { notice.hidden = false; }
  document.querySelector('.toolbar')?.setAttribute('aria-pressed', String(document.body.classList.contains('dark')));
  document.querySelectorAll('nav a').forEach(link => {
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
      output.textContent = 'اختيار جديد؛ اضغط تحقق لتصحيحه. التقدم يعكس آخر إجابة تحققت منها.';
    }));
  });
  setupLabs(); updateProgress();
});
