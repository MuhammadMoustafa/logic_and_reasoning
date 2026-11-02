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
