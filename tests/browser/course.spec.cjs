const {test,expect}=require('@playwright/test');
const paths=['/index.html','/lessons/01-arguments.html','/lessons/02-conditional-reasoning.html','/lessons/03-necessary-sufficient.html'];
test('every exercise: blank, wrong, correct, reload feedback and aggregate progress',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const url of paths.slice(1)){
    await page.goto(url);
    for(const quiz of await page.locator('[data-quiz]').all()){
      const correct=await quiz.getAttribute('data-correct');
      const feedback=quiz.locator('[aria-live]');
      await quiz.locator('button').click(); await expect(feedback).toContainText('اختر إجابة');
      await quiz.locator(`input:not([value="${correct}"])`).first().check();
      await quiz.locator('button').click(); await expect(feedback).toContainText('راجع المحاولة');
      await quiz.locator(`input[value="${correct}"]`).check();
      await quiz.locator('button').click(); await expect(feedback).toContainText('إجابة صحيحة');
    }
    await page.reload();
    for(const feedback of await page.locator('.quiz [aria-live]').all()) await expect(feedback).toContainText('إجابة صحيحة');
  }
  await page.goto('/'); await expect(page.locator('#course-progress')).toContainText('وأتقنت 10');
  await page.goto(paths[1]);
  await page.locator('[data-quiz="l1q1"] input[value="yes"]').check();
  await page.locator('[data-check="l1q1"]').click();
  await expect(page.locator('#progress')).toContainText('وأتقنت 2');
  await page.goto('/'); await expect(page.locator('#course-progress')).toContainText('وأتقنت 9');
  expect(errors).toEqual([]);
});
test('all logical lab states and keyboard use',async({page})=>{
  await page.goto(paths[1]);await page.locator('#ahmad-scientist').focus();await page.keyboard.press('Space');
  await expect(page.locator('#argument-output')).toContainText('مثال مضاد');
  await page.goto(paths[2]);
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
  await page.locator('.toolbar').click();await expect(page.locator('body')).toHaveClass('dark');expect(errors).toEqual([]);
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
  await page.locator('.toolbar').click();await page.reload();await expect(page.locator('body')).toHaveClass('dark');
  await page.screenshot({path:'work/screenshots/dark.png',fullPage:true});
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
