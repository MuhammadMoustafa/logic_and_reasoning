'use strict';
(function () {
  if (!window.CourseTerms) return;
  const overlay = document.createElement('div');
  overlay.className = 'term-overlay'; overlay.hidden = true;
  overlay.innerHTML = '<section class="term-dialog" role="dialog" aria-modal="true" aria-labelledby="term-title" tabindex="-1"><button type="button" class="term-close" aria-label="إغلاق التعريف">إغلاق ×</button><h2 id="term-title"></h2><p id="term-english" lang="en" dir="ltr"></p><p id="term-definition"></p><p><a id="term-lesson">عرض الشرح الكامل في الدرس</a> · <a id="term-glossary">عرض صفحة المصطلح في القاموس</a></p></section>';
  document.body.appendChild(overlay);
  let opener = null;
  const panel = overlay.querySelector('.term-dialog');
  function close() {
    overlay.hidden = true;
    document.body.classList.remove('definition-open');
    if (opener) opener.focus();
  }
  const localLink = url => window.COURSE_SINGLE_FILE ? '#' + url.split('#')[1] : (location.pathname.includes('/lessons/') ? '../' : '') + url;
  document.querySelectorAll('[data-term]').forEach(link => {
    link.setAttribute('aria-haspopup','dialog');
    link.addEventListener('click', event => {
      const term = CourseTerms[link.dataset.term];
      if (!term || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); opener = link;
      overlay.querySelector('#term-title').textContent = term.ar;
      overlay.querySelector('#term-english').textContent = term.en;
      overlay.querySelector('#term-definition').textContent = term.definition;
      overlay.querySelector('#term-lesson').href = localLink(term.lesson);
      overlay.querySelector('#term-glossary').href = window.COURSE_SINGLE_FILE ? '#term-' + link.dataset.term : (location.pathname.includes('/lessons/') ? '../' : '') + 'glossary.html#term-' + link.dataset.term;
      overlay.hidden = false; document.body.classList.add('definition-open');
      overlay.querySelector('.term-close').focus();
    });
  });
  overlay.querySelector('.term-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay || e.target.closest('a')) close(); });
  overlay.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    if (e.key === 'Tab') {
      const focusable = [...panel.querySelectorAll('button,a[href]')];
      const first = focusable[0], last = focusable[focusable.length-1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  const search = document.getElementById('glossary-search');
  if (search) {
    const normalize = text => text.toLowerCase().replace(/[\u064b-\u065f\u0670\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي');
    const cards = [...document.querySelectorAll('.glossary-entry')];
    search.addEventListener('input', () => {
      const query = normalize(search.value.trim()); let count = 0;
      cards.forEach(card => { card.hidden = !normalize(card.textContent).includes(query); if (!card.hidden) count++; });
      document.getElementById('glossary-count').textContent = count ? `عدد المصطلحات المعروضة: ${count}` : 'لا توجد نتائج. جرّب الاسم العربي أو الإنجليزي.';
    });
    // A direct glossary link always reveals its target, even after a search.
    window.addEventListener('hashchange', () => {
      const card = document.getElementById(location.hash.slice(1));
      if (card && card.classList.contains('glossary-entry')) { search.value=''; search.dispatchEvent(new Event('input')); card.scrollIntoView(); }
    });
  }
})();
