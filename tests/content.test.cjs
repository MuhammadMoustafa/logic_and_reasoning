const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'..');
const pages = ['index.html',...fs.readdirSync(path.join(root,'lessons')).filter(f=>f.endsWith('.html')).map(f=>'lessons/'+f)];
test('local links exist; quiz IDs and answer options are consistent',()=>{
  const ids = new Set();
  for(const filename of pages){
    const html=fs.readFileSync(path.join(root,filename),'utf8');
    assert.match(html, /lang="ar" dir="rtl"/);
    for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^https?:/.test(match[1])) continue;
      const [relative,fragment]=match[1].split('#');
      const target=relative?path.resolve(root,path.dirname(filename),relative):path.join(root,filename);
      assert.ok(fs.existsSync(target),`${filename}: ${match[1]}`);
      if(fragment) assert.ok(fs.readFileSync(target,'utf8').includes(`id="${fragment}"`),`${filename}: missing anchor ${match[1]}`);
    }
    for(const match of html.matchAll(/<section class="quiz" data-quiz="([^"]+)" data-correct="([^"]+)" data-explanation="([^"]+)">([\s\S]*?)<\/section>/g)){
      assert.ok(!ids.has(match[1])); ids.add(match[1]);
      assert.ok(match[4].includes(`value="${match[2]}"`));
      assert.ok(match[4].includes('<fieldset>') && match[4].includes('<legend>'));
      assert.ok(match[4].includes(`id="${match[1]}-result"`));
    }
  }
  assert.equal(ids.size,26);
});

test('every glossary definition has a real lesson destination',()=>{
  const terms=require('../assets/terms.js');
  for(const [id,term] of Object.entries(terms)){
    const [file,anchor]=term.lesson.split('#');
    assert.ok(fs.readFileSync(path.join(root,file),'utf8').includes(`id="${anchor}"`),id);
    assert.ok(fs.readFileSync(path.join(root,'glossary.html'),'utf8').includes(`id="term-${id}"`),id);
  }

});

test('lesson five De Morgan table matches the shared logic',()=>{
  const {and,or}=require('../assets/logic.js');
  const html=fs.readFileSync(path.join(root,'lessons/05-connectives.html'),'utf8');
  const body=html.match(/<tbody id="de-morgan-rows">([\s\S]*?)<\/tbody>/)[1];
  const rows=[...body.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(r=>[...r[1].matchAll(/<td>(صادقة|كاذبة)<\/td>/g)].map(c=>c[1]==='صادقة'));
  const expected=[[true,true],[true,false],[false,true],[false,false]].map(([p,q])=>[p,q,!and(p,q),or(!p,!q),and(!p,!q)]);
  assert.deepEqual(rows,expected);
  for(const [p,q] of expected) assert.equal(!or(p,q),and(!p,!q));
});
