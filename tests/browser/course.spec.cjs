const {test,expect}=require('@playwright/test');
const paths=['/index.html','/lessons/01-arguments.html','/lessons/02-conditional-reasoning.html','/lessons/03-necessary-sufficient.html','/lessons/04-types-of-inference.html','/lessons/05-connectives.html','/lessons/06-quantifiers.html','/lessons/07-proofs-fallacies.html','/lessons/08-knowledge-justification.html'];
test('every exercise: blank, wrong, correct, reload feedback and aggregate progress',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const url of paths.slice(1)){
    await page.goto(url);
    for(const quiz of await page.locator('[data-quiz]').all()){
      const correct=await quiz.getAttribute('data-correct');
      const feedback=quiz.locator('[aria-live]');
      await quiz.locator('[data-check]').click(); await expect(feedback).toContainText('اختر إجابة');
      await quiz.locator(`input:not([value="${correct}"])`).first().check();
      await quiz.locator('[data-check]').click(); await expect(feedback).toContainText('راجع المحاولة');
      await quiz.locator(`input[value="${correct}"]`).check();
      await quiz.locator('[data-check]').click(); await expect(feedback).toContainText('إجابة صحيحة');
    }
    await page.reload();
    for(const feedback of await page.locator('.quiz [aria-live]').all()) await expect(feedback).toContainText('إجابة صحيحة');
  }
  await page.goto('/'); await expect(page.locator('#course-progress')).toContainText('من 50 تمرينًا؛ وأتقنت 50');
  await page.goto(paths[1]);
  await page.locator('[data-quiz="l1q1"] input[value="yes"]').check();
  await page.locator('[data-check="l1q1"]').click();
  await expect(page.locator('#progress')).toContainText('من 3 تمارين؛ وأتقنت 2');
  await page.goto('/'); await expect(page.locator('#course-progress')).toContainText('وأتقنت 49');
  expect(errors).toEqual([]);
});
test('all logical lab states and keyboard use',async({page})=>{
  await page.goto(paths[1]);await page.locator('#ahmad-scientist').focus();await page.keyboard.press('Space');
  await expect(page.locator('#argument-output')).toContainText('مثال مضاد');
  await page.goto(paths[2]);
  const lessonTwoKeys={l2q1:'da',l2q2:'yes',l2q3:'6',l2q4:'true',l2q5:'contrapositive'};
  for(const [id,answer] of Object.entries(lessonTwoKeys))await expect(page.locator(`[data-quiz="${id}"]`)).toHaveAttribute('data-correct',answer);
  for(const p of [true,false]) for(const q of [true,false]){
    await page.locator('#truth-p').setChecked(p);await page.locator('#truth-q').setChecked(q);
    await expect(page.locator('#truth-output')).toContainText(`P → Q = ${!p||q?'T':'F'}`);
    await expect(page.locator('.selected-row')).toHaveAttribute('data-truth',`${+p}${+q}`);
  }
  await page.goto(paths[3]);
  for(const p of [true,false]) for(const q of [true,false]){
    await page.locator('#condition-p').setChecked(p);await page.locator('#condition-q').setChecked(q);
    await expect(page.locator('#condition-output')).toContainText(q&&!p?'تنقض الضرورة:':p&&!q?'تنقض الكفاية:':'لا تنقض الضرورة ولا الكفاية');
  }
});
test('storage denied: no crash and in-memory progress works',async({page})=>{
  await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('blocked','SecurityError')}})});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(paths[1]);await expect(page.locator('#storage-notice')).toBeVisible();
  await page.locator('[data-quiz="l1q1"] input[value="no"]').check();await page.locator('[data-check="l1q1"]').click();
  await expect(page.locator('#progress')).toContainText('وأتقنت 1');
  await page.locator('.toolbar').click();await expect(page.locator('body')).toHaveClass(/\bdark\b/);expect(errors).toEqual([]);
});
test('mobile/desktop layouts, dark theme persistence and reduced motion',async({page})=>{
  for(const width of [360,1280]){
    await page.setViewportSize({width,height:900});
    for(const url of paths){
      await page.goto(url);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      await expect(page.locator('html')).toHaveAttribute('dir','rtl');
      await page.screenshot({path:`work/screenshots/${width}-${url.split('/').pop()}.png`,fullPage:true});
    }
  }
  const toggle=page.locator('.theme-toggle');
  await expect(toggle).toHaveAccessibleName('الوضع الداكن');await expect(toggle).toHaveAttribute('aria-pressed','false');
  await expect(toggle.locator('.icon-moon')).toBeVisible();await expect(toggle.locator('.icon-sun')).toBeHidden();
  await toggle.click();await page.reload();await expect(page.locator('body')).toHaveClass(/\bdark\b/);
  await expect(toggle).toHaveAttribute('aria-pressed','true');await expect(toggle.locator('.icon-sun')).toBeVisible();await expect(toggle.locator('.icon-moon')).toBeHidden();
  await page.screenshot({path:'work/screenshots/dark.png',fullPage:true});
  await page.screenshot({path:'work/screenshots/lesson4-desktop-top.png'});
  await page.setViewportSize({width:360,height:900});
  await page.screenshot({path:'work/screenshots/lesson4-mobile-top.png'});
  await page.emulateMedia({reducedMotion:'reduce'});
  expect(await page.locator('.feedback').first().evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
});
test('direct file opening stays offline and interactive',async({page})=>{
  const {pathToFileURL}=require('node:url');const path=require('node:path');
  const requests=[];page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url())});
  await page.goto(pathToFileURL(path.resolve('lessons/02-conditional-reasoning.html')).href);
  await page.locator('#truth-q').uncheck();await expect(page.locator('#truth-output')).toContainText('P → Q = F');
  expect(requests).toEqual([]);
});

