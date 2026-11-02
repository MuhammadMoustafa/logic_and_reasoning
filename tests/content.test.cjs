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
      if (/^(https?:|#)/.test(match[1])) continue;
      assert.ok(fs.existsSync(path.resolve(root,path.dirname(filename),match[1])),`${filename}: ${match[1]}`);
    }
    for(const match of html.matchAll(/<section class="quiz" data-quiz="([^"]+)" data-correct="([^"]+)" data-explanation="([^"]+)">([\s\S]*?)<\/section>/g)){
      assert.ok(!ids.has(match[1])); ids.add(match[1]);
      assert.ok(match[4].includes(`value="${match[2]}"`));
      assert.ok(match[4].includes('<fieldset>') && match[4].includes('<legend>'));
      assert.ok(match[4].includes(`id="${match[1]}-result"`));
    }
  }
  assert.equal(ids.size,16);
});
