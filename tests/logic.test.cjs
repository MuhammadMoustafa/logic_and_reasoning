const {test} = require('node:test');
const assert = require('node:assert/strict');
const {implies, classify} = require('../assets/logic.js');
const rows = [[true,true,true,false,false],[true,false,false,false,true],[false,true,true,true,false],[false,false,true,false,false]];
test('all four truth assignments and necessary/sufficient counterexamples', () => {
  for (const [p,q,conditional,necessity,sufficiency] of rows) {
    assert.equal(implies(p,q),conditional);
    assert.deepEqual(classify(p,q),{violatesNecessity:necessity,violatesSufficiency:sufficiency});
  }
});
test('MP and MT have no countermodel; AC and DA each have one', () => {
  const countermodels = {mp:[],mt:[],ac:[],da:[]};
  for (const [p,q] of rows) {
    if (implies(p,q) && p && !q) countermodels.mp.push([p,q]);
    if (implies(p,q) && !q && p) countermodels.mt.push([p,q]);
    if (implies(p,q) && q && !p) countermodels.ac.push([p,q]);
    if (implies(p,q) && !p && q) countermodels.da.push([p,q]);
    assert.equal(implies(p,q),implies(!q,!p));
  }
  assert.deepEqual(countermodels,{mp:[],mt:[],ac:[[false,true]],da:[[false,true]]});
});
test('basic connectives match independent truth-table columns',()=>{
  const logic=require('../assets/logic.js');
  const expected={and:[true,false,false,false],or:[true,true,true,false],xor:[false,true,true,false],iff:[true,false,false,true]};
  for(const [name,column] of Object.entries(expected))assert.deepEqual(rows.map(([p,q])=>logic[name](p,q)),column);
});
test('quantified statements over every four-tube domain, with witnesses and counterexamples',()=>{
  const {quantify}=require('../assets/logic.js');
  for(let bits=0;bits<256;bits++){
    const domain=[0,1,2,3].map(i=>({a:Boolean(bits>>(2*i)&1),b:Boolean(bits>>(2*i+1)&1)}));
    const allTrue=domain.every(x=>!x.a||x.b), someTrue=domain.some(x=>x.a&&x.b);
    const r={all:quantify('all',domain),some:quantify('some',domain),none:quantify('none',domain),notall:quantify('notall',domain)};
    assert.equal(r.all.value,allTrue); assert.equal(r.some.value,someTrue);
    assert.equal(r.notall.value,!r.all.value); assert.equal(r.none.value,!r.some.value);
    const firstCounter=domain.findIndex(x=>x.a&&!x.b), firstBoth=domain.findIndex(x=>x.a&&x.b);
    assert.equal(r.all.index,firstCounter); assert.equal(r.notall.index,firstCounter);
    assert.equal(r.some.index,firstBoth); assert.equal(r.none.index,firstBoth);
    if(!domain.some(x=>x.a)){ assert.equal(r.all.value,true); assert.equal(r.some.value,false); }
  }
  assert.throws(()=>quantify('not-a-mode',[]));
});
test('three compound formulas match every independently specified row',()=>{
  const {compound}=require('../assets/logic.js');
  const expected={
    'grouped-or':[true,false,true,false,true,false,false,false],
    'grouped-and':[true,true,true,true,true,false,false,false],
    'conditional-and':[true,false,true,true,true,true,true,true]
  };
  for(const [mode,column] of Object.entries(expected)){
    let index=0;
    for(const p of [true,false])for(const q of [true,false])for(const r of [true,false])assert.equal(compound(mode,p,q,r).result,column[index++]);
  }
  assert.throws(()=>compound('not-a-mode',true,true,true));
});