test('lesson four evidence comparisons work with keyboard, offline and without storage',async({page})=>{
  await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('blocked','SecurityError')}})});
  const {pathToFileURL}=require('node:url'); const path=require('node:path');
  await page.goto(pathToFileURL(path.resolve('lessons/04-types-of-inference.html')).href);
  const expectedAnswers={l4q1:'d',l4q2:'no',l4q3:'ac',l4q4:'power',l4q5:'sample',l4q6:'no'};
  for(const [id,answer] of Object.entries(expectedAnswers)) await expect(page.locator(`[data-quiz="${id}"]`)).toHaveAttribute('data-correct',answer);
  const select=page.locator('#evidence-case');const output=page.locator('#evidence-output');
  for(const [value,text] of [['none','لا تكفي للمفاضلة'],['power','يدعم تفسير البطارية'],['cable','يدعم تفسير الكابل'],['both','تغيير عاملين معًا']]){
    await select.selectOption(value);await expect(output).toContainText(text);
  }
  await select.focus();await page.keyboard.press('Home');await page.keyboard.press('Enter');await expect(output).toContainText('لا تكفي للمفاضلة');
  await page.locator('[data-quiz="l4q1"] input[value="d"]').check();await page.locator('[data-check="l4q1"]').click();await expect(page.locator('#progress')).toContainText('وأتقنت 1');
});

