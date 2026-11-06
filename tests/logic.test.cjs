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
test('argument forms: valid rules have no counterexample; fallacies return a real one',()=>{
  const {checkForm,forms}=require('../assets/logic.js');
  // Independent expectations, written from the definitions, not from the checker.
  const expected={mp:null,mt:null,hs:null,ds:null,ac:{P:false,Q:true},da:{P:false,Q:true},ad:{P:true,Q:true}};
  assert.deepEqual(Object.keys(forms).sort(),Object.keys(expected).sort());
  for(const [name,counter] of Object.entries(expected)){
    const r=checkForm(name),form=forms[name];
    assert.equal(r.rows,2**form.vars.length);
    assert.equal(r.valid,counter===null,name);
    assert.deepEqual(r.counterexample,counter,name);
    if(counter){assert.ok(form.premises.every(p=>p(counter)));assert.equal(form.conclusion(counter),false);}
  }
  // Hypothetical syllogism checked by brute force over all eight rows, independently of checkForm.
  for(const P of [true,false])for(const Q of [true,false])for(const R of [true,false])
    if((!P||Q)&&(!Q||R))assert.equal(!P||R,true);
  assert.throws(()=>checkForm('not-a-form'));
});
test('knowledge check: every combination of the four conditions',()=>{
  const {knowledgeCheck}=require('../assets/logic.js');
  for(let bits=0;bits<16;bits++){
    const [belief,truth,justified,luck]=[0,1,2,3].map(i=>Boolean(bits>>i&1));
    const r=knowledgeCheck({belief,truth,justified,luck});
    const expectedMissing=[!belief&&'belief',!truth&&'truth',!justified&&'justified'].filter(Boolean);
    assert.deepEqual(r.missing,expectedMissing);
    assert.equal(r.knowledge,belief&&truth&&justified&&!luck);
    assert.equal(r.gettier,belief&&truth&&justified&&luck);
    assert.ok(!(r.knowledge&&r.gettier));
  }
});
test('failed prediction: suspects are H plus every auxiliary not checked independently',()=>{
  const {testOutcome}=require('../assets/logic.js');
  for(let bits=0;bits<8;bits++){
    const checks=[0,1,2].map(i=>Boolean(bits>>i&1));
    assert.deepEqual(testOutcome(true,checks),{verdict:'passed',suspects:[]});
    const r=testOutcome(false,checks);
    assert.deepEqual(r.suspects,[0,1,2].filter(i=>!checks[i]));
    assert.equal(r.verdict,checks.every(Boolean)?'against-h':'open');
  }
  // The logic behind it: with (H ∧ A) → O and ¬O, every row left open has ¬H or ¬A.
  for(const H of [true,false])for(const A of [true,false])for(const O of [true,false])
    if((!(H&&A)||O)&&!O)assert.ok(!H||!A);
});
test('Bayes: natural-frequency counts, direct formula and odds form agree',()=>{
  const {bayes}=require('../assets/logic.js');
  const r=bayes({prior:0.01,sensitivity:0.9,falsePositive:0.09});
  assert.equal(Math.round(r.sick),100);assert.equal(Math.round(r.truePos),90);assert.equal(Math.round(r.falsePos),891);
  assert.ok(Math.abs(r.posterior-90/981)<1e-12);assert.ok(Math.abs(r.likelihoodRatio-10)<1e-12);
  for(const prior of [0.001,0.01,0.1,0.5])for(const sensitivity of [0.8,0.9,0.99])for(const falsePositive of [0.01,0.05,0.09,0.2]){
    const b=bayes({prior,sensitivity,falsePositive});
    // Counts give the same answer as the formula, and so does posterior odds = prior odds × LR.
    assert.ok(Math.abs(b.truePos/(b.truePos+b.falsePos)-b.posterior)<1e-12);
    const odds=prior/(1-prior)*sensitivity/falsePositive;
    assert.ok(Math.abs(odds/(1+odds)-b.posterior)<1e-12);
    assert.ok(Math.abs(b.sick+b.healthy-10000)<1e-9);
  }
  // Exercise keys checked by hand: 20 of 69 positives; odds 1:4 × 8 = 2:1.
  assert.equal(Math.round(bayes({prior:0.02,sensitivity:1,falsePositive:0.05},1000).posterior*100),29);
  assert.equal(Math.round(100*(8/4)/(1+8/4)),67);
});