test('definitions: touch open, close, focus, canonical bookmark and glossary search',async({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await context.newPage();await page.goto('/lessons/04-types-of-inference.html');
  const term=page.locator('[data-term="deduction"]').first();
  await term.tap();const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
  await expect(dialog.locator('#term-title')).toHaveText('الاستنباط');
  await page.getByRole('button',{name:'إغلاق التعريف'}).tap();await expect(dialog).toBeHidden();await expect(term).toBeFocused();
  await term.tap();await page.keyboard.press('Escape');await expect(dialog).toBeHidden();
  await term.tap();await dialog.locator('#term-lesson').tap();await expect(page).toHaveURL(/#l4-deduction$/);await expect(dialog).toBeHidden();
  await page.reload();await expect(page.locator('#l4-deduction')).toBeInViewport();
  await page.goto('/glossary.html');await page.locator('#glossary-search').fill('Deduction');
  await expect(page.locator('.glossary-entry:visible')).toHaveCount(1);
  await page.locator('#glossary-search').fill('استنباط');await expect(page.locator('#term-deduction')).toBeVisible();
  await page.locator('#glossary-search').fill('zzzz');await expect(page.locator('#glossary-count')).toContainText('لا توجد نتائج');
  await page.goto('/glossary.html#term-necessary');await expect(page.locator('#term-necessary')).toBeInViewport();
  await page.screenshot({path:'work/screenshots/glossary-mobile.png'});
  await context.close();
});
test('separate lesson pages grade every quiz using touch, file URLs and blocked storage',async({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await context.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('blocked','SecurityError')}})});
  const {pathToFileURL}=require('node:url');const path=require('node:path');
  for(const url of paths.slice(1)){
    await page.goto(pathToFileURL(path.resolve('.'+url)).href);
    for(const quiz of await page.locator('[data-quiz]').all()){
      const answer=await quiz.getAttribute('data-correct');
      await quiz.locator(`input[value="${answer}"]`).tap();await quiz.locator('[data-check]').tap();
      await expect(quiz.locator('.feedback')).toContainText('إجابة صحيحة');
    }
    const count=await page.locator('[data-quiz]').count();await expect(page.locator('#progress')).toContainText(`وأتقنت ${count}`);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  // Any term on the last page works; reading it from the page keeps the test valid as lessons are added.
  const termLink=page.locator('article .term-link[data-term]').first(),term=await termLink.getAttribute('data-term');
  await termLink.tap();await expect(page.getByRole('dialog')).toBeVisible();
  await page.locator('#term-glossary').tap();await expect(page).toHaveURL(new RegExp(`glossary.html#term-${term}$`));
  expect(errors).toEqual([]);await context.close();
});
test('missing scripts are visible and manual answers remain usable',async({page})=>{
  await page.route('**/assets/*.js',route=>route.abort());
  await page.goto('/lessons/01-arguments.html');await expect(page.locator('.interaction-warning')).toBeVisible();
  const answer=page.locator('.manual-answer').first();await answer.locator('summary').click();await expect(answer).toContainText('الإجابة: لا');
  await page.locator('[data-term="validity"]').first().click();
  const frame=page.locator('.native-definition:popover-open');await expect(frame).toBeVisible();await expect(frame).toContainText('الصلاحية');
  await expect(page).toHaveURL(/01-arguments.html$/);
  await frame.getByRole('button',{name:'إغلاق التعريف'}).click();await expect(frame).toHaveCount(0);
});

test('grading initializes when its script arrives after the page has loaded',async({page})=>{
  await page.route('**/assets/course.js',route=>route.abort());
  await page.goto('/lessons/01-arguments.html');await expect(page.locator('.interaction-warning')).toBeVisible();
  await page.unroute('**/assets/course.js');await page.addScriptTag({url:'/assets/course.js'});
  await expect(page.locator('.interaction-warning')).toBeHidden();
  await page.locator('[data-quiz="l1q1"] input[value="no"]').check();await page.locator('[data-check="l1q1"]').click();await expect(page.locator('#l1q1-result')).toContainText('إجابة صحيحة');
});

test('generated share file grades all quizzes offline and keeps definitions local',async({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await context.newPage();const errors=[],remote=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))remote.push(r.url())});
  await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('blocked','SecurityError')}})});
  const {pathToFileURL}=require('node:url');const path=require('node:path');
  await page.goto(pathToFileURL(path.resolve('dist/course.html')).href);
  for(const quiz of await page.locator('[data-quiz]').all()){
    const answer=await quiz.getAttribute('data-correct');await quiz.locator(`input[value="${answer}"]`).tap();await quiz.locator('[data-check]').tap();await expect(quiz.locator('.feedback')).toContainText('إجابة صحيحة');
  }
  for(const article of await page.locator('article[data-lesson]').all()){
    const count=await article.locator('[data-quiz]').count();await expect(article.locator('.lesson-progress')).toContainText(`وأتقنت ${count}`);
  }
  await page.locator('[data-term="validity"]').first().tap();await expect(page.getByRole('dialog')).toBeVisible();await page.locator('#term-lesson').tap();await expect(page).toHaveURL(/#l1-validity$/);
  await page.locator('[data-term="validity"]').first().tap();await page.locator('#term-glossary').tap();await expect(page).toHaveURL(/#term-validity$/);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);expect(remote).toEqual([]);await context.close();
});

test('native definition frame works without JavaScript on touch and has separate full-page links',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await context.newPage();await page.goto('/lessons/04-types-of-inference.html');
  const trigger=page.locator('[data-term="deduction"]').first();await trigger.tap();
  const frame=page.locator('.native-definition:popover-open');await expect(frame).toBeVisible();await expect(frame).toContainText('الاستنباط');await expect(page).toHaveURL(/04-types-of-inference.html$/);
  await page.screenshot({path:'work/screenshots/native-definition-mobile.png'});
  await frame.getByRole('button',{name:'إغلاق التعريف'}).tap();await expect(page.locator('.native-definition:popover-open')).toHaveCount(0);
  await trigger.tap();await frame.getByRole('link',{name:'عرض صفحة المصطلح في القاموس'}).tap();await expect(page).toHaveURL(/glossary.html#term-deduction$/);
  await context.close();
});
test('lesson five: every compound state and independent exercise answer keys',async({page})=>{
  await page.goto('/lessons/05-connectives.html');
  const keys={l5q1:'f',l5q2:'tf',l5q3:'some',l5q4:'b',l5q5:'eight',l5q6:'no',l5q7:'contradiction',l5q8:'t',l5q9:'or'};
  for(const [id,answer] of Object.entries(keys))await expect(page.locator(`[data-quiz="${id}"]`)).toHaveAttribute('data-correct',answer);
  const expected={
    'grouped-or':[[true,false,true,false,true,false,false,false],[true,true,true,true,true,true,false,false]],
    'grouped-and':[[true,true,true,true,true,false,false,false],[true,false,false,false,true,false,false,false]],
    'conditional-and':[[true,false,true,true,true,true,true,true],[true,true,false,false,false,false,false,false]]
  };
  for(const [mode,[column,steps]] of Object.entries(expected)){
    await page.locator('#compound-mode').selectOption(mode);let index=0;
    for(const p of [true,false])for(const q of [true,false])for(const r of [true,false]){
      await page.locator('#compound-p').setChecked(p);await page.locator('#compound-q').setChecked(q);await page.locator('#compound-r').setChecked(r);
      const row=page.locator('#compound-rows tr[aria-current="true"]');await expect(row).toHaveAttribute('data-assignment',`${+p}${+q}${+r}`);
      await expect(row.locator('td').nth(3)).toHaveText(steps[index]?'صادقة':'كاذبة');
      await expect(row.locator('td').last()).toHaveText(column[index]?'صادقة':'كاذبة');index++;
    }
  }
});
test('lesson six: quantifier lab, empty domain, keyboard and independent answer keys',async({page})=>{
  await page.goto('/lessons/06-quantifiers.html');
  const keys={l6q1:'cond',l6q2:'and',l6q3:'none',l6q4:'2',l6q5:'no',l6q6:'true',l6q7:'exists',l6q8:'notall'};
  for(const [id,answer] of Object.entries(keys))await expect(page.locator(`[data-quiz="${id}"]`)).toHaveAttribute('data-correct',answer);
  const item=mode=>page.locator(`#quantifier-results [data-statement="${mode}"]`);
  const set=async states=>{for(const [i,[t,c]] of states.entries()){await page.locator(`#tube-${i+1}-t`).setChecked(t);await page.locator(`#tube-${i+1}-c`).setChecked(c);}};
  // Default: tube 3 is treated without a colour change.
  await expect(item('all').locator('.verdict')).toHaveText('كاذبة');await expect(item('all').locator('.reason')).toContainText('الأنبوب 3');
  await expect(item('some').locator('.reason')).toContainText('الأنبوب 1');
  await set([[true,true],[true,true],[true,true],[false,false]]);
  for(const [mode,value] of [['all','صادقة'],['some','صادقة'],['none','كاذبة'],['notall','كاذبة']])await expect(item(mode).locator('.verdict')).toHaveText(value);
  await set([[false,true],[false,false],[false,true],[false,false]]);
  await expect(item('all').locator('.verdict')).toHaveText('صادقة');await expect(item('all').locator('.reason')).toContainText('بلا مضمون');
  await expect(item('some').locator('.verdict')).toHaveText('كاذبة');await expect(item('notall').locator('.verdict')).toHaveText('كاذبة');
  await page.locator('#tube-2-t').focus();await page.keyboard.press('Space');
  await expect(item('notall').locator('.verdict')).toHaveText('صادقة');await expect(item('notall').locator('.reason')).toContainText('الأنبوب 2');
  for(const mode of ['all','some','none','notall'])await expect(item(mode)).toHaveAttribute('data-value',/true|false/);
  expect(await item('all').getAttribute('data-value')).not.toBe(await item('notall').getAttribute('data-value'));
  expect(await item('some').getAttribute('data-value')).not.toBe(await item('none').getAttribute('data-value'));
});
test('lesson menu and collapsible sections: keyboard, links reveal sections, print and no JavaScript',async({browser,page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/lessons/03-necessary-sufficient.html');
  const menu=page.locator('header .lesson-menu');
  await menu.locator('summary').click();
  await expect(menu.locator('li')).toHaveCount(8);
  await expect(menu.locator('a[aria-current="page"]')).toHaveAttribute('href','03-necessary-sufficient.html');
  await page.keyboard.press('Escape');await expect(menu).not.toHaveAttribute('open','');await expect(menu.locator('summary')).toBeFocused();
  await menu.locator('summary').click();await page.locator('main h1').click();await expect(menu).not.toHaveAttribute('open','');
  expect(await page.locator('.lesson-toc a[aria-current]').count()).toBe(0);
  // One section, by keyboard.
  const toggle=page.locator('#l3-hcn > .section-toggle');
  await toggle.focus();await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded','false');await expect(page.locator('#l3-hcn-body')).toBeHidden();
  await page.keyboard.press('Space');await expect(toggle).toHaveAttribute('aria-expanded','true');await expect(page.locator('#l3-hcn-body')).toBeVisible();
  // Collapse all, then a table-of-contents link reopens its section.
  await page.getByRole('button',{name:'طي كل الأقسام'}).click();
  await expect(page.locator('.section-toggle[aria-expanded="true"]')).toHaveCount(0);
  await page.locator('.lesson-toc a[href="#l3-experiment"]').click();
  await expect(page.locator('#l3-experiment-body')).toBeVisible();await expect(page.locator('#l3-experiment')).toBeInViewport();
  // A definition frame's lesson link reopens a collapsed section too.
  await page.getByRole('button',{name:'طي كل الأقسام'}).click();
  await page.locator('#l3-experiment > .section-toggle').click();
  await page.locator('#l3-experiment-body [data-term="hcn"]').first().click();
  await page.locator('#term-lesson').click();
  await expect(page.locator('#l3-hcn-body')).toBeVisible();await expect(page).toHaveURL(/#l3-hcn$/);
  // Collapsed content still prints.
  await page.getByRole('button',{name:'طي كل الأقسام'}).click();
  await page.emulateMedia({media:'print'});
  await expect(page.locator('#l3-hcn-body')).toBeVisible();await expect(page.locator('#l3-hcn > .section-toggle')).toBeVisible();
  await expect(page.locator('.term-link').first()).toBeVisible();
  await page.emulateMedia({media:'screen'});
  // A bookmark to a section opens normally after reload.
  await page.goto('/lessons/03-necessary-sufficient.html#l3-cases');await expect(page.locator('#l3-cases-body')).toBeVisible();
  expect(errors).toEqual([]);
  const context=await browser.newContext({javaScriptEnabled:false});const noJs=await context.newPage();
  await noJs.goto('/lessons/03-necessary-sufficient.html');
  await expect(noJs.locator('.section-toggle')).toHaveCount(0);await expect(noJs.locator('#l3-hcn ~ p').first()).toBeVisible();
  await noJs.locator('header .lesson-menu summary').click();await expect(noJs.locator('header .lesson-menu li').first()).toBeVisible();
  await context.close();
});
test('lesson seven: argument-form checker, keyboard and independent answer keys',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/lessons/07-proofs-fallacies.html');
  const keys={l7q1:'ds',l7q2:'hs',l7q3:'both',l7q4:'all',l7q5:'equiv',l7q6:'bq',l7q7:'cond',l7q8:'fd'};
  for(const [id,answer] of Object.entries(keys))await expect(page.locator(`[data-quiz="${id}"]`)).toHaveAttribute('data-correct',answer);
  const output=page.locator('#form-output'),display=page.locator('#form-display');
  await expect(output).toHaveAttribute('data-valid','true');await expect(output).toContainText('وعددها 4');
  for(const form of ['mt','hs','ds']){await page.locator('#form-choice').selectOption(form);await expect(output).toHaveAttribute('data-valid','true');}
  await expect(output).toContainText('وعددها 4');
  await page.locator('#form-choice').selectOption('hs');await expect(output).toContainText('وعددها 8');await expect(display).toHaveText('P → Q, Q → R ∴ P → R');
  await page.locator('#form-choice').selectOption('ad');
  await expect(output).toHaveAttribute('data-valid','false');await expect(output).toContainText('مثال مضاد');await expect(output).toContainText('P صادقة');await expect(output).toContainText('Q صادقة');
  await page.locator('#form-choice').focus();await page.keyboard.press('ArrowUp');
  await expect(page.locator('#form-choice')).toHaveValue('da');await expect(output).toHaveAttribute('data-valid','false');await expect(output).toContainText('P كاذبة');
  expect(errors).toEqual([]);
});
test('lesson eight: knowledge lab presets, manual conditions and independent answer keys',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/lessons/08-knowledge-justification.html');
  const keys={l8q1:'false',l8q2:'unjust',l8q3:'gettier',l8q4:'testimony',l8q5:'certainty',l8q6:'other',l8q7:'tentative',l8q8:'relativism'};
  for(const [id,answer] of Object.entries(keys))await expect(page.locator(`[data-quiz="${id}"]`)).toHaveAttribute('data-correct',answer);
  const output=page.locator('#knowledge-output'),select=page.locator('#knowledge-case');
  await expect(output).toHaveAttribute('data-verdict','gettier');await expect(output).toContainText('غيتييه');
  await select.selectOption('calibrated');await expect(output).toHaveAttribute('data-verdict','knowledge');await expect(page.locator('#k-luck')).not.toBeChecked();
  await select.selectOption('guess');await expect(output).toHaveAttribute('data-verdict','missing');await expect(output).toContainText('ينقصها التبرير');
  await select.selectOption('wrong');await expect(output).toContainText('ينقصها الصدق');await expect(output).toContainText('لا نعرف ما ليس صادقًا');
  await page.locator('#k-belief').focus();await page.keyboard.press('Space');
  await expect(select).toHaveValue('custom');await expect(output).toContainText('ينقصها الاعتقاد والصدق');
  expect(errors).toEqual([]);
});
